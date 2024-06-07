/* eslint-disable react/prop-types */
import { format } from "date-fns";
import { Copy, Heart, Share } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import {
  XIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  LinkedinIcon,
  LinkedinShareButton,
} from "react-share";

function Post({
  _id,
  title,
  summary,
  file,
  createdAt,
  author,
  likedByCurrentUser,
  userId,
  username,
  likesCount,
}) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(likedByCurrentUser);
  const [likes, setLikes] = useState(likesCount);
  const likePost = async () => {
    if (!userId) return navigate("/signin");
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}posts/${_id}/likes`,
      {
        userId,
        userName: username,
      }
    );
    if (response.status !== 500) {
      setLiked(response.data.likedByCurrentUser);
      setLikes(response.data.likesCount);
    }
  };

  const copyLink = () => {
    const url = `${window.origin}/blog/${_id}`;
    navigator.clipboard.writeText(url);
  };
  return (
    <div className="bg-white p-4 sm:max-w-[400px] rounded-lg flex flex-col">
      <div
        className="card-img-holder cursor-pointer"
        onClick={() =>
          navigate(`/blog/${_id}`, { state: { url: window.location.pathname } })
        }
      >
        <img
          src={file}
          className="rounded-lg object-cover w-full sm:min-h-52"
          alt="Blog image"
        />
      </div>
      <div className="flex-1 justify-between">
        <h3
          className="text-black font-medium cursor-pointer text-2xl mt-2 capitalize "
          onClick={() =>
            navigate(`/blog/${_id}`, {
              state: { url: window.location.pathname },
            })
          }
        >
          {title}
        </h3>
        <p className=" text-sm text-slate-600">{author.name}</p>
        <span className="blog-time text-black text-xs">
          {format(new Date(createdAt), "MMM d, yyyy ")}
        </span>
        <p className="description text-black mt-3 mb-1">{summary}</p>
        <div className="flex gap-2 items-center mt-3">
          <div className="flex gap-1">
            <button onClick={likePost}>
              {liked ? (
                <Heart fill="red" size={20} />
              ) : (
                <Heart color="black" size={20} />
              )}
            </button>
            <span className="text-black">{likes}</span>
          </div>
          <Popup
            trigger={
              <button>
                <Share color="black" size={20} />
              </button>
            }
            position={"right top"}
          >
            <div className="px-2 py-1 space-x-1   space-y-2">
              <h2 className="text-black font-medium">share</h2>
              <div className="flex gap-2 items-center">
                <WhatsappShareButton url={`${window.origin}/blog/${_id}`}>
                  <WhatsappIcon size={40} className="rounded-full" />
                </WhatsappShareButton>
                <TwitterShareButton url={`${window.origin}/blog/${_id}`}>
                  <XIcon size={40} className="rounded-full" />
                </TwitterShareButton>
                <LinkedinShareButton url={`${window.origin}/blog/${_id}`}>
                  <LinkedinIcon size={40} className="rounded-full" />
                </LinkedinShareButton>
                <button className="text-black" onClick={copyLink}>
                  <Copy />
                </button>
              </div>
            </div>
          </Popup>
        </div>
        <div className="options  flex items-center justify-between">
          <span
            className="text-black animate-pulse cursor-pointer"
            onClick={() =>
              navigate(`/blog/${_id}`, {
                state: { url: window.location.pathname },
              })
            }
          >
            Read Full Blog
          </span>
          <button className="btn bg-blue-300 px-2 py-1 rounded">Blog</button>
        </div>
      </div>
    </div>
  );
}
export default Post;
