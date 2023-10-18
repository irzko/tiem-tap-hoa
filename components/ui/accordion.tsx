"use client";
import { useState } from "react";

export const AccordionHeader = () => {
  return <div>AccordionHeader</div>;
};

const Accordion = ({
  children,
  heading,
  icon,
}: {
  children: React.ReactNode;
  heading: string;
  icon?: JSX.Element;
}) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <h2>
        <button
          type="button"
          className="flex items-center justify-between w-full font-medium text-left focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={() => setToggle(!toggle)}
        >
          <div className="flex">
            {icon && <div className="mr-3">{icon}</div>}
            <span className="flex-1 line-clamp-1">{heading}</span>
          </div>
          <svg
            data-accordion-icon
            className={`w-3 h-3 ml-2 shrink-0 ${toggle ? "rotate-180" : ""}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div className={`${toggle ? "block" : "hidden"}`}>
        <div className="px-5 font-normal text-sm">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
