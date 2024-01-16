import React, { useEffect, useState } from "react";
import "./Events.sass";
import goback from "../../assets/goback.png";
import imagecard1 from "../../assets/imagecard1.png";
import bgr from "../../assets/pattern-rotated.png";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Pagination from "../../components/Pagination/Pagination";
import { useNavigate, useSearchParams } from "react-router-dom";
import SEO from "../../components/SEO/SEO";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [pageInfo, setPageInfo] = useState({ pageAt: 1, pageNum: 0 });
  const [searchParams, setSearchParams] = useSearchParams();

  const axios = useAxiosPublic();
  const navigate = useNavigate();

  const getCurrentPageFromSP = () => {
    const pOn = searchParams.get("page");
    if (pOn) {
      return "?page=" + pOn;
    }
    return "";
  };

  useEffect(() => {
    axios.get(`blogs/events/${getCurrentPageFromSP()}`).then((res) => {
      setEvents(res.data.results);
      setPageInfo((old) => ({ ...old, pageNum: res.data.total_pages }));
    });
  }, []);
  return (
    <div id="events-page">
      <SEO title="الأحداث - الغدية" />
      {/* <img src={bgr} className="bgr" /> */}
      <h1 className="heading">الأحداث الهامة لمدينة الغدية</h1>
      <div className="events">
        <div className="events-cards">
          {events.map((e, i) => (
            <div className="events-card">
              <div className="events-card-image-container">
                <img src={e.thumbnail} />
              </div>
              <div className="card-description">
                <h3>{e.title}</h3>
                <p>{e.short_description}</p>
                <button
                  className="button-with-icon"
                  onClick={() => navigate(`/blog/${e.slug}`)}
                >
                  <span>
                    <img className="goback-icon" src={goback} />
                  </span>
                  اكتشف المزيد
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Pagination page={pageInfo.pageAt} pages={pageInfo.pageNum} />
    </div>
  );
};

export default Events;
