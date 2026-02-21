import React from "react";

interface LoaderProps {
  fullScreen?: boolean;
  size?: "sm" | "md" | "lg";
}

const Loader: React.FC<LoaderProps> = ({ fullScreen = false, size = "md" }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const currentSize = sizeClasses[size];

  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className={`relative ${currentSize}`}>
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-slate-200/20 dark:border-slate-700/30"></div>
        {/* Inner Spinning Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-violet-500 border-t-transparent dark:border-violet-400 dark:border-t-transparent animate-spin"></div>
        {/* Glowing effect */}
        <div className="absolute inset-0 rounded-full shadow-[0_0_15px_rgba(124,58,237,0.5)] animate-pulse"></div>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm transition-all duration-300">
        {content}
      </div>
    );
  }

  return (
    <div className="flex justify-center p-8">
      {content}
    </div>
  );
};

export default Loader;
