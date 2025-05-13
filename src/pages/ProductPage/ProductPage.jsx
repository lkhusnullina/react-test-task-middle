import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct, getSizes } from "../../services/api";
import Card from "../../components/Card/Card";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [allSizes, setAllSizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [productData, sizesData] = await Promise.all([
          getProduct(id),
          getSizes(),
        ]);
        setProduct(productData);
        setSelectedColor(productData.colors[0]);
        setAllSizes(sizesData);

      } catch (err) {
        console.error("Ошибка загрузки данных:", err);
        setError(err.message || "Не удалось загрузить данные о товаре");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;
  if (!product || !selectedColor) return null;

  return (
    <div>
      <Card
        product={product}
        color={selectedColor}
        onColorChange={(color) => setSelectedColor(color)}
        allSizes={allSizes}
      />
    </div>
  );
}
