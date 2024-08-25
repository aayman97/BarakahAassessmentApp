export const endPoints = {
  products: {
    GetAllProducts: "products",
    LimitResult: (limit: number) => {
      return `products?limit=${limit}`;
    },
    GetSingleProduct: (productId: number) => {
      return `products/${productId}`;
    },
  },
  categories: {
    GetAllCategories: "products/categories",
  },
  cart: {
    GetSingleCartForUser: (user: number) => {
      return `carts/user/${user}`;
    },
    AddNewProductToTheCart: "carts/",
    UpdateProductInTheCart: (productID: number) => {
      return `carts/${productID}`;
    },
    DeleteProductFromTheCart: (productID: string) => {
      return `carts/${productID}`;
    },
  },
};
