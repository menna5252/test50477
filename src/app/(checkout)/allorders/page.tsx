"use server";

import { getUserOrders } from "@/app/apis/ordersApi";
import { IOrderInterface } from "@/app/interfaces/orderInterface"
import Image from "next/image";

interface OrdersResponse {
  data: IOrderInterface[];
}

export default async function OrdersPage() {
  const response = await getUserOrders();
  const orders: OrdersResponse = response
    ? { data: response.data as IOrderInterface[] }
    : { data: [] };
  console.log(orders);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Orders</h1>
      <div className="space-y-6">
        {orders.data.map((order: IOrderInterface) => (
          <div key={order._id} className="border p-4 rounded-lg shadow">
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Total:</strong> ${order.totalOrderPrice}</p>
            <p><strong>Payment:</strong> {order.paymentMethodType}</p>
            <p><strong>Paid:</strong> {order.isPaid ? "✅" : "❌"}</p>
            <p><strong>Delivered:</strong> {order.isDelivered ? "✅" : "❌"}</p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>

            <div className="mt-2">
              <h3 className="font-semibold">Shipping Info:</h3>
              <p><strong>Name:</strong> {order.user?.name || "N/A"}</p>
              <p><strong>Address:</strong> {order.shippingAddress?.details}, {order.shippingAddress?.city}</p>
              <p><strong>Phone:</strong> {order.shippingAddress?.phone}</p>
            </div>

            <h3 className="mt-2 font-semibold">Items:</h3>
            <ul className="space-y-2">
              {order.cartItems.map((item) => (
                <li key={item.product._id} className="flex gap-4 items-center">
                  <Image
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p>{item.product.title}</p>
                    <p>{item.count} × {item.price} EGP</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
