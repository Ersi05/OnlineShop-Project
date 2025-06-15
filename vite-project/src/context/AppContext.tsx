import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

type Product = {
  product: string;
  type: string;
  price: number;
};

type Contact = {
  id: number;
  name: string;
  email: string;
  message: string;
  date: string;
};

type ProductData = {
  id: number;
  img: string;
  title: string;
  description: string;
  price: string;
  tags: string[];
  rating: number;
  discount: string;
  isNew: boolean;
};

type AppContextType = {
  product: Product[];
  contacts: Contact[];
  productdata: ProductData[];
  fetchProducts: () => Promise<void>;
  fetchContacts: () => Promise<void>;
  fetchProductData: () => Promise<void>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [product, setProduct] = useState<Product[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [productdata, setProductdata] = useState<ProductData[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/productdata");
      console.log("Produktet:", response.data);
      setProduct(response.data);
    } catch (error) {
      console.error("Gabim me produktet:", error);
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/contact");
      console.log("Kontaktet:", response.data);
      setContacts(response.data);
    } catch (error) {
      console.error("Gabim me kontaktet:", error);
    }
  };

  const fetchProductData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/productdata");
      setProductdata(response.data);
    } catch (err) {
      console.error("Datat e produkteve nuk u kthyen:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchContacts();
    fetchProductData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        product,
        contacts,
        productdata,
        fetchProducts,
        fetchContacts,
        fetchProductData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  console.log(AppContext);
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
