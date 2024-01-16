import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

import "./GallerySubpage.sass";
import { useNavigate } from "react-router-dom";

const GallerySubpage = () => {
  const [galleryPics, setGalleryPics] = useState([]);
  const navigate = useNavigate();
  const axios = useAxiosPrivate();
  useEffect(() => {
    axios.get("blogs/gallery/").then((res) => {
      setGalleryPics(res.data.results);
    });
  }, []);

  const deleteImage = (gImgId) => {
    const filter = (g) => {
      return g.id !== gImgId;
    };

    axios.delete(`blogs/gallery/${gImgId}/`).then((res) => {
      setGalleryPics((old) => old.filter(filter));
    });
  };

  return (
    <div id="gallery-subpage">
      <div className="collage">
        {galleryPics.map((g, i) => (
          <div key={i}>
            <button onClick={() => deleteImage(g.id)} className="x">
              X
            </button>
            {g.blog_slug ? (
              <button
                className="go"
                onClick={() => navigate(`/blog/${g.blog_slug}`)}
              >
                ^
              </button>
            ) : null}
            <img src={g.image} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GallerySubpage;
