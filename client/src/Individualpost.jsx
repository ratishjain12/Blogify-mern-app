import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { CircleArrowLeft, Plus } from "lucide-react";
import { userContext } from "./AuthProvider";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import CommentCard from "./CommentCard";

function Individualpost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { userInfo } = useContext(userContext);
  const [postData, setPostData] = useState();
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState();
  const [handler, setHandler] = useState(false);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}post/${id}`).then((res) => {
      res.json().then((data) => {
        setPostData(data[0]);
      });
    });
  }, [handler]);

  const deletePost = async () => {
    const response = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}delete/${id}`
    );
    if (response.status === 200) {
      return navigate("/blogs");
    }
  };

  const addComment = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}posts/${postData?._id}/comments`,
      {
        content: comment,
        author: {
          id: userInfo.id,
          name: userInfo.fullName,
        },
      }
    );
    if (response.status === 200) {
      setHandler(!handler);
      setShowModal(false);
    }
  };

  const deleteComment = async (commentId) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}posts/${
        postData?._id
      }/comments/${commentId}`
    );

    if (response.status === 200) {
      setHandler(!handler);
    }
  };
  return (
    <div className="relative mt-20 p-4 sm:max-w-[80%] mx-auto">
      <div className="w-full flex justify-between items-center">
        <Link to="/blogs">
          <CircleArrowLeft size={30} />
        </Link>
        <div className=" flex gap-3">
          {userInfo?.id === postData?.author.id && (
            <>
              <button
                className="bg-white text-black px-3 py-1 rounded-md"
                onClick={() => navigate(`/edit/${postData?._id}`)}
              >
                Edit
              </button>
              <Popup
                trigger={
                  <button className="bg-neutral-700 px-3 py-1 rounded-md">
                    Delete
                  </button>
                }
                position={"left top"}
              >
                <div className="text-black p-3 text-sm">
                  Are you sure you want to delete this blog post?
                  <br />
                  <button
                    className="bg-red-600 font-medium w-full rounded-md mt-3 px-2 py-1 text-white"
                    onClick={deletePost}
                  >
                    Yes
                  </button>
                </div>
              </Popup>
            </>
          )}
        </div>
      </div>
      <div className="mt-4 space-y-3">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold">
          {postData?.title}
        </h1>
        <p className=" text-sm sm:text-md text-slate-300 font-medium sm:ml-1">
          {postData?.summary}
        </p>
        <p className=" text-xs sm:text-md text-slate-300 font-medium sm:ml-1">
          {postData && format(new Date(postData.createdAt), "MMM d, yyyy")}
        </p>
        <img src={postData?.file} className="rounded-md  md:w-92" />
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: postData?.content }}
        className="mt-6 p-2"
      />
      <hr className="mt-6" />
      <div className="mt-4 flex justify-between items-center">
        <h2>Comments ({postData?.commentsCount})</h2>
        <button
          className="bg-white font-medium font-mono text-black px-2 py-1 rounded gap-2 flex items-center "
          onClick={() => setShowModal(true)}
        >
          Add Comment
          <Plus size={16} />
        </button>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center m-2 flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-xl font-semibold text-black">
                    Add Comment
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                {/*body*/}
                <div className="relative p-2 flex-auto">
                  <p className="text-blueGray-500 text-md leading-relaxed text-black">
                    <textarea
                      placeholder="write comment"
                      className="w-72 h-20  border-2 rounded border-gray-800 p-1"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-black bg-white background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="text-white bg-black active:bg-slate-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={addComment}
                  >
                    comment
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <div>
        {postData?.comments?.map((c) => {
          return (
            <CommentCard key={c._id} {...c} deleteComment={deleteComment} />
          );
        })}
      </div>
    </div>
  );
}
export default Individualpost;
