import React from "react";

const UserReview = ({ review }) => {
  const { rating, comment, date, mealName } = review;

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-xl shadow-md p-4 sm:p-6">
      {/* Top Row: Rating + Date */}
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <div className="text-orange-500 text-xs sm:text-sm">
          ★ ★ ★ ★ ★{rating}
        </div>
        <span className="text-[10px] sm:text-xs text-gray-400">{date}</span>
      </div>

      {/* Meal Name */}
      <h4 className="font-semibold text-base sm:text-lg text-gray-800 mb-1 sm:mb-2">
        {mealName}
      </h4>

      {/* Comment */}
      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3 sm:mb-4">
        {comment}
      </p>

      {/* Footer */}
      <div className="border-t pt-3 sm:pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-[10px] sm:text-xs text-gray-500">
          Reviewed on <span className="font-medium">LocalChefBazaar</span>
        </p>

        {/* Action Buttons */}
        <div className="flex w-full sm:w-auto gap-2 justify-end">
          <button className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-medium rounded-md border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition">
            Update
          </button>

          <button className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-medium rounded-md border border-primary text-primary hover:bg-primary hover:text-white transition">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserReview;
