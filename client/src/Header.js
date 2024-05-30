// Header.js or Header.jsx
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import { toast } from "react-toastify"; // Import toast
import "./Header.css"; // Import the CSS file

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    })
    .then(() => {
      setUserInfo(null);
      toast.success("Logged out successfully!"); // Show success toast
    })
    .catch(error => {
      console.error('Logout error:', error);
      toast.error("Failed to log out"); // Show error toast
    });
  }

  const username = userInfo?.username;

  return (
    <header className="header">
      <Link to="/" className="logo">MyBlog</Link>
      <nav className="nav">
        {username && (
          <>
            <Link to="/create" className="nav-link">Create new post</Link>
            <a onClick={logout} className="nav-link logout">Logout ({username})</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
