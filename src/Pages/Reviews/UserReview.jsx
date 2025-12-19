import React, { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import UpdateReviewModal from "../../RoleBase/User/UpdateReviewModal";

const UserReview = ({ review }) => {
  const axiosSecure = useAxiosSecure();
  const { rating, comment, date, mealName } = review;

  const [openModal, setOpenModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axiosSecure.delete(`/reviews/${review.foodId}`);
          toast.success("Review deleted successfully");
          window.location.reload();
        } catch (error) {
          toast.error(error.message);
        }

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  ////update related kaj

  const handleUpdate = async (id, updatedData) => {
    await axiosSecure.patch(`/reviews/${id}`, updatedData);
    window.location.reload();
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-xl shadow-md p-4 sm:p-6">
      {/* Top Row: Rating + Date */}
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <div className="text-orange-500 text-xs sm:text-sm">
          ★ ★ ★ ★ ★{rating}
        </div>
        <span className="text-[10px] sm:text-xs text-gray-400">{date}</span>
      </div>

      <h4 className="font-semibold text-base sm:text-lg text-gray-800 mb-1 sm:mb-2">
        {mealName}
      </h4>

      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3 sm:mb-4">
        {comment}
      </p>

      {/* Footer */}
      <div className="border-t pt-3 sm:pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-[10px] sm:text-xs text-gray-500">
          Reviewed on <span className="font-medium">LocalChefBazaar</span>
        </p>

        <div className="flex w-full sm:w-auto gap-2 justify-end">
          <div>
            <button
              onClick={() => {
                setSelectedReview(review);
                setOpenModal(true);
              }}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-medium rounded-md border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition"
            >
              Update
            </button>

            <UpdateReviewModal
              isOpen={openModal}
              onClose={() => setOpenModal(false)}
              review={selectedReview}
              onUpdate={handleUpdate}
            />
          </div>

          <button
            onClick={handleDelete}
            className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-medium rounded-md border border-primary text-primary hover:bg-primary hover:text-white transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserReview;
