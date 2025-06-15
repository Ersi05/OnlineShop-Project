import { Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import "./ProductList.css";
import axios from "axios";
import { useAppContext } from "../../context/AppContext";
import "./ProductList.css";
import App from "../../App";


type CartItem = {
  id: string;
  title: string;
  price: string;
  quantity: number;
  img: string;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
};

const products = [
  {
    id: "p1",
    img: "men-skin-care.jpg",
    title: "Cleanser Amino Men",
    description: "Formula me aminoacide pastron pa e tharë lëkurën.",
    price: "€24.99",
    tags: ["Pastrim i thellë", "Hidratim dhe freski", "E butë me lëkurën"],
    rating: 4.8,
    discount: "10% OFF",
    isNew: false,
  },
  {
    id: "p2",
    img: "krem.webp",
    title: "Krem Hidratues",
    description: "Krem i pasur me vitamina për fytyrë të shëndetshme.",
    price: "€19.99",
    tags: ["Hidratim", "Mbrojtje UV", "Anti-rrudhë"],
    rating: 4.6,
    isNew: false,
  },
  {
    id: "p3",
    img: "shampo.jpg",
    title: "Shampo Bimore",
    description: "Shampo pa sulfate me përbërës natyralë.",
    price: "€14.99",
    tags: ["Pa sulfate", "Fortësim flokësh", "Aromë freskuese"],
    rating: 4.2,
    discount: "15% OFF",
    isNew: false,
  },
  {
    id: "p4",
    img: "vaj.webp",
    title: "Serum për mjekër",
    description: "Rritje dhe mbushje e qimeve të mjekrës me 100% vaj natyral.",
    price: "€22.49",
    tags: ["Rritje natyrale", "Vitaminë E", "Nuk irriton lëkurën"],
    rating: 4.9,
    isNew: false,
  },
  {
    id: "p5",
    img: "naturalskincare.jpg",
    title: "Scrub Fytyre",
    description: "Eksfoliues i butë për lëkurë të freskët dhe të pastër.",
    price: "€16.99",
    tags: ["Hiq qelizat e vdekura", "Butësi", "Efekt pastrues"],
    rating: 4.5,
    isNew: true,
  },
  {
    id: "p6",
    img: "care products.jpg",
    title: "Locion Trupi",
    description: "Locion i lehtë me përbërës hidratues për lëkurë të butë.",
    price: "€12.99",
    tags: ["Lëkurë më e butë", "Aromë relaksuese", "Përditshëm"],
    rating: 4.3,
    discount: "20% OFF",
    isNew: false,
  },
  {
    id: "p7",
    img: "JeanPaul.png",
    title: "Jean Paul Gaultier Le Male",
    description:
      "Parfum ikonik me nota vanilje, nenexhik dhe lavandë për një aromë të parezistueshme dhe elegante.",
    price: "€59.99",
    tags: ["Aromë e qëndrueshme", "Për meshkuj", "Klasik modern"],
    rating: 4.9,
    isNew: true,
  },
  {
    id: "p8",
    img: "burberry.jpeg",
    title: "Burberry Hero",
    description:
      "Parfum i guximshëm dhe modern me nota druri, kedri dhe bergamoti për një stil të fuqishëm dhe të sofistikuar.",
    price: "€69.99",
    tags: ["Aromë drunore", "Stil modern", "Për meshkuj"],
    rating: 4.7,
    discount: "10% OFF",
    isNew: false,
  },
];

const filters = [
  { key: "all", label: "Të gjitha" },
  { key: "hidratim", label: "Hidratim" },
  { key: "pastrim", label: "Pastrim" },
  { key: "natyral", label: "Natyral" },
  { key: "discount", label: "Oferta" },
  { key: "parfum", label: "Parfume" },
];

export default function ProductList() {
  const { productdata } = useAppContext();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q")?.toLowerCase() || "";

  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [filteredProducts, setFilteredProducts] = useState(productdata);

  // Shopping cart state
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartAnimation, setCartAnimation] = useState("");

  //Go to CheckoutStepper
  const goToCheckout = () => {
 
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addToCart = (product: any) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prevItems,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            img: product.img,
            quantity: 1,
          },
        ];
      }
    });
    setIsCartOpen(true);
    setCartAnimation("pulse");
    setTimeout(() => setCartAnimation(""), 500);
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => {
    const itemPrice = parseFloat(item.price.replace(/[^0-9.]/g, ""));
    return sum + itemPrice * item.quantity;
  }, 0);

  useEffect(() => {
    let result = [...productdata];

    if (query) {
      result = result.filter(
        (productdata) =>
          productdata.title.toLowerCase().includes(query) ||
          productdata.description.toLowerCase().includes(query) ||
          productdata.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    if (selectedFilter !== "all") {
      if (selectedFilter === "discount") {
        result = result.filter((productdata) => productdata.discount);
      } else if (selectedFilter === "parfum") {
        result = result.filter(
          (productdata) =>
            Array.isArray(productdata.tags) &&
            productdata.tags.some((tag) => tag.includes("parfum"))
        );
      } else if (selectedFilter === "hidratim") {
        result = result.filter(
          (productdata) =>
            Array.isArray(productdata.tags) &&
            productdata.tags.some((tag) =>
              tag.toLowerCase().includes("hidratim")
            )
        );
      } else if (selectedFilter === "natyral") {
        result = result.filter(
          (productdata) =>
            Array.isArray(productdata.tags) &&
            productdata.tags.some((tag) =>
              tag.toLowerCase().includes("natyral")
            )
        );
      } else if (selectedFilter === "pastrim") {
        result = result.filter(
          (productdata) =>
            Array.isArray(productdata.tags) &&
            productdata.tags.some((tag) =>
              tag.toLowerCase().includes("pastrim")
            )
        );
      }
    }

    if (sortOption === "price-low") {
      result.sort(
        (a, b) =>
          parseFloat(a.price.replace(/[^0-9.]/g, "")) -
          parseFloat(b.price.replace(/[^0-9.]/g, ""))
      );
    } else if (sortOption === "price-high") {
      result.sort(
        (a, b) =>
          parseFloat(b.price.replace(/[^0-9.]/g, "")) -
          parseFloat(a.price.replace(/[^0-9.]/g, ""))
      );
    } else if (sortOption === "rating") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    setFilteredProducts(result);
  }, [query, selectedFilter, sortOption]);

  return (
    <div className="product-list-container">
      {/* Header with cart icon */}
      <div className="cart-header">
        <button
          onClick={() => setIsCartOpen(!isCartOpen)}
          className={`cart-button ${cartAnimation || "normal"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </button>
      </div>

      {/* Cart Drawer */}
      {isCartOpen && (
        <>
          <div className="cart-drawer">
            <div className="cart-header-section">
              <h2 className="cart-title">Shporta ({totalItems})</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="close-cart-button"
              >
                ×
              </button>
            </div>

            <div className="cart-items-container">
              {cartItems.length === 0 ? (
                <div className="empty-cart">
                  <div className="empty-cart-icon">🛒</div>
                  <p>Shporta juaj është bosh</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.img} alt={item.title} className="cart-item-image" />
                    <div className="cart-item-details">
                      <h4>{item.title}</h4>
                      <div>{item.price}</div>
                    </div>
                    <div className="cart-item-actions">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      <button onClick={() => removeFromCart(item.id)}>×</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total">
                  <span>Totali:</span>
                  <strong>€{totalPrice.toFixed(2)}</strong>
                </div>
                <div className="cart-actions">
                  <button onClick={clearCart} className="clear-cart-button">
                    Pastro
                  </button>
                  <a href="/checkout" className="checkout-button">Vazhdo në Arkë</a>
                </div>
              </div>
            )}
          </div>
          <div className="cart-overlay" onClick={() => setIsCartOpen(false)} />
        </>
      )}

      {/* Search Results */}
      {query && (
        <div className="search-results-heading">
          <h2>
            Rezultatet e kërkimit për: <span>{query}</span>
          </h2>
        </div>
      )}

      {/* Filters & Sort */}
      <div className="filter-sort-container">
        <div className="filter-buttons">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setSelectedFilter(filter.key)}
              className={`filter-button ${
                selectedFilter === filter.key ? "active" : "inactive"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className="sort-container">
          <label>Rendit sipas:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Parazgjedhur</option>
            <option value="price-low">Çmimi: I ulët - I lartë</option>
            <option value="price-high">Çmimi: I lartë - I ulët</option>
            <option value="rating">Vlerësimi</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={() => addToCart(product)}
            />
          ))
        ) : (
          <div className="no-products-found">
            <p>Nuk u gjet asnjë produkt për: <strong>{query}</strong></p>
            <button onClick={() => {
              setSelectedFilter("all");
              setSortOption("default");
            }}>
              Reset Filtrave
            </button>
          </div>
        )}
      </div>

      {/* Product count */}
      {filteredProducts.length > 0 && (
        <div className="product-count">
          Duke shfaqur {filteredProducts.length} produkte nga{" "}
          {productdata.length}
        </div>
      )}
      <div className="product-count">
        Duke shfaqur {filteredProducts.length} produkte nga {products.length}
      </div>
    </div>
  );
}
