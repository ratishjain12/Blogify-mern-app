import Post from "./Post";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { userContext } from "./AuthProvider";
import ExpandableSearch from "./ExpandableSearch";
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

  const handleSearch = async (searchTerm) => {
    if (searchTerm === "") {
      fetchBlogs();
      return;
    }
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}search?q=${searchTerm}`
    );
    setPosts(response.data.posts);
  };

  return (
    <div className="mt-20 mx-auto sm:w-[90%]">
      <div className="header p-6 flex items-center gap-2">
        <span className="text-3xl">Blogs</span>
        <ExpandableSearch onSearch={handleSearch} />
      </div>
      {!posts.length && (
        <div className="flex w-full justify-center">
          <h2>No such blog post 😔</h2>
        </div>
      )}
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
