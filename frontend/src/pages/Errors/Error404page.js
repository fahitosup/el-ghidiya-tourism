import React from "react";
import "./Error404page.sass";
import { useNavigate } from "react-router-dom";

const Error404page = () => {
  const navigate = useNavigate();
  return (
    <div id="Error404-page">
      <h1>خطأ 404 - الصفحة غير موجودة</h1>
      <p>
        .عذرًا، الصفحة التي تبحث عنها غير موجودة. يرجى التحقق من الرابط أو
        استخدام خيارات البحث
      </p>
      <button className="primary-button" onClick={() => navigate("")}>
        العوده للصفحة الرئيسية
      </button>
    </div>
  );
};

export default Error404page;
