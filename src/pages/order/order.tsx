import "./order.scss";
import { ORDER_MENU_LIST } from "../../shared/constant/order";
import { Fragment, useState } from "react";

const formatNumber = (number: number) => {
  return new Intl.NumberFormat("en-PH", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};

function Order() {
  const [orderList, setOrderList] = useState<any>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const handleQuantityChange = (id: number, value: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, value),
    }));
  };

  const handleOrder = (id: number, name: string, price: number) => {
    const quantity = quantities[id] || 0;

    if (quantity <= 0) {
      alert("Please set a quantity before ordering");
      return;
    }

    setOrderList((prev: any) => {
      const existingItemIndex = prev.findIndex((item: any) => item.id === id);

      if (existingItemIndex !== -1) {
        const newList = [...prev];
        const existingItem = newList[existingItemIndex];
        newList[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + quantity,
          totalPrice: (existingItem.quantity + quantity) * price,
        };
        return newList;
      } else {
        return [
          ...prev,
          {
            id,
            name,
            price,
            quantity,
            totalPrice: price * quantity,
          },
        ];
      }
    });

    setQuantities((prev) => ({
      ...prev,
      [id]: 0,
    }));
  };

  const handleReceiptQuantityChange = (id: number, change: number) => {
    setOrderList((prev: any) => {
      const itemIndex = prev.findIndex((item: any) => item.id === id);
      if (itemIndex === -1) return prev;

      const newList = [...prev];
      const item = newList[itemIndex];
      const newQuantity = Math.max(0, item.quantity + change);

      if (newQuantity === 0) {
        return prev.filter((_: any, index: number) => index !== itemIndex);
      }

      newList[itemIndex] = {
        ...item,
        quantity: newQuantity,
        totalPrice: newQuantity * item.price,
      };

      return newList;
    });
  };

  return (
    <Fragment>
      <div className="order">
        <span className="order__title">Cozy Blend</span>
        <span className="order__menu">Menu</span>
        <div className="order__menu-list">
          {ORDER_MENU_LIST.map(({ id, name, price, description, image }) => (
            <div key={id} className="order__menu-list-item">
              <div className="order__menu-list-item-image">
                <img src={image} alt={name} loading="lazy" />
              </div>
              <span className="order__menu-list-item-title">{name}</span>
              <span className="order__menu-list-item-price-value">
                ₱{formatNumber(price)}
              </span>
              <span className="order__menu-list-item-description">
                {description}
              </span>
              <div className="order__menu-list-item-quantity">
                <button
                  onClick={() =>
                    handleQuantityChange(id, (quantities[id] || 0) - 1)
                  }
                  className="quantity-btn"
                >
                  -
                </button>
                <input
                  type="number"
                  min={0}
                  value={quantities[id] || 0}
                  onChange={(e) =>
                    handleQuantityChange(id, parseInt(e.target.value) || 0)
                  }
                />
                <button
                  onClick={() =>
                    handleQuantityChange(id, (quantities[id] || 0) + 1)
                  }
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
              <button
                className="order__menu-list-item-cart-button"
                onClick={() => handleOrder(id, name, price)}
                disabled={!quantities[id] || quantities[id] <= 0}
              >
                ORDER
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="receipt_submit">
        <span className="receipt_submit__title">Receipt</span>
        <div className="receipt_submit__list">
          {orderList.map(({ id, name, quantity, totalPrice }: any) => (
            <div key={id} className="receipt_submit__list-item">
              <div className="receipt_submit__list-item-details">
                <div className="receipt_submit__list-item-quantity">
                  <button
                    className="quantity-btn"
                    onClick={() => handleReceiptQuantityChange(id, -1)}
                  >
                    -
                  </button>
                  <span>x{quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => handleReceiptQuantityChange(id, 1)}
                  >
                    +
                  </button>
                </div>
                <span>{name}</span>
              </div>
              <span>₱{formatNumber(totalPrice)}</span>
            </div>
          ))}
        </div>
        <div className="receipt_submit__total">
          <span>Total:</span>
          <span>
            ₱
            {formatNumber(
              orderList.reduce(
                (sum: number, item: any) => sum + item.totalPrice,
                0
              )
            )}
          </span>
        </div>
        <button className="receipt_submit__button">Send Order</button>
      </div>
    </>
  );
}

export default Order;
