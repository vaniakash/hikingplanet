'use client';

import React from 'react';
import { Star, MapPin } from 'lucide-react';

const trekReviews = [
  {
    id: 1,
    name: "Arjun Mehta",
    profession: "Software Engineer",
    location: "Bengaluru",
    trek: "Har Ki Dun",
    experience: "Solo",
    rating: 5,
    review: "Har Ki Dun was an incredible experience for my first longer Himalayan trek. The valley, forests and traditional villages made the journey feel completely different from a regular holiday."
  },
  {
    id: 2,
    name: "Neha Sharma",
    profession: "Product Designer",
    location: "Pune",
    trek: "Shastra Tal",
    experience: "Group — Friends",
    rating: 5,
    review: "We went as a group of friends and Shastra Tal turned out to be an unforgettable adventure. The remote trails and peaceful surroundings were the highlights of the trip."
  },
  {
    id: 3,
    name: "Rohan Kapoor",
    profession: "Travel Photographer",
    location: "Delhi",
    trek: "Gidara Bugyal",
    experience: "Solo",
    rating: 5,
    review: "Gidara Bugyal was exactly the kind of remote Himalayan experience I was looking for. The open meadows and mountain views were incredible, especially during sunrise."
  },
  {
    id: 4,
    name: "Priya Nair",
    profession: "HR Manager",
    location: "Mumbai",
    trek: "Gomukh–Tapovan",
    experience: "Group — Colleagues",
    rating: 5,
    review: "Our office group had an amazing experience on Gomukh–Tapovan. The glacier sections and dramatic mountain scenery made every day feel like a real expedition."
  },
  {
    id: 5,
    name: "Aditya Singh",
    profession: "Startup Founder",
    location: "Gurugram",
    trek: "Kush Kalyan Bugyal",
    experience: "Solo",
    rating: 5,
    review: "Kush Kalyan Bugyal gave me exactly what I wanted — solitude, beautiful Himalayan landscapes and a break from city life. It was challenging but extremely rewarding."
  },
  {
    id: 6,
    name: "Simran Kaur",
    profession: "Marketing Specialist",
    location: "Chandigarh",
    trek: "Tapovan",
    experience: "Group — Friends",
    rating: 5,
    review: "Tapovan was one of the most memorable mountain experiences I have had with friends. The landscapes around the trail were spectacular and every day brought something new."
  },
  {
    id: 7,
    name: "Vikram Joshi",
    profession: "Civil Engineer",
    location: "Jaipur",
    trek: "Kedarkantha",
    experience: "Group — Family",
    rating: 5,
    review: "We did Kedarkantha as a family and everyone enjoyed the experience. The snow, campsites and summit views made it a trip we will remember for a long time."
  },
  {
    id: 8,
    name: "Riya Verma",
    profession: "UX Designer",
    location: "Hyderabad",
    trek: "Har Ki Dun",
    experience: "Group — Friends",
    rating: 5,
    review: "Har Ki Dun was a perfect combination of adventure and beautiful Himalayan scenery. Our group really enjoyed the trail and the peaceful atmosphere throughout the trek."
  },
  {
    id: 9,
    name: "Karan Malhotra",
    profession: "Finance Professional",
    location: "Noida",
    trek: "Gidara Bugyal",
    experience: "Group — Friends",
    rating: 5,
    review: "We wanted something less ordinary and Gidara Bugyal was an amazing choice. The huge alpine meadows and mountain views made the trek feel truly special."
  },
  {
    id: 10,
    name: "Ananya Gupta",
    profession: "Content Strategist",
    location: "Lucknow",
    trek: "Gomukh–Tapovan",
    experience: "Solo",
    rating: 5,
    review: "Gomukh–Tapovan was a challenging but unforgettable solo adventure. The dramatic Himalayan landscape and the experience of walking towards the glacier made it completely worth it."
  }
];

// Helper to get initials
const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').substring(0, 2);
};

export default function TrekkerReviews() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="mb-16 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight font-serif">
            Stories From the Trail
          </h2>
          <div className="h-[3px] w-24 bg-[#E5B53A] mb-8"></div>
          
          <div className="space-y-4 text-lg md:text-xl text-slate-700 leading-relaxed">
            <p>
              Experiences from trekkers who explored the Himalayas with HikingPlanet.
            </p>
          </div>
        </div>

        {/* Horizontal Scrolling Container */}
        <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          {trekReviews.map((review) => (
            <div 
              key={review.id}
              className="bg-[#F4F1EA] rounded-2xl p-8 shadow-sm border border-gray-100 flex-shrink-0 w-[300px] md:w-[400px] flex flex-col snap-center snap-always"
            >
              {/* Stars & Badges */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#E5B53A] text-[#E5B53A]" />
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <div className="flex-grow mb-8">
                <p className="text-slate-700 leading-relaxed italic text-lg">
                  "{review.review}"
                </p>
              </div>
              
              {/* Trek & Experience Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#2D4030] text-white">
                  {review.trek}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white border border-gray-200 text-slate-700">
                  {review.experience}
                </span>
              </div>

              {/* User Info */}
              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-200">
                <div className="w-12 h-12 rounded-full bg-[#E5B53A] text-slate-900 flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {getInitials(review.name)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{review.name}</h4>
                  <p className="text-sm text-slate-600 flex items-center gap-1">
                    {review.profession}
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" /> {review.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
