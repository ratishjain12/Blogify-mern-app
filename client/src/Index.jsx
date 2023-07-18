import Post from "./Post";
import { useEffect, useState } from "react";

function Index() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/fetchPosts").then((response) => {
      response.json().then((post) => {
        setPosts(post);
        console.log(post);
      });
    });
  }, []);

  return (
    <div>
      {posts.length > 0 &&
        posts.map((post) => {
          return <Post key={post._id} {...post} />;
        })}
      {posts.length == 0 && <h1 className="noposts">No posts</h1>}
    </div>
  );
}
export default Index;
