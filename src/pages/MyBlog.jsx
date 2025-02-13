import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BsFillEmojiNeutralFill,
  BsFillEmojiLaughingFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import swal from "sweetalert2";

const MyBlog = () => {
  const [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    let id = JSON.parse(localStorage.getItem("user_id"));
    try {
      const res = await axios.get(`/posts/mypost/${id}`);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/posts/${id}`);
      swal.fire({
        icon: "success",
        title: "تبریک میگم!",
        text: res.data.message,
        showConfirmButton: true,
        confirmButtonText: "تایید!",
        timer: 5000,
      });
      loadData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="home"></div>
      <div className="container mx-auto my-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((item) => (
            <div
              key={item.id}
              className="border-2 border-slate-500 rounded-lg shadow-lg"
            >
              <div className="flex flex-col items-center p-5">
                <div className="relative">
                  <img
                    src={item.url}
                    alt="."
                    className=" h-[300px] lg:w-[350px] lg:h-[350px] shadow-md"
                  />
                  <Link to={`/blog/update/${item.id}`} className="absolute right-3 bottom-3">
                    <BsFillEmojiLaughingFill className="text-green-500 hover:text-green-600 transition-all text-[40px]" />
                  </Link>
                  <span
                    className="absolute left-3 bottom-3 cursor-pointer"
                    onClick={() => handleDelete(item.id)}
                  >
                    <BsFillEmojiNeutralFill className="text-red-400 hover:text-red-500 transition-all text-[40px]" />
                  </span>
                </div>
                <div className="text-center items-center bg-slate-300 w-[300px] p-2  my-2 rounded-md">
                  <h3 className="text-lg font-bold text-primary/80">
                    نویسنده : {item.user.name}
                  </h3>
                  <p className="text-primary/70">{item.title}</p>
                </div>
                <Link
                  to={`/blogdetails/${item.id}`}
                  className="w-[50%] my-3 p-3 bg-primary rounded-md text-accent text-center"
                  state={item}
                >
                  مشاهده پست
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBlog;
