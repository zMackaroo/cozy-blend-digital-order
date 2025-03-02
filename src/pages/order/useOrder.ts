import { useState } from "react";
import { ORDER_MENU_LIST } from "../../shared/constant/order";
import { useNavigate } from "react-router-dom";

const receiptId = Math.random().toString(36).substring(2, 24);

function useOrder() {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [orderList, setOrderList] = useState<any>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [showNameInput, setShowNameInput] = useState(false);
  const navigate = useNavigate();

  const total = orderList.reduce(
    (sum: number, item: any) => sum + item.totalPrice,
    0
  );

  const handleQuantityChange = (id: number, value: number) => {
    const newQuantity = Math.max(0, value);
    setQuantities((prev) => ({
      ...prev,
      [id]: newQuantity,
    }));

    const menuItem = ORDER_MENU_LIST.find((item) => item.id === id);
    if (!menuItem) return;

    setOrderList((prev: any) => {
      if (newQuantity === 0) {
        return prev.filter((item: any) => item.id !== id);
      }

      const existingItemIndex = prev.findIndex((item: any) => item.id === id);
      const newItem = {
        id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: newQuantity,
        totalPrice: menuItem.price * newQuantity,
      };

      if (existingItemIndex !== -1) {
        const newList = [...prev];
        newList[existingItemIndex] = newItem;
        return newList;
      } else {
        return [...prev, newItem];
      }
    });
  };

  const handleReceiptQuantityChange = (id: number, change: number) => {
    const menuItem = ORDER_MENU_LIST.find((item) => item.id === id);
    if (!menuItem) return;

    const existingItem = orderList.find((item: any) => item.id === id);
    if (!existingItem) return;

    const newQuantity = Math.max(0, existingItem.quantity + change);
    handleQuantityChange(id, newQuantity);
  };

  const handleConfirmOrder = () => {
    if (!customerName.trim()) {
      return;
    }

    navigate("/tracking", {
      state: {
        receiptId,
        orderList,
        total,
        orderDate: new Date().toISOString(),
        customerName,
      },
    });
    setIsDrawerOpen(false);
  };

  return {
    receiptId,
    quantities,
    orderList,
    handleQuantityChange,
    handleReceiptQuantityChange,
    handleConfirmOrder,
    customerName,
    setCustomerName,
    showNameInput,
    setShowNameInput,
    isDrawerOpen,
    setIsDrawerOpen,
    total,
  };
}

export default useOrder;
