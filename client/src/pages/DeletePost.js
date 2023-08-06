import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function DeletePost() {
  const { id } = useParams();
  const navigate = useNavigate(); // Use useNavigate hook instead of useHistory
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then(response => {
        if (!response.ok) {
          // Handle error if post is not found or user is not the author
          throw new Error("Post not found or you are not the author.");
        }
        return response.json();
      })
      .then(postInfo => {
        // Perform the delete request
        fetch(`http://localhost:4000/post/${id}`, {
          method: "DELETE",
          credentials: "include",
        }).then(response => {
          if (response.ok) {
            setRedirect(true); // Redirect to home page after successful delete
          } else {
            throw new Error("Failed to delete post.");
          }
        });
      })
      .catch(error => {
        console.error(error);
        navigate(`/post/${id}`); // Use navigate instead of history.push
      });
  }, [id, navigate]);

  if (redirect) {
    return <div>Post deleted successfully. Redirecting...</div>;
  }

  return <div>Deleting post...</div>;
}
