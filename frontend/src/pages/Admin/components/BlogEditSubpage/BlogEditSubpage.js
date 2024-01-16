import React, { useEffect, useRef, useState } from "react";

import "./BlogEditSubpage.sass";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ar from "date-fns/locale/ar";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

const BlogEditSubpage = ({ edit }) => {
  const [value, setValue] = useState("");
  const raw_value = useRef("");
  const quillRef = useRef();
  const [selectedDate, setSelectedDate] = useState(0);
  const [blogData, setBlogData] = useState({
    blogName: "",
    thumbnail: null,
    isEvent: false,
    eventTime: null,
    isUnderConstruction: false,
    isListed: true,
  });

  const imgRef = useRef(null);

  const { slug } = useParams();
  const axios = useAxiosPrivate();
  useEffect(() => {
    if (slug) {
      axios.get(`/blogs/blogs/${slug}/`).then((res) => {
        console.log(res.data);
        setBlogData((old) => ({
          ...old,
          blogName: res.data.title,
          thumbnail: res.data.thumbnail,
          eventObject: res.data.event,
          isEvent: res.data.event ? true : false,
          isUnderConstruction: res.data.is_underconstruction ? true : false,
          isListed: res.data.is_listed ? true : false,
        }));
        if (res.data.event) {
          setSelectedDate(new Date(res.data.event.time));
        }
        imgRef.current.src = res.data.thumbnail;
        setValue(res.data.content);
      });
    }
  }, []);
  useEffect(() => {
    raw_value.current = quillRef.current.unprivilegedEditor.getText();
  }, [value]);

  const mod = {
    toolbar: [
      [{ font: [] }, { size: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "super" }, { script: "sub" }],
      [{ header: "1" }, { header: "2" }, "blockquote", "code-block"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["direction", { align: ["", "center", "right"] }],
      ["link", "image", "video", "formula"],
      ["clean"],
    ],
  };

  const fmt = [
    "header",
    "font",
    "size",
    "color",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
    "direction",
  ];
  const navigate = useNavigate();

  const createFormData = () => {
    const submitFormData = new FormData();

    submitFormData.append("title", blogData.blogName);

    console.log(
      typeof blogData.thumbnail != "string" && Boolean(blogData.thumbnail)
    );
    if (typeof blogData.thumbnail != "string" && Boolean(blogData.thumbnail))
      submitFormData.append("up_thumbnail", blogData.thumbnail);
    submitFormData.append("content", value);
    submitFormData.append("raw_content", raw_value.current);
    submitFormData.append("is_underconstruction", blogData.isUnderConstruction);
    submitFormData.append("is_listed", blogData.isListed);
    submitFormData.append("is_event", blogData.isEvent);
    submitFormData.append(
      "event_date",
      selectedDate ? selectedDate.getTime() : 0
    );

    return submitFormData;
  };

  const saveBlog = (e) => {
    e.preventDefault();

    if (edit) {
      const fformData = createFormData();
      axios
        .patch(`blogs/blogs/${slug}/`, fformData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => {
          navigate("/admin/blogs");
        });
    } else {
      const fformData = createFormData();
      axios
        .post("blogs/blogs/", fformData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => {
          navigate("/admin/blogs");
        });
    }
  };

  return (
    <div id="blog-edit-subpage">
      <form onSubmit={saveBlog}>
        <h1>{edit ? "Editing" : "Adding"} Blog</h1>
        <p className="label">Blog Thumbnail</p>
        <div class="image-uploader">
          <input
            type="file"
            className="img-upload-btn"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setBlogData((old) => ({ ...old, thumbnail: file }));
                const reader = new FileReader();
                reader.onload = function (ee) {
                  imgRef.current.src = ee.target.result;
                };
                reader.readAsDataURL(file);
              }
            }}
            accept="image/*"
          />
          <img src="" alt="" ref={imgRef} className="uploaded-img" />
        </div>
        <p className="label">Blog Name</p>
        <div style={{ display: "flex" }}>
          <input
            type="text"
            name="blogName"
            value={blogData.blogName}
            className="field"
            onChange={(e) =>
              setBlogData((old) => ({
                ...old,
                [e.target.name]: e.target.value,
              }))
            }
          />
          <label>
            حدث
            <input
              type="checkbox"
              checked={blogData.isEvent}
              onChange={() =>
                setBlogData((old) => ({ ...old, isEvent: !old.isEvent }))
              }
            />
          </label>
        </div>
        {blogData.isEvent ? (
          <div className="date-container">
            <h3>:تاريخ</h3>
            <DatePicker
              id="datePicker"
              selected={selectedDate}
              dateFormat="yyyy-MM-dd"
              onChange={(date) => {
                setSelectedDate(date);
              }}
              locale={ar}
            />
          </div>
        ) : null}
        <ReactQuill
          theme="snow"
          modules={mod}
          formats={fmt}
          value={value}
          onChange={setValue}
          ref={quillRef}
        />

        <div style={{ display: "flex", justifyContent: "end" }}>
          قيد الإنشاء
          <input
            type="checkbox"
            checked={blogData.isUnderConstruction}
            onChange={() =>
              setBlogData((old) => ({
                ...old,
                isUnderConstruction: !old.isUnderConstruction,
              }))
            }
          />
        </div>
        <div style={{ display: "flex", justifyContent: "end" }}>
          مدرج
          <input
            type="checkbox"
            checked={blogData.isListed}
            onChange={() =>
              setBlogData((old) => ({ ...old, isListed: !old.isListed }))
            }
          />
        </div>
        <input type="submit" className="primary-button" value="حفظ" />
      </form>
    </div>
  );
};

export default BlogEditSubpage;
