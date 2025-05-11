import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct, getSizes } from "../../services/api";
import Card from "../../components/Card/Card";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [allSizes, setAllSizes] = useState([]);

  useEffect(() => {
    getProduct(id).then((data) => {
      setProduct(data);
      setSelectedColor(data.colors[0]);
    });
    getSizes().then(setAllSizes);
  }, [id]);

  if (!product || !selectedColor) return <div>Загрузка...</div>;

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
