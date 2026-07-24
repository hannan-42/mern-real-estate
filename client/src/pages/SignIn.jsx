import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/server/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  console.log(formData);
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl p-8">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500 mb-3">
            Welcome back
          </p>
          <h1 className="text-4xl font-semibold text-slate-900">Sign In</h1>
          <p className="mt-3 text-sm text-slate-500">
            Log into your account to manage listings and explore properties.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-5">
          <label className="space-y-2 text-sm text-slate-700">
            <span className="font-medium">Email address</span>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border border-slate-200 bg-slate-50 px-4 py-3 rounded-2xl text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              id="email"
              onChange={handleChange}
            />
          </label>

          <label className="space-y-2 text-sm text-slate-700">
            <span className="font-medium">Password</span>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-slate-200 bg-slate-50 px-4 py-3 rounded-2xl text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              id="password"
              onChange={handleChange}
            />
          </label>

          <button
            disabled={loading}
            className="w-full bg-slate-900 text-white py-3 rounded-2xl text-sm font-semibold uppercase tracking-[0.12em] transition duration-200 hover:bg-slate-700 disabled:opacity-70"
          >
            {loading ? "Loading..." : "Sign in"}
          </button>
        </form>

        <div className="mt-6 border-t border-slate-200 pt-5 text-center text-sm text-slate-600">
          <span>Don’t have an account?</span>
          <Link
            to="/sign-up"
            className="ml-2 text-blue-600 font-semibold hover:text-blue-700"
          >
            Sign up
          </Link>
        </div>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
