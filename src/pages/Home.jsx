import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Skelton from "../components/skeletton/Skelton";

const Home = () => {
  const [data, setData] = useState(false);
  const [visible, setVisibel] = useState(3);

  const showMore = () => {
    setVisibel((prevValue) => prevValue + 3);
  };
  useEffect(() => {
    const handlePost = async () => {
      axios.get("/post").then((res) => {
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
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data &&
              data.slice(0, visible).map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center gap-y-3 p-3 border-2 border-[#5f5c5c] rounded-md"
                >
                  <img src={item.image} alt="" className="w-auto" />
                  <div className="flex items-center justify-between gap-y-2 border-1 border-b w-full border-[#363535] ">
                    <small className="text-sm">
                      نویسنده : {item.user.name}
                    </small>
                    <h6 className="text-lg font-bold">{item.title}</h6>
                  </div>
                  <Link
                    to={`/blogdetails/${item.id}`}
                    className="w-[70%] p-2 rounded-md text-accent bg-primary"
                  >
                    مشاهده
                  </Link>
                </div>
              ))}
          </div>
          <button
            className="p-2 bg-primary text-accent rounded-md"
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
