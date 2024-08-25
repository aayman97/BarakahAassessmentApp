import axios, { AxiosResponse } from "axios";
import { fakeStoreApi } from "../../network/baseurl";
import { endPoints } from "../../network/endpoints";

export const getCategories = async (): Promise<AxiosResponse<Category, any> | null> => {
  try {
    const response = await axios.get(fakeStoreApi + endPoints.categories.GetAllCategories);
    return response;
  } catch (e) {
    return null;
  }
};

export const getSingleProduct = async (productID: number): Promise<AxiosResponse<Product> | null> => {
  try {
    const response = await axios.get(fakeStoreApi + endPoints.products.GetSingleProduct(productID));

    return response;
  } catch (e) {
    return null;
  }
};

export const getProducts = async (): Promise<AxiosResponse<Product[], any> | null> => {
  try {
    const response = await axios.get(fakeStoreApi + endPoints.products.GetAllProducts);
    return response;
  } catch (e) {
    return null;
  }
};

export const getCart = async (user: number): Promise<AxiosResponse<Cart, any> | null> => {
  try {
    // console.log(fakeStoreApi + endPoints.cart.GetSingleCartForUser(user));
    const response = await axios.get(fakeStoreApi + endPoints.cart.GetSingleCartForUser(user));
    return response;
  } catch (e) {
    return null;
  }
};

export const addProductToCart = async (cart: { id: number; products: ProductInCart[]; userId: number; date: string }) => {
  try {
    const response = await axios.post(fakeStoreApi + endPoints.cart.AddNewProductToTheCart, cart);
    return response;
  } catch (e) {
    return null;
  }
};
