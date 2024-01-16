import React, { useEffect, useState } from "react";
import featuredImage from "../../assets/featured-articles-image.png";
import goback from "../../assets/goback.png";
import "./Articles.sass";
import Pagination from "../../components/Pagination/Pagination";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SEO from "../../components/SEO/SEO";

const Articles = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const axios = useAxiosPublic();
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageCount, setPageCount] = useState(0);
  const [pageAt, setPageAt] = useState(1);

  const getCurrentPageFromSP = () => {
    const pOn = searchParams.get("page");
    if (pOn) {
      return "?page=" + pOn;
    }
    return "";
  };

  useEffect(() => {
    axios.get(`blogs/blogs/${getCurrentPageFromSP()}`).then((res) => {
      setBlogs(res.data.results);
      setPageCount(res.data.total_pages);
      setPageAt(Number(searchParams.get("page") || 1));
      console.log(res.data);
    });
  }, [searchParams.get("page")]);
  return (
    <div id="article-page-container">
      <SEO title="مقالات - الغدية" />

      <h1 className="heading">مقالاتنا</h1>
      {blogs.map((b) => (
        <button
          onClick={() => navigate(`/blog/${b.slug}`)}
          className="featured-article"
        >
          <div className="article-text">
            <h3 className="heading">{b.title}</h3>
            <p className="p1">{b.short_description}</p>
            <button className="button-with-icon">
              <span>
                <img className="goback-icon" src={goback} />
              </span>
              اكتشف المزيد
            </button>
          </div>
          <div className="article-img-container">
            <img className="article-image" src={b.thumbnail} />
          </div>
        </button>
      ))}

      <Pagination pages={pageCount} page={pageAt} />
    </div>
  );
};

export default Articles;
