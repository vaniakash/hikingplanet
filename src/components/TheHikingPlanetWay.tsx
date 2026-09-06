'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const blocks = [
  {
    title: '01 — Walk Local',
    subtitle: 'Discover trails beyond the usual tourist routes.',
    description: 'We take you beyond crowded viewpoints and well-known paths to discover quieter trails, remote valleys, alpine meadows, and routes that reveal a different side of the mountains.',
    iconSrc: '/icons/carbon-footprint.png',
    iconBg: 'bg-amber-50',
  },
  {
    title: '02 — Meet Local',
    subtitle: 'Meet the people who know these mountains as home.',
    description: 'From local guides and village hosts to the people you meet along the trail, connect with communities whose lives and stories are deeply rooted in the mountains.',
    iconSrc: '/icons/friendly.png',
    iconBg: 'bg-green-50',
  },
  {
    title: '03 — Experience Local',
    subtitle: 'See the mountains through the culture that surrounds them.',
    description: 'Share local food, hear stories, experience traditions, and slow down enough to notice the everyday details that make each mountain region different.',
    iconSrc: '/icons/heart.png',
    iconBg: 'bg-red-50',
  },
  {
    title: '04 — Give Back Local',
    subtitle: 'Make your journey meaningful for the communities you visit.',
    description: 'We believe tourism can create opportunities close to home. By working with local people and businesses, your journey can contribute to the communities that make these destinations worth discovering.',
    iconSrc: '/icons/round-table.png',
    iconBg: 'bg-emerald-50',
  },
];

export default function TheHikingPlanetWay() {
  return (
    <section className="py-24 bg-[#F4F1EA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="mb-16 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight font-serif">
            More Than a Trek. It's a Local Experience.
          </h2>
          <div className="h-[3px] w-24 bg-[#E5B53A] mb-8"></div>
          
          <div className="space-y-4 text-lg md:text-xl text-slate-700 leading-relaxed">
            <p>
              <strong>The mountains are more than their views. They are trails walked for generations, villages built into the valleys, stories passed down through families, and communities that call these landscapes home.</strong>
            </p>
            <p>
              <strong>With Hiking Planet, we go beyond simply taking you from one point to another. We want you to experience the mountains through the people, places, culture, and trails that make them truly special.</strong>
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {blocks.map((block, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col"
            >
              <div className="flex justify-between items-start gap-4 mb-4">
                <div className="pr-4">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                    {block.title}
                  </h3>
                  <h4 className="text-base md:text-lg font-bold text-slate-800 leading-snug">
                    {block.subtitle}
                  </h4>
                </div>
                <div className={`w-16 h-16 rounded-full flex-shrink-0 flex items-center justify-center ${block.iconBg}`}>
                  <Image 
                    src={block.iconSrc} 
                    alt={block.title} 
                    width={32} 
                    height={32} 
                    className="w-8 h-8 object-contain"
                  />
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base mt-2">
                {block.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-2xl p-8 md:p-10 border border-gray-100 shadow-sm gap-8">
          <p className="text-xl md:text-2xl font-bold text-slate-900 font-serif leading-relaxed flex-1">
            We don't just take you to the mountains. We connect you with the people, places and stories that make them worth remembering.
          </p>
          <Link 
            href="/about"
            className="flex-shrink-0 inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#2D4030] text-white rounded-full font-bold tracking-wide hover:bg-[#1f2c21] transition-all duration-300 hover:-translate-y-0.5"
          >
            DISCOVER OUR STORY
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
