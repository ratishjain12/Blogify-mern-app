import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "./UserContext";
function Individualpost() {
  const { id } = useParams();
  const [postData, setPostData] = useState();
  const { userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch(`https://blogify-backend-b1kr.onrender.com/post/${id}`).then(
      (res) => {
        res.json().then((data) => {
          setPostData(data[0]);
        });
      }
    );
  }, []);
  console.log(postData);
  if (!postData) return "";
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
      {postData.author._id === userInfo?.id && (
        <Link to={`/edit/${postData._id}`} style={{ textDecoration: "none" }}>
          <button className="editBtn">Edit</button>
        </Link>
      )}

      <img
        src={`http://localhost:5000/${postData.file}`}
        className="individual-img"
      />

      <div dangerouslySetInnerHTML={{ __html: postData.content }} />
    </div>
  );
}
export default Individualpost;
