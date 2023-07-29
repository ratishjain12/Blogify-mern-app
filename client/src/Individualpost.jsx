import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "./UserContext";
function Individualpost() {
  const [redirect, setRedirect] = useState(false);
  const { id } = useParams();
  const [postData, setPostData] = useState();
  const { userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}post/${id}`).then((res) => {
      res.json().then((data) => {
        setPostData(data[0]);
      });
    });
  }, []);
  console.log(postData);
  if (!postData) return "";

  async function deletePost() {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}delete/${id}`,
      {
        method: "POST",
      }
    );
    const data = await response.json();
    if (data) {
      alert("Blog is deleted!!");
      setRedirect(true);
    }

    // if (response.ok) {
    //   setRedirect(true);
    // }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <div className="container blog-container">
      <h1>{postData.title}</h1>
      <div
        style={{
          marginBottom: "5px",
          fontSize: "17px",
          marginTop: "10px",
          display: "grid",
          placeItems: "center",
        }}
      >
        {formatISO9075(new Date(postData.createdAt))}
      </div>
      <div
        style={{ marginBottom: "20px", display: "grid", placeItems: "center" }}
      >
        Author: <b>{postData.author.username}</b>
      </div>
      <div
        className=""
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        {postData.author._id === userInfo?.id && (
          <Link to={`/edit/${postData._id}`} style={{ textDecoration: "none" }}>
            <button className="editBtn">Edit</button>
          </Link>
        )}
        {postData.author._id === userInfo?.id && (
          <button
            className="editBtn"
            onClick={deletePost}
            style={{ backgroundColor: "red" }}
          >
            Delete
          </button>
        )}
      </div>

      <img
        src={`${import.meta.env.VITE_BASE_URL}${postData.file}`}
        className="individual-img"
      />

      <div dangerouslySetInnerHTML={{ __html: postData.content }} />
    </div>
  );
}
export default Individualpost;
