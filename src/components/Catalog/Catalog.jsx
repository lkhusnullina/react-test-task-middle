import { useEffect, useState } from "react";
import { getProducts } from "../../services/api";
import styles from "../Catalog/Catalog.module.scss";
import { Link } from "react-router-dom";

function Catalog() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });
  }, []);


  return (
    <div className={styles.products}>
      {products.map((product) => (
        <div key={product.id} className={styles.products__card}>
          <h4 className={styles.products__name}>{products.name}</h4>
          <Link to={`/product/${product.id}`} className={styles.products__link}>
              <img
                src={product.colors[0].images[0]}
                alt={product.name}
                className={styles.products__image}
              />
            </Link>
        </div>
      ))}
    </div>
  );
}
export default Catalog