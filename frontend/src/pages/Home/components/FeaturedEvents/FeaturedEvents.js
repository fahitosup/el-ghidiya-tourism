import React, { useState, useEffect } from "react";
import "./FeaturedEvents.sass";
import goback from "../../../../assets/goback.png";
import imagecard1 from "../../../../assets/imagecard1.png";
import bg from "../../../../assets/pattern.png";
import bgr from "../../../../assets/pattern-rotated.png";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const FeaturedEvents = () => {
  const axios = useAxiosPublic();

  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("blogs/events/?size=3").then((res) => {
      setEvents(res.data.results);
    });
  }, []);

  return (
    <div id="featured-events">
      <img className="bg" src={bg} />
      <h2 className="featured-events-headline">الأحداث الهامة لمدينة الغدية</h2>
      <div className="featured-events-cards">
        {events.map((e, i) => (
          <div key={i} className="featured-events-card">
            <div className="featured-events-card-image-container">
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
  );
};

export default FeaturedEvents;
