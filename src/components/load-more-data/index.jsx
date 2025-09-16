import { useEffect, useState } from "react";
import "./style.css";

export default function LoadMoreData() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [countExpand, setCountExpand] = useState(0);
  const [disableButton, setDisableButton] = useState(false);
  const productPerExpand = 20;

  async function fetchProducts() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=${productPerExpand}&skip=${
          countExpand === 0 ? 0 : countExpand * productPerExpand
        }`
      );

      const data = await response.json();
      console.log(data);

      if (data && data.products && data.products.length) {
        setProducts((prevData) => {
          const newProducts = [...prevData, ...data.products];
          const unique = newProducts.filter(
            (item, index, self) =>
              index === self.findIndex((p) => p.id === item.id)
          );
          setProducts(unique);
        });
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [countExpand]);

  useEffect(() => {
    if (products && products.length === 180) {
      setDisableButton(true);
    }
  }, [products]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="load-more-container">
      <div className="product-container">
        {products && products.length
          ? products.map((item) => (
              <div key={item.id} className="product">
                <img src={item.thumbnail} alt={item.title} />
                <p>{item.title}</p>
                <button className="buy-button">Buy Now</button>
              </div>
            ))
          : null}
      </div>
      <div className="load-more-button">
        <button
          disabled={disableButton}
          onClick={() => setCountExpand(countExpand + 1)}
        >
          Load More Products
        </button>
        {disableButton ? (
          <p>You have reached the bottom of the product list</p>
        ) : null}
      </div>
    </div>
  );
}
