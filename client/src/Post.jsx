import { format } from "date-fns";
import { Link } from "react-router-dom";

function Post({ title, summary, content, file, createdAt, author, _id }) {
  console.log(file);
  return (
    <div className="post-container">
      <Link to={`/post/${_id}`}>
        <div className="post">
          <img className="image" src={`http://localhost:5000/${file}`} alt="" />

          <div className="content">
            <h2>{title}</h2>

            <div className="info">
              <b style={{ marginRight: "10px" }}>{author.username}</b>

              <time>{format(new Date(createdAt), "MMM d, yyyy HH:mm")}</time>
            </div>
            <p>{summary}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
export default Post;