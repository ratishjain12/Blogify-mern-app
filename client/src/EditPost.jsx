import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { Navigate, useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";

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

function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch("https://blogify-backend-b1kr.onrender.com/post/" + id).then(
      (response) => {
        response.json().then((data) => {
          console.log(data);
          setTitle(data[0].title);
          setSummary(data[0].summary);
          setContent(data[0].content);
        });
      }
    );
  }, []);

  async function edit(e) {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    if (file) {
      data.set("file", file[0]);
    }

    await fetch("https://blogify-backend-b1kr.onrender.com/edit/" + id, {
      method: "PUT",
      body: data,
    });

    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }

  return (
    <form onSubmit={edit} className="create-container">
      <input
        type="title"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="summary"
        placeholder="summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input type="file" onChange={(e) => setFile(e.target.files)} />
      <ReactQuill
        value={content}
        modules={modules}
        formats={formats}
        onChange={(value) => setContent(value)}
      />
      <button className="createbutton">Edit Post</button>
    </form>
  );
}
export default EditPost;
