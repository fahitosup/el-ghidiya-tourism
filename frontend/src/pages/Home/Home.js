import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.sass";

import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.png";
import FeaturedEvents from "./components/FeaturedEvents/FeaturedEvents";
import Features from "./components/Features/Features";
import FeaturedArticles from "./components/FeaturedArticles/FeaturedArticles";
import SEO from "../../components/SEO/SEO";
import Main from "./components/Main/Main";

import {
  homePageBlog1Slug,
  homePageBlog2Slug,
  homePageBlog3Slug,
} from "../../settings";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div id="home-page">
      <SEO title="الصفحة الرئيسية - الغدية" />
      <Main />

      <div className="highlights">
        <h1 className="highlight-heading heading">لوريم إيبسوم</h1>
        <div className="highlight-text p1">
          هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى) ويُستخدم في
          صناعات المطابع ودور النشر. كان لوريم
        </div>
        <div className="highlight-pictures">
          <div
            onClick={() => navigate(`/blog/${homePageBlog1Slug}`)}
            className="himg-container"
          >
            <div className="img-container">
              <img src={image1} />
            </div>
            <p className="ex">ثانوية الغدية</p>
          </div>
          <div
            onClick={() => navigate(`/blog/${homePageBlog2Slug}`)}
            className="himg-container"
          >
            <div className="img-container">
              <img src={image2} />
            </div>
            <p className="ex">مدرسة الإبتدائية</p>
          </div>
          <div
            onClick={() => navigate(`/blog/${homePageBlog3Slug}`)}
            className="himg-container"
          >
            <div className="img-container">
              <img src={image3} alt="image3" />
            </div>
            <p className="ex">وادي الغدية</p>
          </div>
        </div>
      </div>
      <Features />
      <FeaturedArticles />
      <FeaturedEvents />
    </div>
  );
};

export default Homepage;
