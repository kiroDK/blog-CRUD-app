import { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";
import { FiEdit, FiTrash } from 'react-icons/fi';


export default function PostPage() {
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [postInfo, setPostInfo] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then((response) => {
        response.json().then((postInfo) => {
          setPostInfo(postInfo);
        });
      });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      fetch(`http://localhost:4000/post/${id}`, {
        method: "DELETE",
        credentials: "include",
      }).then((response) => {
        if (response.ok) {
          navigate("/"); // Redirect to home page after successful delete
        } else {
          console.error("Failed to delete post.");
        }
      });
    }
  };

  if (!postInfo) return '';

  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className="author">by @{postInfo.author.username}</div>
      {userInfo.id === postInfo.author._id && (
        <div className="edit-row">
        <Link className="edit-btn" to={`/edit/${postInfo._id}`}style={{ fontSize: '1rem' }}>
          <FiEdit /> {/* Edit icon */}
          Edit this post
        </Link>
        <button className="delete-btn" onClick={handleDelete}style={{ fontSize: '1rem' }}>
          <FiTrash /> {/* Delete icon */}
          Delete this post
        </button>
      </div>
      )}
      <div className="image">
        <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
      </div>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />
    </div>
  );
}
