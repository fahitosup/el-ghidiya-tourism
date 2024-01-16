import { useEffect, useRef, useState } from "react";
import homepageimage1 from "../../../../assets/homepage-image1.png";
import homepageimage2 from "../../../../assets/homepage-image2.png";
import homepageimage3 from "../../../../assets/homepage-image3.png";
import manlooking from "../../../../assets/man-looking.png";
import { useNavigate } from "react-router-dom";
import { elGhidiyaaBlogSlug } from "../../../../settings";

const Main = () => {
  const [imgAt, setImgAt] = useState(0);
  const navigate = useNavigate();

  const intervalRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      setImgAt(1);

      intervalRef.current = setInterval(() => {
        setImgAt((old) => (old < 3 ? old + 1 : 0));
      }, 5000);
    }, 1700);

    return () => clearInterval(intervalRef.current);
  }, []);
  return (
    <div className="homepage-image-container">
      <div className={`scroller-container prog-${imgAt}`}>
        <div className="scroller">
          <img src={homepageimage1} className="homepage-image" />
          <img src={homepageimage2} className="homepage-image" />
          <img src={homepageimage3} className="homepage-image" />
        </div>
      </div>
      <img className="overlap-image" src={manlooking} />
      <div className="homepage-image-text-container">
        <h1 className="headline">
          الغدية جنة الله في أرضه اكتشف هذا المكان الملهم
        </h1>
        <button
          className="primary-button find-more"
          onClick={() => navigate(`/blog/${elGhidiyaaBlogSlug}`)}
        >
          اكتشف المزيد
        </button>
      </div>
    </div>
  );
};

export default Main;
