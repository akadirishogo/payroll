"use client";
import React from "react";


type ModalProps = {
  isOpen?: boolean;
  title?: string;
  message?: string | string[];
  onClose?: () => void;
  icon?: React.ReactNode;
  children?: React.ReactNode; // ✅ Add children 
};

export default function Modal({ title, children }: ModalProps) {

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white p-6 rounded-xl shadow-lg w-1/2 text-center font-light">
        {title && <h2 className="text-lg font-medium">{title}</h2>}
        {/* ✅ Render children (like a form) if provided */}
        {children}
      </div>
    </div>
  );
}
