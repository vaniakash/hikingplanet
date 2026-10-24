'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './KedarkanthaJournal.module.css';

const RINGS = Array.from({ length: 18 });

const DAYS = [
  { label: 'Day 1 · Drive', title: 'Drive from Dehradun to Kotgaon', meta: 'Distance 195 km · Duration 10–11 hours', body: 'Travel from Dehradun through the scenic mountain roads of Uttarakhand to Kotgaon, the starting base for your Kedarkantha adventure. Meet your group at the designated pickup point before beginning the journey.', s: 0.38, e: 0.415, x: 0.465, y: 0.495 },
  { label: 'Day 2 · Trek', title: 'Trek from Kotgaon to Khujaai', meta: 'Trek distance 5.3 km · Around 5 hours', body: 'Begin your trek through beautiful forest trails as you gradually gain altitude. Enjoy the peaceful surroundings and take breaks along the route before reaching Khujaai, your campsite for the night.', s: 0.465, e: 0.500, x: 0.55, y: 0.580 },
  { label: 'Day 3 · Trek', title: 'Trek from Khujaai to Bhoja Dhadi', meta: 'Trek distance 3 km · Around 3.5 hours', body: "Continue uphill through forested terrain towards Bhoja Dhadi. As the landscape opens up, enjoy the mountain scenery and prepare for the next day's summit attempt. Settle into camp and rest for the climb ahead.", s: 0.55, e: 0.585, x: 0.635, y: 0.665 },
  { label: 'Day 4 · Summit day', title: 'Summit Kedarkantha and descend to Khujaai', meta: 'Trek distance 9 km · Around 7–8 hours', body: 'Start early for the summit ascent. Reach the top of Kedarkantha, where clear weather can reveal sweeping Himalayan views. After spending time at the summit, descend carefully through the trail towards Khujaai for an overnight stay.', s: 0.635, e: 0.670, x: 0.72, y: 0.750 },
  { label: 'Day 5 · Trek', title: 'Trek from Khujaai to Kotgaon', meta: 'Trek distance 5.3 km · Around 4–5 hours', body: 'Retrace the forest trail on your descent towards Kotgaon. Enjoy the final stretches of the mountain landscape before arriving at the basecamp, where you can relax after completing the trekking section.', s: 0.72, e: 0.755, x: 0.805, y: 0.835 },
  { label: 'Day 6 · Drive', title: 'Drive from Kotgaon to Dehradun', meta: 'Distance 195 km · Around 10–11 hours', body: 'Leave Kotgaon and travel back to Dehradun through the mountain roads. The trip concludes at the designated drop-off point, with arrival expected around 6:00 PM, depending on road and weather conditions.', s: 0.805, e: 0.840, x: undefined, y: undefined },
];

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ss = (v: number, a: number, b: number) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };

/** Inline style for scroll-animated elements — starts invisible on desktop */
const ANIM: React.CSSProperties = { opacity: 0 };

export default function KedarkanthaJournal() {
  const trackRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef(0);
  const curRef = useRef(0);

  useEffect(() => {
    const mq = matchMedia('(max-width:760px),(prefers-reduced-motion:reduce)');
    if (mq.matches) {
      // simple mode: make all anim elements visible
      trackRef.current?.querySelectorAll<HTMLElement>('[data-s],[data-x]').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = '';
      });
      return;
    }

    const track = trackRef.current!;
    const book = bookRef.current!;
    const hint = hintRef.current;
    const fin = finalRef.current;

    type AnimEl = { el: HTMLElement; s: number; e: number; x?: number; y?: number };
    const animEls: AnimEl[] = [...track.querySelectorAll<HTMLElement>('[data-s],[data-x]')].map(el => ({
      el,
      s: parseFloat(el.dataset.s ?? '0'),
      e: parseFloat(el.dataset.e ?? String(parseFloat(el.dataset.s ?? '0') + 0.001)),
      x: el.dataset.x !== undefined ? parseFloat(el.dataset.x) : undefined,
      y: el.dataset.y !== undefined ? parseFloat(el.dataset.y) : undefined,
    }));

    const read = () => {
      const scrolled = -track.getBoundingClientRect().top;
      targetRef.current = clamp(scrolled / (track.offsetHeight - window.innerHeight));
    };

    function render(p: number) {
      const flip = ss(p, 0.15, 0.30);
      const bump = Math.sin(flip * Math.PI);
      const end = ss(p, 0.88, 0.97);
      book.style.setProperty('--flip', flip.toFixed(4));
      book.style.setProperty('--bump', bump.toFixed(3));
      book.style.setProperty('--rings', ss(flip, 0.25, 0.7).toFixed(3));
      book.style.opacity = String(1 - 0.85 * end);
      book.style.scale = String(1 - 0.06 * end);
      if (hint) hint.style.setProperty('--hint', String(1 - ss(p, 0, 0.05)));
      if (fin) {
        fin.style.opacity = String(end);
        fin.style.transform = `translateY(${(1 - end) * 2}rem)`;
        fin.style.pointerEvents = end > 0.6 ? 'auto' : 'none';
      }
      for (const { el, s, e, x, y } of animEls) {
        let t = ss(p, s, e);
        if (x !== undefined && y !== undefined) t *= 1 - ss(p, x, y);
        el.style.opacity = String(t);
        if (x === undefined) el.style.transform = `translateY(${(1 - t) * 0.6}em)`;
      }
    }

    function loop() {
      curRef.current += (targetRef.current - curRef.current) * 0.09;
      if (Math.abs(targetRef.current - curRef.current) < 2e-4) curRef.current = targetRef.current;
      render(curRef.current);
      rafRef.current = requestAnimationFrame(loop);
    }

    window.addEventListener('scroll', read, { passive: true });
    window.addEventListener('resize', read);
    read();
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('scroll', read);
      window.removeEventListener('resize', read);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className={styles.wrapper} ref={trackRef}>
      <div className={styles.stage}>
        <div className={styles.book} ref={bookRef}>

          {/* RIGHT PAGE */}
          <section className={styles.page} aria-label="Kedarkantha route">
            <div className={styles.box}>
              <p className={styles.lab} data-s="0.30" data-e="0.34" style={ANIM}>The itinerary</p>
              <h2 data-s="0.32" data-e="0.38" style={ANIM}>Six days, one summit</h2>
              {DAYS.map((d, i) => (
                <article key={i} className={styles.day} style={ANIM}
                  data-s={d.s} data-e={d.e}
                  {...(d.x !== undefined ? { 'data-x': String(d.x), 'data-y': String(d.y) } : {})}>
                  <p className={styles.lab}>{d.label}</p>
                  <h3>{d.title}</h3>
                  <p className={`${styles.meta} ${styles.hand}`}>{d.meta}</p>
                  <p className={styles.txt}>{d.body}</p>
                </article>
              ))}
            </div>
            <div className={styles.shade} />
          </section>

          {/* COVER */}
          <div className={styles.cover}>
            <div className={`${styles.face} ${styles.front}`}>
              <h1>KEDARKANTHA</h1>
              <hr />
              <p>The Winter Trek Journal<br />Uttarakhand, India</p>
            </div>
            <div className={`${styles.face} ${styles.back}`}>
              <div className={styles.box}>
                {/* Intro block – fades out when info block appears */}
                <div className={styles.intro} style={{ opacity: 0 }} data-x="0.60" data-y="0.68">
                  <p className={styles.lab} data-s="0.26" data-e="0.32" style={ANIM}>Your next adventure</p>
                  <h2 data-s="0.28" data-e="0.38" style={ANIM}>A journey into the Himalayas</h2>
                  <p className={styles.txt} data-s="0.34" data-e="0.46" style={ANIM}>
                    Kedarkantha is a winter trek in Uttarakhand&apos;s Govind Pashu Vihar region: pine forests, frozen meadows and a summit near 3,800&nbsp;m. The trek is a six-day round trip from Dehradun, with the walk beginning at the base village of Kotgaon.
                  </p>
                  <p className={`${styles.ann} ${styles.hand}`} data-s="0.40" data-e="0.50" style={ANIM}>Dehradun → Kotgaon → summit →</p>
                </div>
                {/* Facts block */}
                <div className={styles.info}>
                  <p className={styles.lab} data-s="0.62" data-e="0.66" style={ANIM}>Trek facts</p>
                  <dl data-s="0.63" data-e="0.74" style={ANIM}>
                    <dt>Trek</dt><dd>Kedarkantha, Uttarakhand</dd>
                    <dt>Duration</dt><dd>6 days, from and back to Dehradun</dd>
                    <dt>Difficulty</dt><dd>Easy to moderate</dd>
                    <dt>Trek base</dt><dd>Kotgaon (195 km from Dehradun)</dd>
                    <dt>On foot</dt><dd>About 22.6 km over 4 trekking days</dd>
                    <dt>Best season</dt><dd>December – April</dd>
                    <dt>Price</dt><dd>See booking page</dd>
                    <dt>Inclusions</dt><dd>See itinerary page</dd>
                  </dl>
                  <p className={`${styles.note} ${styles.hand}`} data-s="0.70" data-e="0.80" style={ANIM}>
                    Clear weather reveals sweeping Himalayan views from the top.
                  </p>
                </div>
              </div>
              <div className={styles.shade} />
            </div>
          </div>

          {/* Rings */}
          <div className={styles.rings} aria-hidden="true">
            {RINGS.map((_, i) => <i key={i} className={styles.ring} />)}
          </div>
        </div>

        {/* Final CTA */}
        <aside className={styles.final} ref={finalRef}>
          <h2>YOUR NEXT CHAPTER STARTS IN THE MOUNTAINS</h2>
          <p>Experience the magic of Kedarkantha with our guided Himalayan trek.</p>
          <div className={styles.btns}>
            <Link className={styles.btn} href="/treks/kedarkantha-trek">BOOK YOUR KEDARKANTHA TREK</Link>
            <Link className={`${styles.btn} ${styles.btnAlt}`} href="/treks/kedarkantha-trek">VIEW ITINERARY</Link>
          </div>
        </aside>

        <div className={styles.hint} ref={hintRef}>scroll to open</div>
      </div>
    </div>
  );
}
