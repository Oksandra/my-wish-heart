import blouse1 from "@/assets/blouse-1.jpg";
import blouse2 from "@/assets/blouse-2.jpg";
import blouse3 from "@/assets/blouse-3.jpg";
import blouse4 from "@/assets/blouse-4.jpg";

export type WishlistStatus = "available" | "size_unavailable" | "out_of_stock";

export type WishlistItem = {
  id: string;
  title: string;
  image: string;
  price: number;
  oldPrice?: number;
  size?: string;
  rating?: number;
  reviews?: number;
  delivery?: string;
  status: WishlistStatus;
  addedAt: string;
};

export const wishlistItems: WishlistItem[] = [
  {
    id: "1",
    title: "Блузка 2026-068-06",
    image: blouse1,
    price: 7994,
    oldPrice: 24538,
    size: "46",
    delivery: "26 – 28 августа",
    status: "available",
    addedAt: "2026-08-13T18:20:00Z",
  },
  {
    id: "2",
    title: "Блузка 2026-031-04",
    image: blouse2,
    price: 6253,
    oldPrice: 19101,
    size: "48",
    rating: 4.9,
    reviews: 12,
    delivery: "26 – 28 августа",
    status: "available",
    addedAt: "2026-08-13T15:02:00Z",
  },
  {
    id: "3",
    title: "Блузка 2026-090-05",
    image: blouse3,
    price: 7215,
    oldPrice: 22148,
    size: "44",
    status: "size_unavailable",
    addedAt: "2026-08-12T11:40:00Z",
  },
  {
    id: "4",
    title: "Блузка Шейла",
    image: blouse4,
    price: 2356,
    oldPrice: 2771,
    size: "S",
    rating: 5,
    reviews: 2,
    delivery: "8 – 10 сентября",
    status: "available",
    addedAt: "2026-08-11T09:10:00Z",
  },
  {
    id: "5",
    title: "Блузка офисная с короткими рукавами фонариками атлас",
    image: blouse1,
    price: 339,
    oldPrice: 1462,
    size: "42",
    delivery: "5 – 7 сентября",
    status: "available",
    addedAt: "2026-08-10T20:05:00Z",
  },
  {
    id: "6",
    title: "Блузка из трикотажа с крэш-эффектом",
    image: blouse4,
    price: 1346,
    oldPrice: 3366,
    size: "50",
    rating: 5,
    reviews: 2,
    status: "size_unavailable",
    addedAt: "2026-08-09T14:33:00Z",
  },
  {
    id: "7",
    title: "Блуза умягченный лен 100%",
    image: blouse2,
    price: 1936,
    oldPrice: 2198,
    size: "46",
    rating: 4.8,
    reviews: 4,
    status: "out_of_stock",
    addedAt: "2026-08-08T08:15:00Z",
  },
  {
    id: "8",
    title: "Блузка рубашка с вышивкой умягченный лен 100%",
    image: blouse3,
    price: 2602,
    oldPrice: 4788,
    size: "48",
    rating: 4.9,
    reviews: 4,
    status: "out_of_stock",
    addedAt: "2026-08-07T12:00:00Z",
  },
];
