import React, { useEffect, useState } from "react";
import styles from "../Card/Card.module.scss";

function Card({ product, color, onColorChange, allSizes }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSizeId, setSelectedSizeId] = useState(null);

  useEffect(() => {
    setSelectedImageIndex(0);
    setSelectedSizeId(null);
  }, [color]);

  const handleColorSelect = (newColor) => {
    onColorChange(newColor);
  };

  const handleSizeSelect = (sizeId) => {
    if (color.sizes.includes(sizeId)) {
      setSelectedSizeId(sizeId);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.card__images}>
        {color.images.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={product.name}
            className={`${styles.card__preview} ${
              selectedImageIndex === index ? styles.selected : ""
            }`}
            onClick={() => setSelectedImageIndex(index)}
          />
        ))}
      </div>

      {color.images.length > 0 && (
        <div>
          <img
            className={styles.card__image}
            src={color.images[selectedImageIndex]}
            alt={product.name}
          />
        </div>
      )}

      <div>
        <h2 className={styles.card__title}>{product.name}</h2>
        <p className={styles.card__description}>{color.description}</p>
        <p className={styles.card__price}>{color.price} ₽</p>
        <div>
          <h4>Выбор цвета:</h4>
          {product.colors.map((item) => (
            <button
              key={item.id}
              onClick={() => handleColorSelect(item)}
              className={`${styles.card__color} ${item.id === color.id ? styles.active : ""}`}>
              {item.name}
            </button>
          ))}
        </div>
        <div>
          <h4>Выбор размера:</h4>
          {allSizes.map((size) => {
            const isAvailable = color.sizes.includes(size.id);
            const isSelected = size.id === selectedSizeId;

            return (
              <button
                key={size.id}
                disabled={!isAvailable}
                onClick={() => handleSizeSelect(size.id)}
                className={`${styles.card__size} 
                ${isSelected ? styles.selected : ""} 
                ${!isAvailable ? styles.disabled : ""}`}
              >
                {size.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Card;
