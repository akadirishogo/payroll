"use client";
import React from "react";

type ModalProps = {
  isOpen: boolean;
  title?: string;
  message?: string | string[];
  onClose: () => void;
  icon?: React.ReactNode;
  children?: React.ReactNode; // ✅ Add children prop
};

export default function Modal({ isOpen, title, message, onClose, icon, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white p-6 rounded-xl shadow-lg w-1/2 text-center font-light">
        {icon && <div className="mb-3 flex justify-center">{icon}</div>}

        {title && <h2 className="text-lg font-medium">{title}</h2>}

        {message && (
          <div className="mt-2">
            {Array.isArray(message) ? (
              message.map((line, index) => <p key={index}>{line}</p>)
            ) : (
              <p>{message}</p>
            )}
          </div>
        )}

        {/* ✅ Render children (like a form) if provided */}
        {children}
      </div>
    </div>
  );
}
