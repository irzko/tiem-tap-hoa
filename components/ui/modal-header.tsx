export default function ModalHeader({
  onBack,
  title,
  onClose,
}: {
  title: string;
  onClose?: () => void;
  onBack?: () => void;
}) {
  return (
    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
      <div className="flex items-center mr-12">
        {onBack && (
          <button
            onClick={onBack}
            type="button"
            className="text-gray-400 mr-2 p-1.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            aria-label="Close modal"
          >
            <svg
              className="w-4 h-4 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 5H1m0 0 4 4M1 5l4-4"
              />
            </svg>
            <span className="sr-only">Back</span>
          </button>
        )}
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          type="button"
          className="text-gray-400 right-5 p-1.5 absolute bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          aria-label="Close modal"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
      )}
    </div>
  );
}
