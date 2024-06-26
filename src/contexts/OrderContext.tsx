import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Order } from "../type";
import { useCookies } from "react-cookie";

export const OrderContext = createContext({});

export const OrderProvider = ({ children }: any) => {
  const [orderItems, setOrderItems] = useState<Order[] | null>([]);
  const [cookies, ,] = useCookies(["access-token"]);

  useEffect(() => {
    const getOrderItems = async () => {
      try {
        const url = import.meta.env.VITE_API_ROOT + "/api/order-items";
        const headers = {
          Authorization: "Bearer " + cookies["access-token"],
        };
        const response = await axios({
          method: "GET",
          url: url,
          headers: headers,
        });
        const responseData = response.data["order_items"];
        setOrderItems(responseData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getOrderItems();
  }, [JSON.stringify(orderItems)]); // avoid reloading everytime because objects are always different.

  return (
    <OrderContext.Provider value={{ orderItems, setOrderItems }}>
      {children}
    </OrderContext.Provider>
  );
};
