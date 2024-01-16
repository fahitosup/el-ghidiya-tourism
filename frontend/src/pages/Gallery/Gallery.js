import React, { useEffect, useState } from "react";

import "./Gallery.sass";

import Pagination from "../../components/Pagination/Pagination";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate, useSearchParams } from "react-router-dom";

const Gallery = () => {
  const axios = useAxiosPublic();
  const [galleryImages, setGalleryImages] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [pageInfo, setPageInfo] = useState({ pageAt: 1, pageNum: 0 });

  const navigate = useNavigate();
  useEffect(() => {
    axios.get("blogs/gallery/?size=9").then((res) => {
      console.log(res.data.results);
      setGalleryImages(res.data.results);
      setPageInfo((old) => ({ ...old, pageNum: res.data.total_pages }));
    });
  }, []);

  const getCurrentPageFromSP = () => {
    const pOn = searchParams.get("page");
    if (pOn) {
      return "?page=" + pOn;
    }
    return "";
  };

  return (
    <div id="gallery-page">
      <h1 className="heading">هنا تجد الغدية</h1>
      <div className="collage">
        {galleryImages?.map((g, i) => (
          <button onClick={() => navigate(`/blog/${g.blog_slug}`)}>
            <img key={i} src={g.image} />
          </button>
        ))}
      </div>
      <Pagination page={pageInfo.pageAt} pages={pageInfo.pageNum} />
    </div>
  );
};

export default Gallery;
