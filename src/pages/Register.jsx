import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const formschema = Yup.object({
  name: Yup.string().required("فیلد نام الزامی است."),
  email: Yup.string()
    .email("ایمیل معتبر وارد کنید.")
    .required("فیلد ایمیل الزامی است."),
  password: Yup.string().required("فیلد پسورد الزامی است."),
  confPassword: Yup.string().required("فیلد تکرار پسورد الزامی است."),
});

const Register = () => {
  const [error, setError] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (value) => {
    const data = {
      name: value.name,
      email: value.email,
      password: value.password,
      confPassword: value.confPassword,
    };
    try {
      const res = await axios.post("/register", data);
      if (res.data.error) {
        setError(res.data.error);
        console.log(res.data.error);
      } else {
        Swal.fire({
          icon: "success",
          title: "تبریک میگم!",
          text: res.data.message,
          showConfirmButton: true,
          confirmButtonText: "تایید!",
          timer: 5000,
        });
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confPassword: "",
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
              ثبت نام کنید
            </h2>
            {error && <h2 className="text-red-400 pt-3">{error}</h2>}
            <form onSubmit={formik.handleSubmit} className="w-full">
              <div className="flex flex-col gap-y-3 p-2">
                <label className="label">نام شما</label>
                <input
                  name="name"
                  className="input"
                  type="text"
                  value={formik.values.name}
                  onChange={formik.handleChange("name")}
                  onBlur={formik.handleBlur("name")}
                  placeholder="مثال * حسین"
                />
                <p className="text-sm text-red-400">
                  {formik.touched.name && formik.errors.name}
                </p>
              </div>
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
              <div className="flex flex-col gap-y-3 p-2">
                <label className="label">تکرار پسورد</label>
                <input
                  name="confPassword"
                  className="input"
                  type="password"
                  value={formik.values.confPassword}
                  onChange={formik.handleChange("confPassword")}
                  onBlur={formik.handleBlur("confPassword")}
                  placeholder="مثال * 123456"
                />
                <p className="text-sm text-red-400">
                  {formik.touched.confPassword && formik.errors.confPassword}
                </p>
              </div>
              <div className="p-2">
                <button
                  type="submit"
                  className="bg-secondary w-full text-primary text-xl font-bold rounded-md py-2 cursor-pointer"
                >
                  ثبت نام
                </button>
              </div>
            </form>
          </div>
          <div className="register bg-size"></div>
        </div>
      </div>
    </div>
  );
};

export default Register;
