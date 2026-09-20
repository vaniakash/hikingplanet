'use client';

import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Review {
  reviewerName: string;
  trekGroup: string;
  title: string;
  content: string;
}

export default function TrekDetailReviews({ reviews }: { reviews?: Review[] }) {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  if (!reviews || reviews.length === 0) return null;

  const reviewsPerPage = 4;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const startIndex = (currentPage - 1) * reviewsPerPage;
  const currentReviews = reviews.slice(startIndex, startIndex + reviewsPerPage);

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`w-8 h-8 flex items-center justify-center rounded text-sm font-semibold transition ${
            currentPage === i
              ? 'bg-yellow-400 text-gray-900'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex items-center justify-center space-x-2 mt-12">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="flex items-center text-gray-500 hover:text-gray-900 disabled:opacity-50 disabled:hover:text-gray-500 text-sm font-medium mr-2"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Previous
        </button>
        {pages}
        <button
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="flex items-center text-gray-900 hover:text-gray-600 disabled:opacity-50 disabled:hover:text-gray-900 text-sm font-medium ml-2"
        >
          Next <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    );
  };

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Trekker Reviews
      </h2>
      
      {/* Top Border Line */}
      <div className="w-full h-[2px] bg-yellow-400 mb-10"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {currentReviews.map((review, idx) => (
          <div key={idx} className="flex flex-col">
            <h3 className="font-bold text-gray-800 dark:text-gray-100 text-[13px] uppercase tracking-wide">
              {review.reviewerName}
            </h3>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-6 mt-1 font-semibold capitalize tracking-wider">
              {review.trekGroup}
            </p>
            <h4 className="font-bold text-gray-900 dark:text-white text-[17px] leading-snug mb-3 font-serif">
              {review.title}
            </h4>
            <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              <span>{review.content.length > 200 ? review.content.substring(0, 200) : review.content}</span>
              {review.content.length > 200 && (
                <button
                  onClick={() => setSelectedReview(review)}
                  className="text-blue-700 dark:text-blue-500 font-semibold hover:underline inline text-[13px]"
                >
                  ...Read More
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {renderPagination()}

      {/* Modal */}
      {selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-10 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl animate-in fade-in zoom-in-95 duration-200 border-b-[8px] border-yellow-400">
            <button
              onClick={() => setSelectedReview(null)}
              className="absolute top-6 right-6 p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-[16px] capitalize pr-10">
              {selectedReview.reviewerName.toLowerCase()}
            </h3>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-6 mt-1 font-semibold capitalize tracking-wider">
              {selectedReview.trekGroup}
            </p>
            <div className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap text-[15px]">
              {selectedReview.content}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
