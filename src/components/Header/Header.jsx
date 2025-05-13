import { Link } from "react-router-dom";
import styles from "../Header/Header.module.scss";
import { useSelector } from "react-redux";

function Header() {
  const count = useSelector((state) => state.cart.items);

  return (
    <header className={styles.header}>
      <Link className={styles.header__link} to="/">
        Главная
      </Link>
      <Link className={styles.header__link} to="/cart">
        <img
          className={styles.header__icon}
          src="images/cart.svg"
          alt="корзина"
        />
        {count.length}
      </Link>
    </header>
  );
}
export default Header;
