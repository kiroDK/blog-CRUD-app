import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} MyBlog. All rights reserved.</p>
      <nav>
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms-of-service">Terms of Service</a>
        <a href="/contact">Contact</a>
      </nav>
    </footer>
  );
}
