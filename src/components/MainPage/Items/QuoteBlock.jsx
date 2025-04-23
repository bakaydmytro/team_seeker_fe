import { useState, useEffect } from "react";
import "./QuoteBlock.css";
import Quote1 from "../../../img/Quote1.png";
import Quote2 from "../../../img/Quote2.png";
import Quote3 from "../../../img/Quote3.png";

const images = [Quote1, Quote2, Quote3];

export default function QuoteBlock() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPaused, currentIndex]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section
      className="quote-image-section"
    >
      <div className="image-container">
        {images.map((img, index) => (
          <img
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            key={index}
            src={img}
            className={`image ${index === currentIndex ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
            style={{
              opacity: index === currentIndex ? 1 : 0,
            }}
          />
        ))}
      </div>
      <div className="scroll-circles-block">
        {images.map((_, index) => (
          <span
            key={index}
            className={`scroll-circles ${index === currentIndex ? "circle-active" : ""}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </section>
  );
}
