import { removeFromCart } from "@/redux/slices/cartSlice";
import Image from "next/image";
import React from "react";

import { FaStar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";

export default function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <div className="flex flex-1 flex-col">
      {cart.map((course, indx) => (
        <div
          key={course._id}
          className={`flex p-2 w-full flex-wrap items-start justify-between  bg-gray-800 gap-6 ${
            indx !== cart.length - 1 && "border-b border-b-gray-400 "
          } ${indx !== 0 && "mt-6"} `}
        >
          <div className="flex flex-1 flex-col gap-4 xl:flex-row">
            <Image
              width={220}
              height={148}
              src={course?.thumbnail}
              alt={course?.courseName}
              className="h-[148px] w-[220px] rounded-lg object-cover"
            />
            <div className="flex flex-col space-y-1">
              <p className="text-lg font-medium text-gray-300">
                {course?.courseName}
              </p>
              <p className="text-sm text-gray-400">{course?.category?.name}</p>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">4.5</span>
                <ReactStars
                  count={5}
                  value={course?.ratingAndReviews?.length}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                />
                <span className="text-yellow-400">
                  {course?.ratingAndReviews?.length} Reviews
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <button
              onClick={() => dispatch(removeFromCart(course._id))}
              className="flex items-center gap-x-1 rounded-md border border-gray-600 bg-gray-900 py-3 px-[12px] text-pink-400 hover:scale-95 transition-all duration-300 ease-in-out"
            >
              <RiDeleteBin6Line />
              <span>Remove</span>
            </button>
            <p className="mb-6 text-3xl font-medium text-yellow-400">
              $ {course?.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
