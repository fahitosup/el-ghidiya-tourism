import { useNavigate } from "react-router-dom";

const UnderConstruction = () => {
  const navigate = useNavigate();
  return (
    <div id="under-construction">
      <h1>هذه المقالة هي قيد الإنشاء</h1>
      <p>هذا المقال غير متوفر حاليا. يرجى التحقق مرة أخرى في وقت لاحق.</p>
      <button className="primary-button" onClick={() => navigate("/")}>
        العوده للصفحة الرئيسية
      </button>
    </div>
  );
};

export default UnderConstruction;
