import React from "react";

const ReviewCard = ({ review }) => {
  const { reviewerName, reviewerImage, rating, comment, date } = review;

  const stars = "★".repeat(rating) + "☆".repeat(5 - rating);

  return (
    <div className="bg-[#FBF8EE] p-4 rounded-md mb-4">
      {/* Stars */}
      <div className="flex justify-start mb-2 text-orange-500 text-lg">
        {stars}
      </div>

      {/* Review Text */}
      <p className="text-sm sm:text-base text-[#1F3A2F] leading-relaxed mb-3">
        {comment}
      </p>

      {/* Reviewer */}
      <div className="flex items-center gap-3">
        <img
          src={
            reviewerImage || "https://randomuser.me/api/portraits/women/44.jpg"
          }
          alt={reviewerName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold text-sm text-[#1F3A2F]">
            {reviewerName}
          </h4>
          <p className="text-xs text-gray-500">
            {date ? new Date(date).toLocaleDateString() : "Recent"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
