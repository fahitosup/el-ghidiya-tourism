import React, { useEffect, useState } from "react";
import "./Blog.sass";
import articleimage from "../../assets/article-image.png";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

import { convert_to_arabic_date } from "../../utils";
import SEO from "../../components/SEO/SEO";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import UnderConstruction from "../../components/UnderConstruction/UnderConstruction";

const ArticleComment = () => {
  const [blogData, setBlogData] = useState();

  const { slug } = useParams();
  const [commentData, setCommentData] = useState({
    name: "",
    text: "",
    slug: slug,
  });

  const [underConstruction, setUnderConstruction] = useState(false);

  const [admin, setAdmin] = useState(false);

  const [comments, setComments] = useState([]);

  const axios = useAxiosPublic();
  const axiosPriv = useAxiosPrivate();
  const { auth } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`blogs/blogs/${slug}/`)
      .then((res) => {
        if (res.data?.code === "under_construction") {
          setUnderConstruction(true);
        } else {
          setBlogData({
            ...res.data,
            creation_time: convert_to_arabic_date(
              new Date(res.data.creation_time)
            ),
          });

          axios
            .post("accounts/token/verify/", { token: auth.access })
            .then((res) => {
              setAdmin(true);
              axiosPriv.get(`blogs/comments/?slug=${slug}`).then((res) => {
                setComments(res.data);
              });
            })
            .catch((err) => {
              setAdmin(false);
              axios
                .get(`blogs/comments/?slug=${slug}`)
                .then((res) => {
                  setComments(res.data);
                })
                .catch((err) => {
                  setAdmin(false);
                });
            });
        }
      })
      .catch((err) => {
        navigate("/404");
      });
  }, []);
  return (
    <div id="blog-page-container">
      {!underConstruction ? (
        <>
          <SEO title={`El Ghidiya - ${blogData?.title}`} />

          <div className="article-comment-page">
            <div className="header">
              <p className="p1" style={{ fontFamily: "El Messiri" }}>
                {blogData?.creation_time}{" "}
              </p>
              <h1 className="heading">{blogData?.title}</h1>
            </div>
            <div className="article-image">
              <img src={blogData?.thumbnail} />
            </div>
            <div className="line"></div>
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: blogData?.content }}
            ></div>
            <div className="line"></div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!commentData.text || !commentData.name) return;

                setCommentData((old) => ({ ...old, name: "", text: "" }));

                axios.post("blogs/comments/", commentData).then((res) => {
                  setComments((old) => [
                    {
                      name: commentData.name,
                      text: commentData.text,
                      id: res.data.id,
                    },
                    ...old,
                  ]);
                });
              }}
              className="commenting"
            >
              <input
                type="text"
                value={commentData.name}
                onChange={(e) =>
                  setCommentData((old) => ({ ...old, name: e.target.value }))
                }
                placeholder="...اسم"
              />

              <textarea
                className="textarea"
                value={commentData.text}
                onChange={(e) =>
                  setCommentData((old) => ({ ...old, text: e.target.value }))
                }
                placeholder="...ما هو رأيك بهذه المقالة"
              ></textarea>
              <div className="send-button">
                <input
                  type="submit"
                  value="أرسل تعليقك"
                  className="find-more"
                />
              </div>
            </form>
            <div className="comment-section">
              <h2>:تعليقات</h2>

              {comments.map((c, i) => (
                <div key={i} className="comment">
                  <h3>{c.name}</h3>
                  <p>{c.text}</p>
                  {admin ? (
                    <button
                      className="delete"
                      onClick={() => {
                        axiosPriv
                          .delete(`blogs/comments/${c?.id}/?slug=${slug}`)
                          .then((res) => {
                            setComments((old) =>
                              old.filter((cc) => cc.id !== c.id)
                            );
                          });
                      }}
                    >
                      Delete Comment
                    </button>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <UnderConstruction />
      )}
    </div>
  );
};

export default ArticleComment;
