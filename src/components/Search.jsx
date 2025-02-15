import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Search = () => {
  const [data, setData] = useState([]);

  async function searchBlog(key) {
    await axios.post("/search/" + key)
    .then(res =>setData(res.data))
  }
  console.log(data);

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col gap-y-4 items-center">
        <h3 className="text-3xl font-bold">جست و جو کنید</h3>
        <input
          className="input bg-primary text-accent w-full max-w-[400px]"
          placeholder="متن مورد نظر را وارد کنید"
          type="text"
          onChange={(e) => searchBlog(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {data && data.map((item)=>{
           <div
           key={item.id}
           className="flex flex-col justify-center items-center gap-y-7 p-3 border-2 border-[#5f5c5c] rounded-md"
         >
           <img src={item.url} alt="" className="w-auto max-h-[300px]" />
           <div className="flex items-center justify-between border-1 border-b w-full border-[#363535] ">
             <small className="text-lg">
               نویسنده : {item.user.name}
             </small>
             <h6 className="text-lg font-bold">{item.title}</h6>
           </div>
           <Link
             to={`/blogdetails/${item.id}`}
             className="w-[70%] p-2 rounded-md text-accent bg-primary text-center"
             state={item}
           >
             مشاهده
           </Link>
         </div>
        })}
      </div>
    </div>
  )
}

export default Search
