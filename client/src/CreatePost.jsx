import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { Navigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import "react-quill/dist/quill.snow.css";
import { ImageUp } from "lucide-react";

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

function CreatePost() {
  const { user } = useUser();
  const { userId } = useAuth();
  useEffect(() => {}, []);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState();
  const [redirect, setRedirect] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  async function createNewPost(e) {
    setLoading(true);
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("userId", userId);
    data.set("name", user.fullName);
    data.set("file", file[0]);
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}create`, {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.status === 200) {
      setLoading(false);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to="/blogs" />;
  }
  const setImg = (file) => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };
  return (
    <div className="mt-20 p-4 sm:w-[80%] mx-auto space-y-3">
      <h1 className="text-3xl sm:text-4xl">Create Blog</h1>
      <form
        onSubmit={createNewPost}
        className="create-container flex flex-col gap-3 "
      >
        <input
          type="title"
          placeholder="title"
          value={title}
          className=" p-2 rounded bg-[#2f2e2e] shadow-lg"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="summary"
          placeholder="summary"
          className=" p-2 rounded bg-[#2f2e2e] shadow-lg"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <div>
          <label htmlFor="file" className="cursor-pointer">
            <div className="w-full p-6 bg-[#252424] flex flex-col items-center justify-center">
              {!file ? (
                <>
                  <ImageUp size={80} />
                  <span>Choose Thumnail Image</span>
                </>
              ) : (
                <img src={imageUrl} />
              )}
            </div>
          </label>
        </div>
        <input
          type="file"
          id="file"
          hidden
          onChange={(e) => {
            setFile(e.target.files);
            setImg(e.target.files[0]);
          }}
        />
        <ReactQuill
          value={content}
          modules={modules}
          formats={formats}
          onChange={(value) => setContent(value)}
        />
        <button className="bg-white text-black p-2 rounded font-medium text-center">
          {loading ? (
            <div className="border-gray-300 flex justify-center h-6 w-6 mx-auto animate-spin rounded-full border-4 border-t-black" />
          ) : (
            "Create Blog"
          )}
        </button>
      </form>
    </div>
  );
}
export default CreatePost;
