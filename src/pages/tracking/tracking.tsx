// import { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import "./tracking.scss";

// enum OrderStatus {
//   RECEIVED = "Order Received",
//   PREPARING = "Preparing your order",
//   READY = "Ready for pickup",
// }

function Tracking() {
  const location = useLocation();
  const { receiptId, orderList, total, orderDate, customerName } =
    location.state || {};

  // Redirect if no receipt ID (if someone tries to access directly)
  if (!receiptId) {
    return <Navigate to="/" replace />;
  }

  // const [currentStatus, setCurrentStatus] = useState<OrderStatus>(
  //   OrderStatus.RECEIVED
  // );

  // useEffect(() => {
  //   // Simulate order status updates
  //   const timer1 = setTimeout(() => {
  //     setCurrentStatus(OrderStatus.PREPARING);
  //   }, 3000);

  //   const timer2 = setTimeout(() => {
  //     setCurrentStatus(OrderStatus.READY);
  //   }, 6000);

  //   return () => {
  //     clearTimeout(timer1);
  //     clearTimeout(timer2);
  //   };
  // }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const { date, time } = formatDate(orderDate);

  return (
    <div className="tracking">
      <div className="tracking__header">
        <h1>Order #{receiptId}</h1>
        <div className="tracking__header-info">
          <p className="tracking__header-customer">Customer: {customerName}</p>
          <p className="tracking__header-datetime">
            <span>{date}</span>
            <span>{time}</span>
          </p>
        </div>
      </div>

      {/* <div className="tracking__status">
        <div
          className={`tracking__status-item ${
            currentStatus === OrderStatus.RECEIVED ? "active" : ""
          }`}
        >
          <div className="tracking__status-icon">✓</div>
          <div className="tracking__status-text">
            <h3>Order Received</h3>
            <p>We've received your order</p>
          </div>
        </div>

        <div
          className={`tracking__status-item ${
            currentStatus === OrderStatus.PREPARING ? "active" : ""
          }`}
        >
          <div className="tracking__status-icon">☕</div>
          <div className="tracking__status-text">
            <h3>Preparing</h3>
            <p>Your drinks are being prepared</p>
          </div>
        </div>

        <div
          className={`tracking__status-item ${
            currentStatus === OrderStatus.READY ? "active" : ""
          }`}
        >
          <div className="tracking__status-icon">🎉</div>
          <div className="tracking__status-text">
            <h3>Ready for Pickup</h3>
            <p>Your order is ready!</p>
          </div>
        </div>
      </div> */}

      <div className="tracking__order-summary">
        <h2>Order Summary</h2>
        {orderList.map((item: any) => (
          <div key={item.id} className="tracking__order-item">
            <span>
              x{item.quantity} {item.name}
            </span>
            <span>₱{item.totalPrice.toFixed(2)}</span>
          </div>
        ))}
        <div className="tracking__order-total">
          <span>Total</span>
          <span>₱{total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default Tracking;
