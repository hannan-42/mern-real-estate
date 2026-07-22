import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl p-8">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500 mb-3">
            Create your account
          </p>
          <h1 className="text-4xl font-semibold text-slate-900">Sign Up</h1>
          <p className="mt-3 text-sm text-slate-500">
            Join our community and start listing properties with confidence.
          </p>
        </div>

        <form className="grid gap-5">
          <label className="space-y-2 text-sm text-slate-700">
            <span className="font-medium">Username</span>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full border border-slate-200 bg-slate-50 px-4 py-3 rounded-2xl text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              id="username"
            />
          </label>

          <label className="space-y-2 text-sm text-slate-700">
            <span className="font-medium">Email address</span>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border border-slate-200 bg-slate-50 px-4 py-3 rounded-2xl text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              id="email"
            />
          </label>

          <label className="space-y-2 text-sm text-slate-700">
            <span className="font-medium">Password</span>
            <input
              type="password"
              placeholder="Create a strong password"
              className="w-full border border-slate-200 bg-slate-50 px-4 py-3 rounded-2xl text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              id="password"
            />
          </label>

          <button className="w-full bg-slate-900 text-white py-3 rounded-2xl text-sm font-semibold uppercase tracking-[0.12em] transition duration-200 hover:bg-slate-700 disabled:opacity-70">
            Sign up
          </button>
        </form>

        <div className="mt-6 border-t border-slate-200 pt-5 text-center text-sm text-slate-600">
          <span>Already have an account?</span>
          <Link
            to="/sign-in"
            className="ml-2 text-blue-600 font-semibold hover:text-blue-700"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
