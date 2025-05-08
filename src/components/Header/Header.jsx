import { Link } from "react-router-dom";
import styles from "../Header/Header.module.scss";

function Header() {
  return (
    <header className={styles.header}>
        <Link className={styles.header__link} to="/">Главная</Link> 
        <Link className={styles.header__link} to="/cart">Корзина</Link> 
    </header>
  );
}
export default Header;
