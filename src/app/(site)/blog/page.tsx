import Image from 'next/image';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

export const metadata = {
    title: 'Trek Knowledge Hub | Guides & Safety Tips',
    description:
        'Practical guides, safety insights, and expert advice to help you plan, prepare for, and successfully complete your Himalayan trekking journey.',
    alternates: { canonical: 'https://www.hikingplanet.in/blog' },
    openGraph: {
        type: 'website',
        url: 'https://www.hikingplanet.in/blog',
        title: 'Trek Knowledge Hub | HikingPlanet',
        description:
            'Expert packing lists, altitude sickness guides, destination insights, and route tips curated by our certified Himalayan trek leaders.',
        images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'HikingPlanet — Trek Knowledge Hub' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Trek Knowledge Hub | HikingPlanet',
        description: 'Expert trekking guides, safety tips, and Himalayan destination insights.',
        images: ['/og-image.jpg'],
    },
};


/* ── Static blog / guide data ── */
const featuredPost = {
    tag: 'Trek Guide | Featured',
    meta: 'January 2026 • By HikingPlanet Team',
    title: 'Kedarkantha Trek — Complete Guide for Beginners',
    excerpt:
        'Everything you need to know about one of the most popular winter treks in the Himalayas. From route maps to packing lists, get ready for the summit.',
    image: '/images/hero.webp',
    href: '#',
};

const gridPosts = [
    {
        tag: 'Preparation Guide',
        title: 'What to Pack for a Himalayan Trek — Complete Checklist',
        excerpt: "Don't overpack or underprepare. A comprehensive list of essential gear for high-altitude trekking.",
        image: '/images/herosection.webp',
        href: '#',
    },
    {
        tag: 'Safety Guide',
        title: 'Understanding Altitude Sickness — Prevention & Safety',
        excerpt: 'Learn the symptoms of AMS, HAPE, and HACE, and how to acclimatize effectively for a safe ascent.',
        image: '/images/heroji.webp',
        href: '#',
    },
    {
        tag: 'Destination Insight',
        title: 'Best Treks in Uttarakhand for First-Time Trekkers',
        excerpt: 'Discover beginner-friendly trails offering stunning views without requiring technical mountaineering skills.',
        image: '/images/herosectionne.webp',
        href: '#',
    },
    {
        tag: 'Seasonal Guide',
        title: 'Winter Trekking in India — What to Expect',
        excerpt: 'Prepare for snow-covered landscapes and sub-zero temperatures. Is a winter trek right for you?',
        image: '/images/hero.webp',
        href: '#',
    },
];

const listPosts = [
    {
        tag: 'Planning Guide',
        title: 'How to Choose the Right Trek for Your Fitness Level',
        excerpt: 'Matching your physical capabilities with the trek difficulty grade ensures a more enjoyable experience.',
        image: '/images/herosection.webp',
        readTime: '5 Min Read',
        href: '#',
    },
    {
        tag: 'Experience Story',
        title: 'My First Himalayan Trek — What I Learned',
        excerpt: 'A personal account of overcoming challenges and discovering the magic of the mountains.',
        image: '/images/heroji.webp',
        readTime: '8 Min Read',
        href: '#',
    },
];

const popularGuides = [
    { num: '01', title: "Beginner's Guide to Trekking Shoes" },
    { num: '02', title: 'Layering 101: How to Dress for the Cold' },
    { num: '03', title: 'Trekking Pole Techniques for Steep Descents' },
];

const topics = ['Preparation', 'Safety', 'Gear Reviews', 'Routes', 'Fitness'];

export default function BlogPage() {
    return (
        <div className="bg-[#F4F1EA]">

            {/* ── Hero ── */}
            <header className="relative min-h-[85vh] w-full flex items-center pt-20">
                <div className="absolute inset-0">
                    <Image
                        src="/images/hero.webp"
                        alt="Trekking camp under stars"
                        fill
                        priority
                        className="object-cover"
                        quality={90}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/60 to-transparent" />
                    <div className="absolute inset-0 indigenous-pattern" style={{ opacity: 0.1 }} />
                </div>
                <div className="relative z-10 container mx-auto px-6 max-w-7xl py-20">
                    <FadeIn>
                        <div className="max-w-4xl">
                            <div className="inline-flex items-center gap-2 mb-6 text-[#C25E44] font-black uppercase tracking-[0.4em] text-xs">
                                <span className="w-12 h-px bg-[#C25E44]" />
                                Essential Reading
                            </div>
                            <h1 className="text-6xl md:text-8xl font-extrabold text-white leading-[0.85] mb-8 uppercase tracking-tight">
                                Trek <br />
                                <span className="text-[#C25E44] italic">Knowledge</span> Hub
                            </h1>
                            <p className="text-white/70 text-xl max-w-2xl font-light leading-relaxed mb-10">
                                Practical guides, safety insights, and expert advice to help you plan, prepare for, and
                                successfully complete your Himalayan trekking journey.
                            </p>
                            <div className="flex items-center gap-6">
                                <div className="flex -space-x-3">
                                    <div className="w-12 h-12 rounded-full border-2 border-[#0F172A] bg-[#C25E44] flex items-center justify-center font-bold text-white text-xs overflow-hidden relative">
                                        <Image src="/images/herosection.webp" alt="Author" fill className="object-cover" />
                                    </div>
                                    <div className="w-12 h-12 rounded-full border-2 border-[#0F172A] bg-[#C25E44] flex items-center justify-center font-bold text-white text-xs">
                                        +4
                                    </div>
                                </div>
                                <div className="text-white/60 text-xs uppercase tracking-widest font-bold">
                                    Curated by <span className="text-white">Expert Trek Leaders</span>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </header>

            {/* ── Main Content ── */}
            <main className="container mx-auto px-6 max-w-7xl py-24">
                <div className="grid lg:grid-cols-12 gap-16">

                    {/* ── Left: Articles ── */}
                    <div className="lg:col-span-8 space-y-20">

                        {/* Featured Article */}
                        <FadeIn>
                            <article className="group relative bg-white overflow-hidden shadow-2xl angular-card">
                                <div className="h-[480px] overflow-hidden">
                                    <Image
                                        src={featuredPost.image}
                                        alt={featuredPost.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-1000"
                                    />
                                </div>
                                <div className="p-12">
                                    <div className="flex items-center gap-4 mb-6">
                                        <span className="px-4 py-1 bg-[#C25E44] text-white text-[10px] font-black uppercase tracking-widest">
                                            {featuredPost.tag}
                                        </span>
                                        <span className="text-[#0F172A]/40 text-[10px] font-bold uppercase tracking-widest">
                                            {featuredPost.meta}
                                        </span>
                                    </div>
                                    <h2 className="text-4xl font-extrabold mb-6 leading-tight group-hover:text-[#C25E44] transition-colors uppercase tracking-tight">
                                        {featuredPost.title}
                                    </h2>
                                    <p className="text-[#0F172A]/60 text-lg font-normal leading-relaxed mb-8">
                                        {featuredPost.excerpt}
                                    </p>
                                    <Link
                                        href={featuredPost.href}
                                        className="inline-flex items-center gap-3 text-[#C25E44] font-black uppercase tracking-widest text-xs border-b-2 border-[#C25E44]/20 pb-1 hover:border-[#C25E44] transition-all"
                                    >
                                        Read Guide
                                        <ArrowRight weight="bold" className="w-4 h-4" />
                                    </Link>
                                </div>
                            </article>
                        </FadeIn>

                        {/* 2×2 Article Grid */}
                        <div className="grid md:grid-cols-2 gap-12">
                            {gridPosts.map((post, i) => (
                                <FadeIn key={post.title} delay={i * 0.1}>
                                    <article className="group cursor-pointer">
                                        <div className="h-64 overflow-hidden mb-6 angular-card relative">
                                            <Image
                                                src={post.image}
                                                alt={post.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>
                                        <span className="inline-block px-3 py-1 bg-[#C25E44] text-white text-[9px] font-black uppercase tracking-widest mb-4">
                                            {post.tag}
                                        </span>
                                        <h3 className="text-2xl font-extrabold mb-4 leading-tight group-hover:text-[#C25E44] transition-colors uppercase tracking-tight">
                                            {post.title}
                                        </h3>
                                        <p className="text-[#0F172A]/60 text-sm font-normal leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                    </article>
                                </FadeIn>
                            ))}
                        </div>

                        {/* Geometric Divider */}
                        <div className="py-4 border-y border-[#0F172A]/5 relative">
                            <div className="absolute inset-0 indigenous-pattern" />
                            <div className="relative z-10 flex items-center justify-center gap-4 py-8">
                                <span className="w-24 h-px bg-[#C25E44]" />
                                <div className="w-3 h-3 rotate-45 border-2 border-[#C25E44]" />
                                <span className="w-24 h-px bg-[#C25E44]" />
                            </div>
                        </div>

                        {/* Horizontal List Articles */}
                        <div className="space-y-12">
                            {listPosts.map((post, i) => (
                                <FadeIn key={post.title} delay={i * 0.1}>
                                    <article className="flex flex-col md:flex-row gap-8 items-center group cursor-pointer">
                                        <div className="w-full md:w-1/3 h-56 overflow-hidden angular-card shrink-0 relative">
                                            <Image
                                                src={post.image}
                                                alt={post.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>
                                        <div>
                                            <span className="inline-block px-3 py-1 bg-[#C25E44] text-white text-[9px] font-black uppercase tracking-widest mb-4">
                                                {post.tag}
                                            </span>
                                            <h3 className="text-2xl font-extrabold mb-3 leading-tight group-hover:text-[#C25E44] transition-colors uppercase tracking-tight">
                                                {post.title}
                                            </h3>
                                            <p className="text-[#0F172A]/60 text-sm font-normal leading-relaxed mb-4">
                                                {post.excerpt}
                                            </p>
                                            <span className="text-[10px] font-bold text-[#0F172A]/40 uppercase tracking-widest">
                                                {post.readTime}
                                            </span>
                                        </div>
                                    </article>
                                </FadeIn>
                            ))}
                        </div>
                    </div>

                    {/* ── Right: Sidebar ── */}
                    <aside className="lg:col-span-4 space-y-16">

                        {/* Popular Guides */}
                        <FadeIn>
                            <div className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <h4 className="text-sm font-black uppercase tracking-[0.3em] text-[#0F172A] whitespace-nowrap">
                                        Popular Guides
                                    </h4>
                                    <div
                                        className="flex-1 h-px"
                                        style={{
                                            backgroundImage: 'repeating-linear-gradient(90deg, #C25E44, #C25E44 2px, transparent 2px, transparent 10px)',
                                        }}
                                    />
                                </div>
                                <ul className="space-y-8">
                                    {popularGuides.map((g, i) => (
                                        <li key={g.num} className="group cursor-pointer">
                                            <span className="text-xs text-[#C25E44] font-black mb-2 block">{g.num}</span>
                                            <h5 className="font-extrabold text-lg leading-tight group-hover:text-[#C25E44] transition-colors uppercase tracking-tight">
                                                {g.title}
                                            </h5>
                                            {i === 0 && (
                                                <div className="mt-2 w-0 group-hover:w-full h-0.5 bg-[#C25E44] transition-all duration-500" />
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </FadeIn>

                        {/* Browse by Topic */}
                        <FadeIn delay={0.1}>
                            <div className="bg-[#2D4030]/5 p-10 space-y-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 indigenous-pattern opacity-20 -mr-16 -mt-16" />
                                <div className="flex items-center gap-4">
                                    <h4 className="text-sm font-black uppercase tracking-[0.3em] text-[#0F172A] whitespace-nowrap">
                                        Browse by Topic
                                    </h4>
                                    <div
                                        className="flex-1 h-px"
                                        style={{
                                            backgroundImage: 'repeating-linear-gradient(90deg, #C25E44, #C25E44 2px, transparent 2px, transparent 10px)',
                                        }}
                                    />
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {topics.map((topic) => (
                                        <a
                                            key={topic}
                                            href="#"
                                            className="px-4 py-2 bg-white text-xs font-bold uppercase tracking-widest border border-[#0F172A]/5 hover:bg-[#C25E44] hover:text-white transition-all"
                                        >
                                            {topic}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </FadeIn>

                        {/* Ask an Expert */}
                        <FadeIn delay={0.2}>
                            <div className="p-10 bg-[#0F172A] text-white space-y-6 angular-card">
                                <span className="material-symbols-outlined text-[#C25E44] text-4xl">local_library</span>
                                <h4 className="text-xl font-extrabold uppercase tracking-tight">Ask an Expert</h4>
                                <p className="text-white/60 text-sm leading-relaxed">
                                    Have specific questions about your upcoming trek? Our experienced trek leaders are here to help.
                                </p>
                                <Link href="/contact">
                                    <button className="w-full py-4 border border-white/20 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-[#0F172A] transition-all mt-2">
                                        Get in Touch
                                    </button>
                                </Link>
                            </div>
                        </FadeIn>
                    </aside>
                </div>
            </main>

            {/* ── Newsletter CTA ── */}
            <section className="py-24 px-6">
                <div className="container mx-auto max-w-7xl">
                    <div className="bg-[#C25E44] relative overflow-hidden angular-card">
                        <div className="absolute inset-0 indigenous-pattern" style={{ opacity: 0.2 }} />
                        <div className="relative z-10 px-12 py-20 md:p-24 grid lg:grid-cols-2 gap-16 items-center">
                            <div className="text-white">
                                <span className="text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">
                                    Stay Prepared
                                </span>
                                <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 uppercase tracking-tight">
                                    Trek Updates &amp;<br />
                                    Preparation <span className="italic underline decoration-white/20">Tips</span>
                                </h2>
                                <p className="text-white/80 text-lg max-w-md">
                                    Join our community to receive the latest trek news, seasonal alerts, and exclusive
                                    preparation guides directly to your inbox.
                                </p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col md:flex-row gap-4">
                                    <input
                                        type="email"
                                        placeholder="YOUR EMAIL ADDRESS"
                                        className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 px-8 py-5 text-white placeholder-white/40 focus:ring-white focus:border-white uppercase text-xs font-black tracking-widest outline-none"
                                    />
                                    <button className="bg-[#0F172A] text-white px-10 py-5 font-extrabold uppercase tracking-widest hover:bg-black transition-all text-sm whitespace-nowrap">
                                        Subscribe
                                    </button>
                                </div>
                                <p className="text-[10px] text-white/40 uppercase tracking-widest">
                                    We respect your inbox. Unsubscribe at any time.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
