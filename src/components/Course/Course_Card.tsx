import GetAvgRating from "@/utils/avgRating";
import RatingStars from "@/utils/RatingStars";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Course_Card = ({ course, Height }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    // Calculate average rating if ratingAndReviews is available
    const count = GetAvgRating(course?.ratingAndReviews || []);
    setAvgReviewCount(count);
  }, [course]);

  return (
    <Link href={`/CourseDetails/${course._id}`}>
      <div className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-gray-900">
        <div className="rounded-lg">
          <Image
            width={300}
            height={200}
            src={course?.thumbnail}
            alt="course thumbnail"
            className={`${Height} w-full rounded-t-xl object-cover`}
          />
        </div>
        <div className="flex flex-col gap-2 px-2 py-3">
          {/* Course Name */}
          <p className="text-xl font-semibold text-gray-100">
            {course?.courseName}
          </p>

          {/* Instructor - Assuming instructor is just an ID */}
          <p className="text-sm text-gray-400">
            Instructor:{" "}
            {course?.instructor?.firstName && course?.instructor?.lastName
              ? `${course.instructor.firstName} ${course.instructor.lastName}`
              : "Unknown"}
          </p>

          {/* Rating and Review */}
          <div className="flex items-center gap-2">
            <span className="text-yellow-400">{avgReviewCount || 0}</span>
            <RatingStars Review_Count={avgReviewCount} Star_Size={20} />
            <span className="text-gray-400">
              {course?.ratingAndReviews?.length || 0} Ratings
            </span>
          </div>

          {/* Price */}
          <p className="text-xl text-gray-300">
            Rs. <span className="text-yellow-400">{course?.price} $</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Course_Card;
