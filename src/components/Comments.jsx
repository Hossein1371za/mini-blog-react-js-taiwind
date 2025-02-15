import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert2";
import { useParams } from "react-router-dom";

const Comments = () => {
  const [description, setDescription] = useState("");
  const [comment,setComment] = useState([])
  const { id } = useParams();
  let user_id = JSON.parse(localStorage.getItem("user_id"));

  const getComment = async ()=>{
    await axios.get(`/comments/${id}`).then((res)=>{
      setComment(res.data)
    })
  }
  useEffect(() => {
    getComment();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
        commentBody: description,
        postId: id, 
        userId: user_id, 
    };
    try {
        const res = await axios.post("/comments", data);
        if (res.data.error) {
            swal.fire({
                icon: "error",
                title: "خطا!",
                text: res.data.error,
                showConfirmButton: true,
                confirmButtonText: "تایید!",
            });
        } else {
            swal.fire({
                icon: "success",
                title: "تبریک میگم!",
                text: res.data.message,
                showConfirmButton: true,
                confirmButtonText: "تایید!",
            });
            setDescription(""); 
            getComment()
        }
    } catch (error) {

        swal.fire({
            icon: "error",
            title: "خطا!",
            text: "مشکلی پیش آمد.",
            showConfirmButton: true,
            confirmButtonText: "تایید!",
        });
        console.log(error);
    }
};


  return (
    <div className="flex flex-col items-center gap-y-5">
      <h2 className="font-bold text-2xl pt-3">نظرات شما</h2>
      <form
        className="w-full flex flex-col items-center gap-y-5"
        onSubmit={handleSubmit}
      >
        <textarea
          className="outline-none border-2 border-slate-300 w-full p-4 rounded-lg text-lg"
          placeholder="نظرتان را با من به اشتراک بگذارید..."
          onChange={(e) => setDescription(e.target.value)}
          name="description"
          value={description}
        ></textarea>
        <button className="text-lg bg-secondary py-2 w-[50%] rounded-md hover:bg-green-400 cursor-pointer transition-all duration-300">
          ارسال نظر
        </button>
      </form>
      <div className="flex flex-col items-center gap-4 w-full h-[250px] overflow-y-scroll">
        {
          comment && comment.map((item)=>(
           <div className="bg-slate-300 p-3 w-full rounded-md" key={item.id}>
             <small className="font-bold">{item.user.name}:</small>
            <h3>
              {item.commentBody}
            </h3>
           </div>
          ))
        }
      </div>
    </div>
  );
};

export default Comments;
