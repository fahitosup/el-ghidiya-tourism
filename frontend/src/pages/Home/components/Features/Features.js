import React, { useEffect, useState } from "react";
import "./Features.sass";

import sheep from "../../../../assets/sheep.png";
import island from "../../../../assets/island.png";
import mask from "../../../../assets/mask.svg";
import bg from "../../../../assets/pattern.png";
import bgr from "../../../../assets/pattern-rotated.png";
import {
  homePageBlog3Slug,
  homePageIcon1BlogSlug,
  homePageIcon2BlogSlug,
} from "../../../../settings";
import { useNavigate } from "react-router-dom";

const Features = () => {
  const [backgroundImage, setBackgroundImage] = useState(bg);
  const navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth <= 600) {
        setBackgroundImage(bgr);
      } else {
        setBackgroundImage(bg);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return (
    <div className="features-container">
      <img src={backgroundImage} className="bg" />
      <div className="features-headline">مميزات الغدية</div>
      <div className="features-cards">
        <div
          className="features"
          onClick={() => navigate(`/blog/${homePageIcon1BlogSlug}`)}
        >
          <img src={sheep} alt="sheep" />
          <h1>تربية الماشية</h1>
          <p className="p1">
            هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى) ويُستخدم
            في صناعات المطابع ودور النشر. كان لوريم
          </p>
        </div>
        <div
          className="features"
          onClick={() => navigate(`/blog/${homePageIcon2BlogSlug}`)}
        >
          <img src={island} alt="sheep" />
          <h1>زراعة النخيل</h1>
          <p className="p1">
            هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى) ويُستخدم
            في صناعات المطابع ودور النشر. كان لوريم
          </p>
        </div>
        <div
          className="features"
          onClick={() => navigate(`/blog/${homePageBlog3Slug}`)}
        >
          <img src={mask} alt="sheep" />
          <h1>المحظرة</h1>
          <p className="p1">
            هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى) ويُستخدم
            في صناعات المطابع ودور النشر. كان لوريم
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
