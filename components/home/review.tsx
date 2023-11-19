"use client";
import React, { FormEvent, SVGProps, useState } from "react";
import { useSession } from "next-auth/react";
import { Button, Textarea, User } from "@nextui-org/react";
import useSWR, { Fetcher, mutate } from "swr";
import dateFormat from "dateformat";

const OutlineStar = ({ ...prop }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...prop}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  );
};

const SolidStart = ({ ...prop }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...prop}
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
        clipRule="evenodd"
      />
    </svg>
  );
};

function AddReview({
  productId,
  userId,
}: {
  productId: string;
  userId: string;
}) {
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const ratingLevel = [1, 2, 3, 4, 5];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    fetch(`/api/products/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        rating: rate,
        review,
        userId,
      }),
    }).then((res) => {
      if (res.ok) {
        setRate(0);
        setReview("");
        setIsLoading(false);
        mutate(`/api/products/reviews?productId=${productId}`);
      }
    });
  };

  return (
    <div className="space-y-4 flex flex-col">
      <div className="flex items-center space-x-2">
        {ratingLevel.map((level) => (
          <button key={level} onClick={() => setRate(level)}>
            {rate >= level ? (
              <SolidStart className="w-6 h-6 text-yellow-300" />
            ) : (
              <OutlineStar className="w-6 h-6 text-gray-300 dark:text-gray-500" />
            )}
          </button>
        ))}
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Textarea
          placeholder="Viết bình luận..."
          name="review"
          onChange={(e) => setReview(e.target.value)}
          value={review}
        />
        <div className="flex justify-end w-full">
          <Button type="submit" color="primary" isLoading={isLoading}>
            Gửi
          </Button>
        </div>
      </form>
    </div>
  );
}

const fetcher: Fetcher<IReview[], string> = (url) =>
  fetch(url).then((res) => res.json());

const isOrderFetcher: Fetcher<boolean, string> = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => data.data.isOrder);

export default function Review({ productId }: { productId: string }) {
  const ratingLevel = [1, 2, 3, 4, 5];
  const { data: session } = useSession();

  const { data: reviews } = useSWR(
    `/api/products/reviews?productId=${productId}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  const { data: isOrder } = useSWR(
    `/api/products/reviews/isOrder?productId=${productId}&userId=${session?.user.userId}`,
    isOrderFetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  const handleUsefulness = async (reviewId: string) => {
    await fetch(`/api/products/reviews/usefulness`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reviewId,
        userId: session?.user.userId,
      }),
    }).then((res) => {
      if (res.ok) {
        mutate(`/api/products/reviews?productId=${productId}`);
      }
    });
  };
  return (
    <>
      {isOrder && (
        <AddReview productId={productId} userId={session?.user.userId!} />
      )}
      <div>
        {reviews &&
          reviews.map((review) => (
            <article key={review.reviewId} className="mb-5">
              <div className="flex items-center mb-4 space-x-4">
                <User
                  name={review.user.fullName}
                  description={
                    <ul className="flex items-center">
                      {ratingLevel.map((level) => (
                        <li key={level}>
                          {review.rating >= level ? (
                            <SolidStart className="w-4 h-4 text-yellow-300" />
                          ) : (
                            <OutlineStar className="w-4 h-4 text-gray-300 dark:text-gray-500" />
                          )}
                        </li>
                      ))}
                    </ul>
                  }
                />
              </div>
              <p className="">{review.review}</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                Đánh giá vào lúc{" "}
                <time>{dateFormat(review.createdAt, "HH:MM dd/mm/yyyy")}</time>
              </p>
              <aside>
                <div className="flex items-center mt-3 space-x-3 divide-x divide-gray-200 dark:divide-gray-600">
                  <Button
                    onClick={() => handleUsefulness(review.reviewId)}
                    variant="bordered"
                    startContent={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                        />
                      </svg>
                    }
                  >
                    Hữu ích ({review._count.Usefulness})
                  </Button>
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
    </>
  );
}
