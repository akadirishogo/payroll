import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="p-6 rounded-lg shadow-lg flex flex-col items-center">
        <div className="w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;
