import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./context/useAuth";
import "./style.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const {
    auth: { user },
    loading,
    login,
  } = useAuth();

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (user) return <Navigate to="/" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password.", { duration: 4000 });
      return;
    }

    setSubmitting(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/login`,
        { email, password }
      );
      const { user, token } = res.data;

      if (token) {
        toast.error("Login failed: No token received");
        setSubmitting(false);
        return;
      }

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ user, token }));
      await login({ user, token });

      toast.success("You have Logged in successful! Redirecting...");
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1500);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Login failed. Please check your credentials.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-bg">
      <Toaster
        position="top-right"
        toastOptions={{
          style: { fontSize: "14px" },
          success: {
            duration: 3000,
            iconTheme: { primary: "#22c55e", secondary: "#f0fdf4" },
          },
          error: {
            duration: 4000,
            iconTheme: { primary: "#ef4444", secondary: "#fef2f2" },
          },
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="login-container"
      >
        <div className="login-header">
          <h1>Sign In</h1>
          <p>Welcome back! Please log in to continue.</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div>
            <label className="login-label">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              className="login-input"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div>
            <label className="login-label">Password</label>
            <div className="login-password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="login-input login-password-input"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="login-password-toggle"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <div className="login-remember">
            <label className="login-remember-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="login-checkbox"
              />
              Remember me
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`login-btn${submitting ? " login-btn-disabled" : ""}`}
          >
            {submitting ? (
              <svg
                className="login-spinner"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="login-spinner-bg"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="login-spinner-fg"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                />
              </svg>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="login-footer">
          Don’t have an account?{" "}
          <Link to="/register" className="login-link">
            Register here
          </Link>
        </div>
      </motion.div>
    </div>
  );
}