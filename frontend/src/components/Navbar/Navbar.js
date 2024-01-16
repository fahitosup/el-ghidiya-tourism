import React, { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import menu from "../../assets/icons/menu.png";
import { elGhidiyaaBlogSlug } from "../../settings";

const Navbar = () => {
  const navigate = useNavigate();

  const [IsDropDownVisible, setIsDropDownVisible] = useState(false);

  const handleMenuClick = () => {
    setIsDropDownVisible(!IsDropDownVisible);
  };

  const handleLinkClick = (destination) => {
    navigate(destination);
    setIsDropDownVisible(false);
  };
  return (
    <div className="navbar">
      <div onClick={() => navigate(`/blog/${elGhidiyaaBlogSlug}`)}>الغدية</div>
      <ul>
        <li
          onClick={() => {
            handleLinkClick("contact-us");
          }}
        >
          <span>اتصل بنا</span>
        </li>
        <li
          onClick={() => {
            handleLinkClick("privacy-policy");
          }}
        >
          سياسة الخصوصية
        </li>
        <li
          onClick={() => {
            handleLinkClick("events");
          }}
        >
          الأحداث
        </li>
        <li
          onClick={() => {
            handleLinkClick("gallery");
          }}
        >
          المعرض
        </li>
        <li
          onClick={() => {
            handleLinkClick("blogs");
          }}
        >
          المقالات
        </li>
        <li
          onClick={() => {
            handleLinkClick("");
          }}
        >
          الرئيسية
        </li>
        <li
          className="menu-icon"
          onClick={() => {
            handleMenuClick();
          }}
        >
          <img src={menu} />
        </li>
      </ul>
      {IsDropDownVisible ? (
        <div className="dropdown">
          <div
            onClick={() => {
              handleLinkClick("contact-us");
            }}
          >
            اتصل بنا
          </div>
          <div
            onClick={() => {
              handleLinkClick("privacy-policy");
            }}
          >
            {" "}
            سياسة الخصوصية
          </div>
          <div
            onClick={() => {
              handleLinkClick("events");
            }}
          >
            الأحداث
          </div>
          <div
            onClick={() => {
              handleLinkClick("gallery");
            }}
          >
            المعرض
          </div>
          <div
            onClick={() => {
              handleLinkClick("blogs");
            }}
          >
            المقالات
          </div>
          <div
            onClick={() => {
              handleLinkClick("");
            }}
          >
            الرئيسية
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
