import Post from "./Post";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { userContext } from "./AuthProvider";
function ShowBlogs() {
  const [posts, setPosts] = useState([]);
  const { userInfo } = useContext(userContext);
  const fetchBlogs = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}fetchPosts?userId=${userInfo?.id}`
    );

    setPosts(response.data);
  };

  useEffect(() => {
    if (userInfo) {
      fetchBlogs();
    }
  }, [userInfo]);

  return (
    <div className="mt-20 mx-auto sm:w-[90%]">
      <div className="header p-6 flex items-center gap-2">
        <span className="text-3xl">Blogs</span>
        <button className="bg-[#6A6C6C] p-2 flex items-center rounded-full">
          <Search size={17} />
        </button>
      </div>
      <div className="p-6 gap-3 auto-rows-auto grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((item) => {
          return (
            <Post
              key={item._id}
              {...item}
              userId={userInfo?.id}
              username={userInfo?.fullName}
            />
          );
        })}
      </div>
    </div>
  );
}
export default ShowBlogs;
