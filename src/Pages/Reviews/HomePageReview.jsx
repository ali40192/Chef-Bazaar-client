const HomePageReview = ({ review }) => {
  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-xl shadow-md p-4 sm:p-6">
      {/* Top Row: Rating + Date */}
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <div className="text-orange-500 text-xs sm:text-sm">
          ★ ★ ★ ★ ★{review.rating}
        </div>
        <span className="text-[10px] sm:text-xs text-gray-400">
          {review.date}
        </span>
      </div>

      <h4 className="font-semibold text-base sm:text-lg text-gray-800 mb-1 sm:mb-2">
        {review.mealName}
      </h4>

      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3 sm:mb-4">
        {review.comment}
      </p>

      {/* Footer */}

      <div className="divider">
        <p className="text-[10px] sm:text-xs text-gray-500 text-center ">
          Reviewed on <span className="font-medium">LocalChefBazaar</span>
        </p>
      </div>
    </div>
  );
};

export default HomePageReview;
