import React, { useState, useEffect } from "react";

const UpdateReviewModal = ({ isOpen, onClose, review, onUpdate }) => {
  const [rating, setRating] = useState(review?.rating || 5);
  const [comment, setComment] = useState(review?.comment || "");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (review) {
      setRating(review.rating);
      setComment(review.comment);
      setSuccess(false);
    }
  }, [review]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedReview = {
      rating,
      comment,
    };

    await onUpdate(review.foodId, updatedReview);

    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Update Your Review</h3>

        {success && (
          <div className="alert alert-success mb-4">
            <span> Review updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating */}
          <div>
            <label className="label font-medium">Rating</label>
            <select
              className="select select-bordered w-full"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r} Star{r > 1 && "s"}
                </option>
              ))}
            </select>
          </div>

          {/* Comment */}
          <div>
            <label className="label font-medium">Comment</label>
            <textarea
              className="textarea textarea-bordered w-full"
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="modal-action">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update Review
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateReviewModal;
