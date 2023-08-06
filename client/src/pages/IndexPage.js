import Post from "../Post";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4000/post')
      .then(response => response.json())
      .then(posts => {
        setPosts(posts);
      });
  }, []);

  return (
    <>
      {posts.length > 0 ? (
        posts.map(post => (
          <Post key={post._id} {...post} />
        ))
      ) : (
        <div className="no-content-message">
          <p>No content available at the moment.</p>
          <p>Create your first post and share your thoughts!</p>
        </div>
      )}
    </>
  );
}
