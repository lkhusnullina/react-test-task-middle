import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, getProductColor, getSize } from "../../services/api";
import styles from "./CartPage.module.scss";
import BackButton from "../../components/BackButton/BackButton";
import { removeProduct } from "../../store/cartSlice";

export default function CartPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchData = async() => {
      try {
        const promises = cartItems.map(async (item) => {
          try {
            const [product, color, size] = await Promise.all([
              getProduct(item.productId),
              getProductColor(item.productId, item.colorId),
              getSize(item.sizeId),
            ]);
            return { product, color, size };
          } catch (err) {
            console.error("Ошибка при получении данных товара:", err);
            return null;
          }
        });

        const results = await Promise.all(promises);
        setProducts(results.filter((item) => item !== null));
      } catch (err) {
        setError("Не удалось загрузить данные о товарах");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [cartItems]);

  const handleRemoveProduct = useCallback((productId, colorId, sizeId) => {
    dispatch(removeProduct({ productId, colorId, sizeId }));
  }, [dispatch]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <>
      <h2 className={styles.cart__title}>Корзина</h2>
      <BackButton />
      <div className={styles.cart__block}>
        {products.length > 0 ? (
          products.map(({ product, color, size }) => (
            <div
              key={`${product.id}-${color.id}-${size.id}`}
              className={styles.cart__card}>
              <img
                className={styles.cart__image}
                src={color.images[0]}
                alt={product.name}
              />
              <h3>{product.name}</h3>
              <p>Цвет: {color.name}</p>
              <p>Размер: {size.label}</p>
              <p>Цена: {color.price} ₽</p>
              <button className={styles.cart__btnRemove} onClick={() => handleRemoveProduct(product.id, color.id, size.id)}>Удалить</button>
            </div>
          ))
        ) : (
          <p>Ваша корзина пуста</p>
        )}
      </div>
    </>
  );
}
