import { useEffect, useState } from "react";
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";

const formSchema = Yup.object({
  title: Yup.string().required("عنوان شما الزامی است"),
  desc: Yup.string().required("متن شما الزامی است"),
});

const Update = () => {
  const [data, setData] = useState([]);
  const [file, setFile] = useState();
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const handleData = async () => {
      try {
        const res = await axios.get(`/posts/edit/${id}`);
        setData(res.data);
        setFile(res.data.image);
        setTitle(res.data.title);
        setDesc(res.data.desc);
      } catch (error) {
        console.log(error);
      }
    };
    handleData();
  }, []);

  const handleSubmit = async (e) => {
    const userId = localStorage.getItem("user_id")
    e.preventDefault();
  
    let formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append('userId', userId);
    
    try {
      const res = await axios.put(`/posts/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Swal.fire({
        icon: 'success',
        title: 'تبریک میگم!',
        text: res.data.message,
        showConfirmButton: true,
        confirmButtonText: 'تایید!',
        timer: 5000,
      });
      navigate('/blog/myblog');
    } catch (err) {
      console.log(err);
    }
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  


  return (
    <div className="bg-blog bg-no-repeat bg-cover bg-center h-screen text-accent">
      <div className="container flex flex-col items-center justify-center">
        <h1 className="text-2xl font-extrabold pb-10 mt-8">ویرایش پست</h1>
        <form className="bg-primary rounded-md flex flex-col gap-y-4 w-full max-w-[500px] p-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-y-3">
            <label className="text-sm">ویرایش عکس</label>
            <input type="file" className="input bg-accent" name="image" onChange={(e) => setFile(e.target.files[0])}/>
            <p>
              <img
                src={data.url}
                width="150"
                className="mt-2"
                alt=""
                onChange={handleFileChange}
              />
            </p>
          </div>
          <div className="flex flex-col gap-y-3">
            <label className="text-sm">تغییر عنوان</label>
            <input
              className="input"
              type="text"
              name="title"
              defaultValue={data.title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <label className="text-sm">تغییر متن</label>
            <textarea
              className="input"
              name="desc"
              defaultValue={data.desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </div>
          <div className="input">
            <button type="submit" className="bg-secondary rounded-md w-full text-primary py-2">تغییر انجام شد</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
