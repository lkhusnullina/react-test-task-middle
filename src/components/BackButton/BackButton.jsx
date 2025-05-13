import { useNavigate } from "react-router-dom";
import styles from "./BackButton.module.scss";

function BackButton({ to = "/" }) {
  const navigate = useNavigate();

  return (
    <button className={styles.btnBack} onClick={() => navigate(to)}>
      Назад
    </button>
  );
}

export default BackButton;
