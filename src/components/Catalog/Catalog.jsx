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
          {product.colors?.[0]?.images?.[0] && (
            <Link
              to={`/product/${product.id}`}
              className={styles.products__link}
            >
              <img
                src={`${process.env.PUBLIC_URL}${product.colors[0].images[0]}`}
                alt={product.name}
                className={styles.products__image}
              />
            </Link>
          )}
          <h3 className={styles.products__name}>{product.name}</h3>
        </div>
      ))}
    </div>
  );
}
export default Catalog;
