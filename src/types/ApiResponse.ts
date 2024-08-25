type Product = {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
};

type Category = string[];

type ProductInCart = {
  productId: number;
  quantity: number;
};

type Cart = {
  id: number;
  userId: number;
  date: string;
  products: ProductInCart[];
}[];
