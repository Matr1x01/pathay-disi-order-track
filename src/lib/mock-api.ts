import { useQuery } from "@tanstack/react-query";
import { mockOrders, Order } from "./tracking-data";

const fetchOrder = (query: string): Promise<Order | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const order = mockOrders[query] || null;
      resolve(order);
    }, 1200);
  });
};

export function useOrderTracking(query: string | undefined) {
  return useQuery({
    queryKey: ["order", query],
    queryFn: () => fetchOrder(query!),
    enabled: !!query,
    retry: false,
    staleTime: 30_000,
  });
}
