import { useState } from "react";
import "./ProductCard.css";

type ProductCardProps = {
  id: number;
  img: string;
  title: string;
  description: string;
  price: string;
  tags: string[];
  discount?: string;
  rating?: number;
  isNew?: boolean;
  onAddToCart: () => void;
};

export default function ProductCard({
  img,
  title,
  description,
  price,
  tags,
  discount,
  rating = 4.5,
  isNew,
  onAddToCart,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isImgHovered, setIsImgHovered] = useState(false);
  const [isBtnHovered, setIsBtnHovered] = useState(false);
  const [btnAnimation, setBtnAnimation] = useState("");

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`star-${i}`} className="star-full">
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half-star" className="star-full">
          ★
        </span>
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="star-empty">
          ★
        </span>
      );
    }

    return (
      <div className="star-wrapper">
        {stars}
        <span className="star-rating">({rating.toFixed(1)})</span>
      </div>
    );
  };

  const handleAddToCart = () => {
    onAddToCart();
    setBtnAnimation("added");
    setTimeout(() => setBtnAnimation(""), 1000);
  };

  return (
    <div
      className={`product-card ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-accent" />

      {discount && <div className="discount-badge">{discount}</div>}

      <div className="image-container">
        <img
          src={img}
          alt={title}
          className={`product-image ${isImgHovered ? "hovered" : ""}`}
          onMouseEnter={() => setIsImgHovered(true)}
          onMouseLeave={() => setIsImgHovered(false)}
        />
        {isNew && <span className="new-badge">NEW</span>}
      </div>

      <div className="card-content">
        <h3 className="product-title">{title}</h3>
        {renderStars(rating)}
        <p className="product-description">{description}</p>

        <div className="tag-box">
          <ul>
            {tags.slice(0, 3).map((tag, i) => (
              <li key={i}>
                <span className="tag-check">✓</span> {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="price-section">
        <div className="price-label">
          <span>Çmimi</span>
          <div>
            {discount && (
              <span className="price-old">
                {parseFloat(price.replace(/[^0-9.]/g, "")) * 1.2}€
              </span>
            )}
            <span className={`price-current ${discount ? "discount" : ""}`}>
              {price}
            </span>
          </div>
        </div>

        <button
          className={`add-to-cart-btn ${
            btnAnimation === "added" ? "added" : ""
          } ${isBtnHovered ? "btn-hover" : ""}`}
          onMouseEnter={() => setIsBtnHovered(true)}
          onMouseLeave={() => setIsBtnHovered(false)}
          onClick={handleAddToCart}
        >
          {btnAnimation === "added" ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Shtuar në shportë!
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              Shto në shportë
            </>
          )}
        </button>
      </div>
    </div>
  );
}
