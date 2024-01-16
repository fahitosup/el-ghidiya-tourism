import React, { useState } from "react";
import arrowLeft from "../../assets/arrow-left.png";
import more from "../../assets/more.svg";

import { useNavigate, useSearchParams } from "react-router-dom";

function range(start, stop, step) {
  if (typeof stop == "undefined") {
    // one param defined
    stop = start;
    start = 0;
  }

  if (typeof step == "undefined") {
    step = 1;
  }

  if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
    return [];
  }

  var result = [];
  for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
    result.push(i);
  }

  return result;
}

const Dots = ({ page, pages, left = true }) => {
  const navigate = useNavigate();

  return (
    <>
      {left ? (
        <>
          <img className="more" src={more} />
          <button
            className={`pagen ${page === pages ? "on" : ""}`}
            onClick={() => navigate(`?page=${pages}`)}
          >
            {pages}
          </button>
        </>
      ) : (
        <>
          <button
            className={`pagen ${page === 1 ? "on" : ""}`}
            onClick={() => navigate(`?page=1`)}
          >
            1
          </button>
          <img className="more" src={more} />
        </>
      )}
    </>
  );
};

const Pagination = ({ pages = 0, page = 1 }) => {
  const navigate = useNavigate();

  return (
    <div id="pagination-container">
      {pages > 1 ? (
        <>
          {page > 1 ? (
            <button
              onClick={() => (page > 1 ? navigate(`?page=${page - 1}`) : null)}
              className="arrow"
            >
              <img className="right" src={arrowLeft} />
            </button>
          ) : null}
          {pages <= 5 ? (
            range(pages).map((e) => (
              <button
                className={`pagen ${page === e + 1 ? "on" : ""}`}
                onClick={() => navigate(`?page=${e + 1}`)}
              >
                {e + 1}
              </button>
            ))
          ) : (
            <>
              {page <= 4 ? (
                <>
                  {range(0, page + 2).map((e) => (
                    <button
                      onClick={() => navigate(`?page=${e + 1}`)}
                      className={`pagen ${page === e + 1 ? "on" : ""}`}
                    >
                      {e + 1}
                    </button>
                  ))}
                  <Dots page={page} pages={pages} />
                </>
              ) : page >= pages - 4 ? (
                <>
                  <Dots left={false} page={page} pages={pages} />
                  {range(page - 2, pages).map((e) => (
                    <button
                      onClick={() => navigate(`?page=${e + 1}`)}
                      className={`pagen ${page === e + 1 ? "on" : ""}`}
                    >
                      {e + 1}
                    </button>
                  ))}
                </>
              ) : (
                <>
                  <Dots left={false} page={page} pages={pages} />
                  {range(page - 2, page + 2).map((e) => (
                    <button
                      onClick={() => navigate(`?page=${e + 1}`)}
                      className={`pagen ${page === e + 1 ? "on" : ""}`}
                    >
                      {e + 1}
                    </button>
                  ))}
                  <Dots page={page} pages={pages} />
                </>
              )}
            </>
          )}
          {page < pages ? (
            <button
              onClick={() =>
                page < pages ? navigate(`?page=${page + 1}`) : null
              }
              className="arrow"
            >
              <img src={arrowLeft} />
            </button>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default Pagination;
