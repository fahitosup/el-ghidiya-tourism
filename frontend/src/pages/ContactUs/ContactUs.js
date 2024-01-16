import React, { useState } from "react";
import "./ContactUs.sass";
import "./ContactUs.sass";
import SEO from "../../components/SEO/SEO";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ContactUs = () => {
  const [contactInfo, setContactInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    message: "",
  });

  const changeInp = (e) => {
    setContactInfo((old) => ({ ...old, [e.target.name]: e.target.value }));
  };
  const axios = useAxiosPublic();

  return (
    <div id="contact-us-page">
      <SEO title="اتصل بنا - الغدية" />

      <div className="contact-us-container">
        <h1 className="heading">اتصل بنا</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            axios.post("accounts/contact/", contactInfo);
          }}
        >
          <div className="fields">
            <div className="field">
              <label htmlFor="second-name">الاسم الأخير:</label>
              <input
                onChange={changeInp}
                value={contactInfo.last_name}
                name="last_name"
                tabIndex={2}
                id="second-name"
                className="text input"
              />
            </div>
            <div className="field">
              <label htmlFor="first-name">الاسم الأول:</label>
              <input
                name="first_name"
                onChange={changeInp}
                value={contactInfo.first_name}
                tabIndex={1}
                id="first-name"
                className="text input"
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="email">البريد الإلكتروني:</label>
            <input
              name="email"
              id="email"
              onChange={changeInp}
              value={contactInfo.email}
              className="text input"
            />
          </div>

          <div className="message-submit">
            <label htmlFor="message">الرسالة:</label>
            <textarea
              id="message"
              placeholder="اكتب هنا..."
              name="message"
              value={contactInfo.message}
              onChange={changeInp}
              className="text"
            />
            <button type="submit" className="find-more">
              إرسال
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
