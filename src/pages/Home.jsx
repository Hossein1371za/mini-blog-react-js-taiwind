import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Skelton from "../components/skeletton/Skelton";

const Home = () => {
  const [data, setData] = useState(null);
  const [visible, setVisibel] = useState(3);

  const showMore = () => {
    setVisibel((prevValue) => prevValue + 3);
  };
  useEffect(() => {
    const handlePost = async () => {
      axios.get("/posts").then((res) => {
        setData(res.data);
      });
    };
    handlePost();
  }, []);

  return (
    <div className="mb-10">
      <div className="home"></div>
      <h1 className="text-[50px] my-5 text-primary font-bold text-center">
        پست ها
      </h1>
      {!data && <Skelton />}
      {data && (
        <div className="container mx-auto flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data &&
              data.slice(0, visible).map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center gap-y-7 p-3 border-2 border-[#5f5c5c] rounded-md"
                >
                  <img src={item.url} alt="" className="w-auto" />
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
              ))}
          </div>
          <button
            className="py-3 bg-primary text-accent rounded-md mt-8 w-[50%]"
            onClick={showMore}
          >
            نمایش پست های بیشتر
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
