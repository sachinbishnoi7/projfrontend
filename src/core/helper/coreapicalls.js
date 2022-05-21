import { API } from "../../backend";

export const getProducts = () => {
  return fetch(`${API}product/`, { method: "GET" })
    .then((response) => {
      return response.json();
    })

    .catch((err) => console.log(err));
}

export const getOrders = () => {
  return fetch(`${API}order/`, { method: "GET" })
    .then((response) => {
      return response.json();
    })

    .catch((err) => console.log(err));
}
