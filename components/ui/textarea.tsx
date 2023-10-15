import React, { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  helperText?: string;
  color?: "primary" | "secondary" | "success" | "danger" | "warning";
  label?: string;
}

export default function TextArea({
  color = "primary",
  helperText,
  ...rest
}: TextAreaProps) {
  let inputColor = "";
  let labelColor = "";
  let helperTextColor = "";
  switch (color) {
    case "primary": {
      inputColor =
        "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
      labelColor =
        "text-gray-500 dark:text-gray-400 peer-focus:text-blue-600 peer-focus:dark:text-blue-500";
      helperTextColor = "text-gray-500 dark:text-gray-400";
      break;
    }
    case "danger": {
      inputColor =
        "bg-red-50 border-red-500 text-red-700 dark:text-red-500 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:placeholder-red-500 dark:border-red-500";
      labelColor = "text-red-900 dark:text-red-500";
      helperTextColor = "text-red-600 dark:text-red-500";
      break;
    }
  }

  return (
    <>
      <textarea
        {...rest}
        className={`block rounded-lg p-2.5 w-full text-sm border-2 appearance-none focus:outline-none focus:ring-0 peer ${inputColor}`}
      />
      {helperText && (
        <p aria-live="polite" className={`mt-2 text-sm ${helperTextColor}`}>
          {helperText}
        </p>
      )}
    </>
  );
}
