import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const onSubmit = async (data) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/signup`,
        data
      );
      toast.success("Registration successful!");
      setShowModal(true);
      reset();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="register-bg">
      <Toaster />

      <div className="register-container">
        <div className="register-header">
          <h1>Create Account</h1>
          <p>Join Zegemath and explore awesome movies!</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="register-form">
          <div className="form-group">
            <label>Username</label>
            <input
              {...register("username", { required: "Username is required" })}
              placeholder="macflix"
            />
            {errors.username && (
              <p className="error-message">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email",
                },
              })}
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="error-message">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              {...register("age", {
                required: "Age is required",
                pattern: {
                  value: /^(1[89]|[2-9]\d)$/,
                  message: "Enter a valid age",
                },
              })}
              placeholder="30"
            />
            {errors.age && (
              <p className="error-message">
                {errors.age.message}
              </p>
            )}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="error-message">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="register-btn"
          >
            {isSubmitting ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="register-footer">
          Already have an account?{" "}
          <Link
            to="/login"
            className="register-link"
          >
            Sign in here
          </Link>
        </p>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="modal-bg">
          <div className="modal-content">
            <h2>Registration Successful!</h2>
            <p>Your account has been created. You can now log in.</p>
            <button
              onClick={() => navigate("/login")}
              className="modal-btn"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}