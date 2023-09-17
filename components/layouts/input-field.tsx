import React from "react";

const InputField = ({
  autoComplete,
  id,
  name,
  placeholder = " ",
  required,
  type,
  value,
  onChange,
  onSubmit,
  onBlur,
  label,
  className,
}: {
  autoComplete?: string;
  id?: string;
  name?: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  classnames?: string;
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  value?: string | number | readonly string[];
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit?: React.FormEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}) => {
  return (
    <div className="relative">
      <input
        autoComplete={autoComplete}
        type={type}
        id={id}
        name={name}
        className={`block rounded-lg px-2.5 w-full text-sm border-2 appearance-none focus:outline-none focus:ring-0 peer bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
          label ? "pb-1 pt-4" : "py-2.5"
        } ${className}}`}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        onSubmit={onSubmit}
        onBlur={onBlur}
      ></input>
      {label && (
        <label
          htmlFor={id}
          className="absolute text-sm duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 text-gray-500 dark:text-gray-400 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default InputField;
