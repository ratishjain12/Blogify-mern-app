/* eslint-disable react/prop-types */

import { Trash } from "lucide-react";
import { useContext } from "react";
import { userContext } from "./AuthProvider";

const CommentCard = ({ _id, content, author, deleteComment }) => {
  const { userInfo } = useContext(userContext);
  return (
    <div className="my-3 bg-neutral-600 p-2 rounded-md">
      <header className="flex justify-between">
        <h4>{author?.name}</h4>
        {author?.id === userInfo?.id && (
          <Trash
            size={17}
            className="cursor-pointer"
            onClick={() => deleteComment(_id)}
          />
        )}
      </header>
      <p className="text-lg">{content}</p>
    </div>
  );
};
export default CommentCard;
