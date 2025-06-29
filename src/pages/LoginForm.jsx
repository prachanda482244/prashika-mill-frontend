import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AxiosInstance from "../config/AxiosInstance";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/slices/authSlice";
import FormikInput from "../formik/FormikInput";
import { loginValidationSchema } from "../constants/constants";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSubmit = async (values) => {
    try {
      const { data } = await AxiosInstance.post("/users/login", values);
      dispatch(loginUser({ userData: data.data, role: data.data.role }));
      toast.success("Login successful");
      console.log(data?.data, "data ")
      if (data?.data?.role === "admin") {
        navigate("/dashboard/products")
      } else {
        navigate("/");
      }

    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginValidationSchema}
          onSubmit={formSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="p-6">
              <div className="flex justify-between items-center pb-4 mb-6 border-b">
                <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
                <p className="text-sm text-gray-600">
                  New user?{" "}
                  <Link to="/sign-up" className="text-blue-600 hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>

              <div className="space-y-4">
                <FormikInput
                  type="email"
                  name="email"
                  label="Email"
                  required
                  placeholder="your@email.com"
                />
                <FormikInput
                  type="password"
                  name="password"
                  label="Password"
                  required
                  placeholder="••••••••"
                />
              </div>

              <div className="flex justify-end mt-2">
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full mt-6 py-2 px-4 rounded-md font-medium transition-colors
                  ${isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800"}`}
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;