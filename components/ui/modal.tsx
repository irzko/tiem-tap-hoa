"use client";
import * as React from "react";
import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function PortalImpl({
  onClose,
  children,
  closeOnClickOutside,
}: {
  children: ReactNode;
  closeOnClickOutside: boolean;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef.current !== null) {
      modalRef.current.focus();
    }
  }, []);

  useEffect(() => {
    let modalOverlayElement: HTMLElement | null = null;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    const clickOutsideHandler = (event: MouseEvent) => {
      const target = event.target;
      if (
        modalRef.current !== null &&
        !modalRef.current.contains(target as Node) &&
        closeOnClickOutside
      ) {
        onClose();
      }
    };
    const modelElement = modalRef.current;
    if (modelElement !== null) {
      modalOverlayElement = modelElement.parentElement;
      if (modalOverlayElement !== null) {
        modalOverlayElement.addEventListener("click", clickOutsideHandler);
      }
    }

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
      if (modalOverlayElement !== null) {
        modalOverlayElement?.removeEventListener("click", clickOutsideHandler);
      }
    };
  }, [closeOnClickOutside, onClose]);

  return (
    <div
      className="flex justify-center items-center fixed flex-col inset-0 bg-gray-900/80 flex-grow-0 flex-shrink z-50"
      role="dialog"
    >
      <div
        className="p-4 min-h-[100px] min-w-[300px] max-w-2xl flex  bg-white shadow dark:bg-gray-800 flex-grow-0 flex-col relative rounded-lg"
        tabIndex={-1}
        ref={modalRef}
      >
        {children}
      </div>
    </div>
  );
}

export default function Modal({
  onClose,
  children,
  closeOnClickOutside = false,
}: {
  children: ReactNode;
  closeOnClickOutside?: boolean;
  onClose: () => void;
}): JSX.Element {
  return createPortal(
    <PortalImpl onClose={onClose} closeOnClickOutside={closeOnClickOutside}>
      {children}
    </PortalImpl>,
    document.body
  );
}
