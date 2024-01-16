import React from "react";
import { useNavigate } from "react-router-dom";

import fb from "../../assets/fb.png";
import ig from "../../assets/ig.png";
import x from "../../assets/x.png";
import { elGhidiyaaBlogSlug } from "../../settings";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div id="footer">
      <div className="footer-body">
        <div className="contact">
          <h1>تواصل معنا</h1>

          <a href="https://facebook.com/mls.cr7" target="_blank">
            <img src={fb} />
          </a>
          <a href="https://twitter.com/mls_cr7" target="_blank">
            <img src={x} />
          </a>
          <a href="https://instagram.com/mls.cr7" target="_blank">
            <img src={ig} />
          </a>
        </div>
        <div className="discover">
          <h1>اكتشف الغدية</h1>
          <ul>
            <li onClick={() => navigate("blogs")}>مقالاتنا</li>
            <li onClick={() => navigate("gallery")}>معرضنا</li>
            <li onClick={() => navigate("events")}>أحداثنا</li>
            <li onClick={() => navigate("privacy-policy")}>سياسة الخصوصية</li>
            <li onClick={() => navigate("contact-us")}>اتصل بنا</li>
          </ul>
        </div>
        <div className="introduction">
          <h1 onClick={() => navigate(`/blog/${elGhidiyaaBlogSlug}`)}>
            الغدية
          </h1>
          <p>
            هذا هو موقع الغدية، لمساعدة المسلمين على اكتشاف هذا المكان الثمين،
            للاستمتاع بممارسة الإسلام والتعلم عنه، مع العيش في بنية حياة قديمة
            .كريمة
          </p>
        </div>
      </div>
      <div className="footer-end">جميع الحقوق محفوظة</div>
    </div>
  );
};

export default Footer;
