import React from "react";
import axios from "axios"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom";
import {useFormik} from "formik"
import * as Yup from "yup"


const formschema = Yup.object({
  name:Yup.string().required("فیلد نام الزامی است."),
  email:Yup.string().email("ایمیل معتبر وارد کنید.") .required("فیلد ایمیل الزامی است."),
  password:Yup.string().required("فیلد پسورد الزامی است."),
  confpassword:Yup.string().required("فیلد تکرار پسورد الزامی است.")
})



const Register = () => {
  return (
    <div className="flex justify-center lg:items-center lg:h-[100vh]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 my-4 gap-x-8">
          <div className="flex flex-col items-center justify-center bg-primary text-accent rounded-md p-3">
            <h2 className="font-bold text-xl border-b-2 border-accent w-full text-center py-4">
              ثبت نام کنید
            </h2>
            <form className="w-full">
              <div className="flex flex-col gap-y-3 p-4">
                <label className="label">نام شما</label>
                <input name="name" className="input" type="text" />
              </div>
              <div className="flex flex-col gap-y-3 p-4">
                <label className="label">ایمیل</label>
                <input name="email" className="input" type="email" />
              </div>
              <div className="flex flex-col gap-y-3 p-4">
                <label className="label">پسورد</label>
                <input name="password" className="input" type="password" />
              </div>
              <div className="flex flex-col gap-y-3 p-4">
                <label className="label">تکرار پسورد</label>
                <input name="confpassword" className="input" type="text" />
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
