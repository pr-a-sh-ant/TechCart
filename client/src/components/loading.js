import React from "react";
import { Loader2 } from "lucide-react";

const Loading = ({
  variant = "spinner",
  size = "default",
  fullScreen = true,
}) => {
  const variants = {
    spinner: (
      <div className="flex items-center justify-center">
        <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
      </div>
    ),
    dots: (
      <div className="flex space-x-2">
        <div
          className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        />
        <div
          className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        />
        <div
          className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        />
      </div>
    ),
    pulse: (
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse" />
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse delay-150" />
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse delay-300" />
      </div>
    ),
    skeleton: (
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded-full w-32 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded-full w-24 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded-full w-28 animate-pulse" />
      </div>
    ),
    progress: (
      <div className="w-48">
        <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full animate-progressBar w-full" />
        </div>
      </div>
    ),
  };

  const sizeClasses = {
    small: "scale-75",
    default: "scale-100",
    large: "scale-150",
  };

  const containerClasses = `
    ${fullScreen ? "min-h-screen" : "min-h-[100px]"}
    flex items-center justify-center
    bg-white/80 backdrop-blur-sm
    ${fullScreen ? "fixed inset-0" : "relative"}
    z-50
  `;

  return (
    <div className={containerClasses}>
      <div className={sizeClasses[size]}>{variants[variant]}</div>
    </div>
  );
};

export default Loading;
