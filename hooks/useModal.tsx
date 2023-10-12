"use client";

import { useCallback, useMemo, useState } from "react";
import * as React from "react";

import Modal from "@/components/ui/modal";

export default function useModal(): [
  JSX.Element | null,
  (showModal: (onClose: () => void) => JSX.Element) => void
] {
  const [modalContent, setModalContent] = useState<null | {
    closeOnClickOutside: boolean;
    content: JSX.Element;
  }>(null);

  const onClose = useCallback(() => {
    setModalContent(null);
  }, []);

  const modal = useMemo(() => {
    if (modalContent === null) {
      return null;
    }
    const { content, closeOnClickOutside } = modalContent;
    return (
      <Modal onClose={onClose} closeOnClickOutside={closeOnClickOutside}>
        {content}
      </Modal>
    );
  }, [modalContent, onClose]);

  const showModal = useCallback(
    (
      // eslint-disable-next-line no-shadow
      getContent: (onClose: () => void) => JSX.Element,
      closeOnClickOutside = false
    ) => {
      setModalContent({
        closeOnClickOutside,
        content: getContent(onClose),
      });
    },
    [onClose]
  );

  return [modal, showModal];
}
