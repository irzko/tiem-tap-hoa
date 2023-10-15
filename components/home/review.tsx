"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Review({ data }: { data: IReview[] }) {
  const [reviews, setReviews] = useState(data);
  const {data: session} = useSession();

  return (
    <div>
      {reviews.map((review) => (
        <article key={review.reviewId} className="mb-5">
          <div className="flex items-center mb-4 space-x-4">
            {/* <img className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt=""> */}
            <div className="space-y-1 font-medium dark:text-white">
              <p>{review.user.fullName}</p>
            </div>
          </div>
          <div className="flex items-center mb-1">
            <svg
              className={`w-4 h-4 mr-1 ${
                review.rating >= 1
                  ? "text-yellow-300"
                  : "text-gray-300 dark:text-gray-500"
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className={`w-4 h-4 mr-1 ${
                review.rating >= 2
                  ? "text-yellow-300"
                  : "text-gray-300 dark:text-gray-500"
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className={`w-4 h-4 mr-1 ${
                review.rating >= 3
                  ? "text-yellow-300"
                  : "text-gray-300 dark:text-gray-500"
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className={`w-4 h-4 mr-1 ${
                review.rating >= 4
                  ? "text-yellow-300"
                  : "text-gray-300 dark:text-gray-500"
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className={`w-4 h-4 mr-1 ${
                review.rating >= 5
                  ? "text-yellow-300"
                  : "text-gray-300 dark:text-gray-500"
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            {/* <h3 className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
              Thinking to buy another one!
            </h3> */}
          </div>
          <footer className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <p>
              Đánh giá vào lúc{" "}
              <time>{review.createdAt.toLocaleString("vi-VN")}</time>
            </p>
          </footer>
          <p className="text-gray-500 dark:text-gray-400">{review.review}</p>
          {/* <a
            href="#"
            className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            Read more
          </a> */}
          <aside>
            {review._count.Usefulness > 0 && (
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {review._count.Usefulness} người thấy bài đánh giá này hữu ích
              </p>
            )}
            <div className="flex items-center mt-3 space-x-3 divide-x divide-gray-200 dark:divide-gray-600">
              <a
                href="#"
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-2 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Hữu ích
              </a>
              {/* <a
                href="#"
                className="pl-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Report abuse
              </a> */}
            </div>
          </aside>
        </article>
      ))}
    </div>
  );
}
