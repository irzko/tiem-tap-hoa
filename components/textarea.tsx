import React, { ChangeEvent, useRef, useState, useLayoutEffect } from "react";

const MIN_TEXTAREA_HEIGHT = 32;

export default function TextArea() {
  const textareaRef = useRef<HTMLTextAreaElement>(null); // Specify the type for useRef
  const [value, setValue] = useState("");

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setValue(event.target.value);

  useLayoutEffect(() => {
    // Reset height - important to shrink on delete
    textareaRef.current?.style.setProperty("height", "inherit");
    textareaRef.current?.style.setProperty(
      "height",
      `${Math.max(
        textareaRef.current?.scrollHeight || MIN_TEXTAREA_HEIGHT,
        MIN_TEXTAREA_HEIGHT
      )}px`
    );
  }, [value]);

  return (
    <textarea
      onChange={onChange}
      ref={textareaRef}
      className="block rounded-lg p-2.5 resize-none min-h-[32px] overflow-hidden w-full text-sm border-2 appearance-none focus:outline-none focus:ring-0 peer bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      value={value}
    />
  );
}
