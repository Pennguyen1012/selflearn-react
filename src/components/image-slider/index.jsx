import { useState, useEffect } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./style.css";

export default function ImageSlider({ url, limit }) {
  const [images, setImages] = useState([]);
  const [currentSlider, setCurrentSlider] = useState(-1);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleLeftArrowClick() {
    setCurrentSlider(
      currentSlider === 0 ? images.length - 1 : currentSlider - 1
    );
  }

  function handleRightArrowClick() {
    setCurrentSlider(
      currentSlider === images.length - 1 ? 0 : currentSlider + 1
    );
  }

  async function fetchImages(getUrl) {
    try {
      setLoading(true);

      const res = await fetch(`${getUrl}?limit=${limit}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      const data = await res.json();

      if (data) {
        setImages(data);
        setLoading(false);
      }
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : String(e));
      setLoading(false);
    }
  }

  useEffect(() => {
    if (url !== "") fetchImages(url);
  }, [url]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errorMsg !== null) {
    return <div>Error: {errorMsg}</div>;
  }

  return (
    <div className="container">
      <BsArrowLeftCircleFill
        className="arrow arrow-left"
        onClick={handleLeftArrowClick}
      />
      {images && images.length
        ? images.map((image, index) => (
            <img
              key={image.id}
              alt={image.url}
              src={image.url}
              className={
                currentSlider === index
                  ? "current-image"
                  : "current-image hide-current-image"
              }
            />
          ))
        : null}
      <BsArrowRightCircleFill
        className="arrow arrow-right"
        onClick={handleRightArrowClick}
      />
      <span className="circle-indicators">
        {images && images.length
          ? images.map((__, index) => (
              <button
                key={index}
                className={
                  currentSlider === index
                    ? "current-indicator"
                    : "current-indicator inactive-indicator"
                }
                onClick={() => setCurrentSlider(index)}
              ></button>
            ))
          : null}
      </span>
    </div>
  );
}
