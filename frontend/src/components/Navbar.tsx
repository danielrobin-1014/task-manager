import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";

interface NavbarProps {
  onCreateTask: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCreateTask }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-8 relative z-50">
      <nav className="glass backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border border-white/50 dark:border-slate-700/50 shadow-lg shadow-slate-200/20 dark:shadow-black/20 rounded-2xl transition-all duration-300">
        <div className="px-4 pr-6">
          <div className="flex justify-between items-center h-16">

            {/* Logo/Brand */}
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => navigate('/dashboard')}>
              <div className="bg-gradient-to-br from-violet-600 to-indigo-600 p-2 rounded-xl shadow-md shadow-violet-500/30 group-hover:shadow-violet-500/50 group-hover:scale-105 transition-all duration-300">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-violet-700 to-indigo-600 dark:from-violet-400 dark:to-indigo-300 bg-clip-text text-transparent">
                TaskFlow
              </h1>
            </div>

            {/* Right Side - Actions & User */}
            <div className="flex items-center space-x-2 sm:space-x-4">

              {/* Mobile New Task Button (Icon Only) */}
              <button
                onClick={onCreateTask}
                className="md:hidden p-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl shadow-md shadow-violet-500/30 active:scale-95 transition-all"
                aria-label="New Task"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 rounded-xl transition-colors duration-200"
                title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
              >
                {theme === "light" ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </button>

              <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>

              {/* User Profile Menu */}
              <div className="flex items-center gap-3 pl-1 sm:pl-2">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-xs font-semibold text-slate-900 dark:text-white leading-none mb-1">Signed in as</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-none">{user?.email}</span>
                </div>

                <div className="relative group cursor-pointer">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-100 to-indigo-100 dark:from-violet-900/40 dark:to-indigo-900/40 border border-violet-200 dark:border-violet-700/50 flex items-center justify-center text-violet-700 dark:text-violet-300 font-bold overflow-hidden shadow-sm group-hover:shadow-md transition-all">
                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                  </div>

                  {/* Dropdown Menu (on hover for simplicity, could use state for click) */}
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 p-1 z-50">
                    <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-700/50 sm:hidden">
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex items-center gap-2 mt-1 sm:mt-0"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
