import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import BlogEditSubpage from "./components/BlogEditSubpage/BlogEditSubpage";
import BlogsSubpage from "./components/BlogsSubpage/BlogsSubpage";

import "./AdminPage.sass";
import SEO from "../../components/SEO/SEO";
import GallerySubpage from "./components/GallerySubpage/GallerySubpage";

const AdminPage = ({ subpage }) => {
  const navigate = useNavigate();
  console.log(subpage);
  useEffect(() => {
    if (subpage == null) {
      navigate("/admin/blogs");
    }
  }, []);
  return (
    <div id="admin-page">
      <SEO title="El Ghidiya - Admin" />

      <div className="subpage-holder">
        {subpage === "blogs" ? <BlogsSubpage /> : null}
        {subpage === "blogadd" ? <BlogEditSubpage edit={false} /> : null}
        {subpage === "blogedit" ? <BlogEditSubpage edit={true} /> : null}
        {subpage === "gallery" ? <GallerySubpage edit={true} /> : null}
      </div>

      <div className="nav-holder">
        <button
          className={`${
            subpage === "blogs" ||
            subpage === "blogedit" ||
            subpage === "blogadd"
              ? "active"
              : ""
          }`}
          onClick={() => navigate("/admin/blogs")}
        >
          المقالات
        </button>
        <button
          className={`${subpage === "gallery" ? "active" : ""}`}
          onClick={() => navigate("/admin/gallery")}
        >
          المعرض
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
