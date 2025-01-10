import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const formschema = Yup.object({
  email: Yup.string()
    .email("ایمیل معتبر وارد کنید.")
    .required("فیلد ایمیل الزامی است."),
  password: Yup.string().required("فیلد پسورد الزامی است."),
});

const Login = () => {
  const [error, setError] = useState([]);
  const navigate = useNavigate()

  const handleSubmit = async (value) => {
    const data = {
      email: value.email,
      password:value.password
    };

    try {
      const res = await axios.post("/login", data);
      // console.log(res.data);
      if (res.data.error) {
        setError(res.data.error);
      } else {
      localStorage.setItem("user_name",res.data.name)
      localStorage.setItem("user_id",res.data.userId)
        Swal.fire({
          icon: "success",
          title: "تبریک میگم!",
          text: res.data.message,
          showConfirmButton: true,
          confirmButtonText: "تایید!",
          timer: 5000,
        });
        navigate("/")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validationSchema: formschema,
  });

  return (
    <div className="flex justify-center lg:items-center lg:h-[100vh]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 my-4 lg:gap-x-16">
          <div className="flex flex-col items-center justify-center bg-primary text-accent rounded-md p-3 mx-auto  md:w-[80%]">
            <h2 className="font-extrabold text-2xl border-b-2 border-accent w-full text-center py-4">
              ورود به حساب کاربری
            </h2>
            {error && <h2 className="text-red-400 pt-3">{error}</h2>}
            <form onSubmit={formik.handleSubmit} className="w-full">
              <div className="flex flex-col gap-y-3 p-2">
                <label className="label">ایمیل</label>
                <input
                  name="email"
                  className="input"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  placeholder="مثال * abcd@.com"
                />
                <p className="text-sm text-red-400">
                  {formik.touched.email && formik.errors.email}
                </p>
              </div>
              <div className="flex flex-col gap-y-3 p-2">
                <label className="label">پسورد</label>
                <input
                  name="password"
                  className="input"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                  placeholder="مثال * 123456"
                />
                <p className="text-sm text-red-400">
                  {formik.touched.password && formik.errors.password}
                </p>
              </div>
              <div className="p-2">
                <button
                  type="submit"
                  className="bg-secondary w-full text-primary text-xl font-bold rounded-md py-2 cursor-pointer"
                >
                  ورود
                </button>
              </div>
            </form>
          </div>
          <div className="login bg-size"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
