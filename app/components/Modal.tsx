"use client";
import React from "react";

type ModalProps = {
  isOpen: boolean;
  title: string;
  message: string | string[];
  onClose: () => void;
  icon?: React.ReactNode; // Optional icon prop
};

export default function Modal({ isOpen, title, message, onClose, icon }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white p-6 rounded-xl shadow-lg w-100 text-center font-light">
        {/* Show icon only if provided */}
        {icon && <div className="mb-3 flex justify-center font-light">{icon}</div>}

        <h2 className="text-lg font-regular">{title}</h2>
        <div className="mt-2">
            {Array.isArray(message) ? (message.map((line, index) => <p key={index}>{line}</p>
            )) : (
            <p>{message}</p>
            )}
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-primary text-white py-2 rounded-lg"
        >
          OK
        </button>
      </div>
    </div>
  );
}
