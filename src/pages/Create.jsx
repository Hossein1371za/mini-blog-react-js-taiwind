import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const formSchema = Yup.object({
  title: Yup.string().required("عنوان شما الزامی است"),
  desc: Yup.string().required("متن شما الزامی است"),
});

const Create = () => {
  const [error, setError] = useState([]);
  const [file, setFile] = useState([]);
  const [preview, setPreview] = useState("");

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const user_id = localStorage.getItem("user_id");
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("title", data.title);
    formData.append("desc", data.desc);
    formData.append("userId", data.userId);
    try {
      const res = await axios.post("/posts", formData);
      if (res.data.error) {
        setError(res.data.error);
      } else {
        Swal.fire({
          icon: "success",
          title: "تبریک میگم!",
          text: res.data.message,
          showConfirmButton: true,
          confirmButtonText: "تایید!",
          timer: 5000,
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
      file: "",
      userId: user_id,
    },
    onSubmit: (values) => {
      const data = {
        title: values.title,
        desc: values.desc,
        file: file,
        userId: user_id,
      };
      handleSubmit(data);
    },
    validationSchema: formSchema,
  });

  return (
    <div className="bg-blog bg-no-repeat bg-cover bg-center h-screen text-accent scroll-auto">
      <div className="container flex flex-col items-center h-full">
        <h1 className="text-2xl font-extrabold pb-10 mt-8">پستت رو بساز!!!</h1>
        {error && <h2 className="text-red-400 text-xl mb-4">{error}</h2>}
        <form
          className="bg-primary rounded-md flex flex-col gap-y-4 w-full max-w-[500px] p-5"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-col gap-y-3 relative">
            <label className="text-sm">انتخاب عکس</label>
            <input
              className="input bg-accent"
              type="file"
              onChange={loadImage}
              name="image"
            />
            {preview ? (
              <figure className="mt-3">
                <img src={preview} width="200" alt="" />
              </figure>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col gap-y-3">
            <label className="text-sm">عنوان</label>
            <input
              className="input"
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange("title")}
              onBlur={formik.handleBlur("title")}
            />
            <p className="text-sm text-red-400">
              {formik.touched.title && formik.errors.title}
            </p>
          </div>
          <div className="flex flex-col gap-y-3">
            <label className="text-sm">متن</label>
            <textarea
              className="input"
              name="desc"
              value={formik.values.desc}
              onChange={formik.handleChange("desc")}
              onBlur={formik.handleBlur("desc")}
            ></textarea>
            <p className="text-sm text-red-400">
              {formik.touched.desc && formik.errors.desc}
            </p>
          </div>
          <button
            className="bg-secondary rounded-md w-full text-primary py-2"
            type="submit"
          >
            افزودن پست
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
