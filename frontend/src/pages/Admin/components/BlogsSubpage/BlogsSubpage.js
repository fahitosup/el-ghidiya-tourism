import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

import "./BlogsSubpage.sass";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../../../../components/Pagination/Pagination";

const BlogsSubpage = () => {
  const axios = useAxiosPrivate();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [filters, setFilters] = useState({ search: "", events: false });
  const [pageInfo, setPageInfo] = useState({ pageAt: 1, pageNum: 0 });
  const [searchParams, setSearchParams] = useSearchParams();

  const getCurrentPageFromSP = () => {
    const pOn = searchParams.get("page");
    if (pOn) {
      return "&page=" + pOn;
    }
    return "";
  };

  const getFilterURL = () => {
    let addition = "";

    if (filters.search.length > 0) {
      addition += "q=" + filters.search + "&";
    }
    if (filters.events) {
      addition += "events=True";
    }
    return addition;
  };

  useEffect(() => {
    setPageInfo({ pageAt: 1, pageNum: 0 });
    setSearchParams((usp) => usp.set("page", "1"));
  }, [filters]);
  useEffect(() => {
    axios
      .get("blogs/blogs/?" + getFilterURL() + getCurrentPageFromSP())
      .then((res) => {
        console.log(res.data.results);
        setBlogs(res.data.results);
        setPageInfo((old) => ({
          pageAt: Number(searchParams.get("page")),
          pageNum: res.data.total_pages,
        }));
      });
  }, [filters, searchParams.get("page")]);

  const handleDelete = (blogSlug) => {
    axios.delete(`blogs/blogs/${blogSlug}/`).then((res) => {
      setBlogs((old) => {
        return old.filter((b) => b.slug !== blogSlug);
      });
    });
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(blogs);

  return (
    <div id="blogs-subpage">
      <div className="blogs-subpage-header">
        <div className="search">
          <div className="search-bar-container">
            <label htmlFor="search-bar">:البحث عن المدونات</label>
            <input
              type="text"
              className="search-bar"
              name="search-bar"
              onChange={(e) =>
                setFilters((old) => ({ ...old, search: e.target.value }))
              }
              value={filters.search}
            />
          </div>
          <div className="filter-container">
            <h3>:فلتر</h3>
            <label>
              <input
                type="checkbox"
                onChange={(e) =>
                  setFilters((old) => ({ ...old, events: e.target.checked }))
                }
                value={filters.events}
              />
              الأحداث
            </label>
          </div>
        </div>
        <button
          onClick={() => navigate("/admin/blog/new")}
          className="primary-button"
        >
          Create Blog
        </button>
      </div>
      {!blogs.length ? <h3>لا يوجد حاليا أي مقالات</h3> : null}
      <div className="blogs-container">
        {blogs?.map((b, i) => (
          <React.Fragment key={i}>
            <div className="blog-container">
              <button
                className="primary-button"
                onClick={() => navigate(`/blog/${b.slug}`)}
              >
                View
              </button>
              <button
                className="primary-button"
                onClick={() => handleDelete(b.slug)}
              >
                Delete
              </button>

              <button
                className="blog"
                onClick={() => navigate(`/admin/blog/${b.slug}`)}
              >
                {b.title}
              </button>
            </div>
          </React.Fragment>
        ))}
      </div>
      <Pagination page={pageInfo.pageAt} pages={pageInfo.pageNum} />
    </div>
  );
};

export default BlogsSubpage;
