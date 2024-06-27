"use client";

import React, { useEffect, useState } from "react";

import LoginModal from "@/components/LoginModal";
import RegisterModal from "@/components/RegisterModal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <LoginModal />
      <RegisterModal />
    </>
  );
};

export default ModalProvider;
