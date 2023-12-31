import React, { InputHTMLAttributes } from "react";
import Image from "next/image";
import { Badge, Button } from "@nextui-org/react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  thumbnails: string[];
  onRemoveImage: (index: number) => void;
}

function ImageSelect({ thumbnails, onRemoveImage, ...rest }: InputProps) {
  return (
    <div className="flex gap-2">
      {thumbnails.map((thumbnail, index) => (
        <div key={index}>
          <div className="relative h-16 w-16">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${thumbnail}`}
              alt="preview"
              className="rounded-lg object-cover"
              fill
            />
            <button
              type="button"
              className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center"
              onClick={() => onRemoveImage(index)}
            >
              <svg
                className="w-6 h-6 text-red-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
              </svg>
            </button>
          </div>
        </div>
      ))}
      <Button
        as="label"
        className="h-16 w-16"
        variant="flat"
        isIconOnly
        htmlFor="image-product"
      >
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 18"
        >
          <path
            fill="currentColor"
            d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
          />
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.1"
            d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
          />
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.1"
            d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
          />
        </svg>
      </Button>
      <input
        {...rest}
        type="file"
        className="hidden"
        id="image-product"
        accept="image/*"
        multiple
      />
    </div>
  );
}

export default ImageSelect;
