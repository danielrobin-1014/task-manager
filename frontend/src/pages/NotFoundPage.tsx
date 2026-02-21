import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center px-4 transition-colors relative overflow-hidden">

      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 dark:bg-violet-600/10 rounded-full blur-3xl animate-[bounce_8s_infinite] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/20 dark:bg-indigo-600/10 rounded-full blur-3xl animate-[bounce_10s_infinite_reverse] pointer-events-none"></div>

      {/* Main Content */}
      <div className="text-center relative z-10 animate-slideUp">

        {/* Glowing 404 Text */}
        <h1 className="text-[150px] sm:text-[200px] font-black leading-none tracking-tighter bg-gradient-to-br from-violet-600 via-indigo-600 to-indigo-900 dark:from-violet-400 dark:via-indigo-400 dark:to-indigo-600 bg-clip-text text-transparent drop-shadow-xl select-none mb-4 relative inline-block">
          404
          {/* Subtle text glow effect */}
          <span className="absolute inset-0 bg-gradient-to-br from-violet-600 via-indigo-600 to-indigo-900 bg-clip-text text-transparent blur-2xl opacity-40 dark:opacity-30 -z-10 select-none">404</span>
        </h1>

        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white mb-4 tracking-tight">
          Page not found
        </h2>

        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-10">
          Oops! The page you're looking for seems to have wandered off. Let's get you back on track.
        </p>

        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:from-violet-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 hover:-translate-y-1 active:translate-y-0"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
