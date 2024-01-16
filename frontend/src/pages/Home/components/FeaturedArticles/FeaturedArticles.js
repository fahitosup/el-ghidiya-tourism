import React, { useEffect, useState } from "react";
import "./FeaturedArticles.sass";
import featuredImage from "../../../../assets/featured-articles-image.png";
import goback from "../../../../assets/goback.png";

import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const FeaturedArticles = () => {
  const axios = useAxiosPublic();

  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("blogs/blogs/?size=2").then((res) => {
      setBlogs(res.data.results);
    });
  }, []);

  return (
    <div className="featured-articles-container">
      <h1 className="heading">مقالاتنا</h1>

      {blogs.map((b, i) => (
        <div className="featured-article">
          <div className="article-text">
            <h3 className="heading">{b.title}</h3>
            <p className="p1">{b.short_description}</p>
            <button
              className="button-with-icon"
              onClick={() => navigate(`/blog/${b.slug}`)}
            >
              <span>
                <img className="goback-icon" src={goback} />
              </span>
              اكتشف المزيد
            </button>
          </div>
          <div className="article-image-container">
            <img className="article-image" src={b.thumbnail} />
          </div>
        </div>
      ))}

      <div className="find-more-container">
        <button className="find-more" onClick={() => navigate("/blogs")}>
          المزيد من المقالات
        </button>
      </div>
    </div>
  );
};

export default FeaturedArticles;
