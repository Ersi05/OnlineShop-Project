export interface Product {
  id: string;
  img: string;
  title: string;
  description: string;
  price: string;
  tags: string[];
  rating: number;
  discount?: string;
  isNew: boolean;
}
export const products: Product[] = [
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