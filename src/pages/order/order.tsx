import "./order.scss";
import { ORDER_MENU_LIST } from "../../shared/constant/order";
import { Fragment } from "react";
import { formatNumber } from "../../shared/util";
import useOrder from "./useOrder";
import Drawer from "../../components/drawer/drawer";

function Order() {
  const {
    handleQuantityChange,
    quantities,
    orderList,
    handleConfirmOrder,
    customerName,
    setCustomerName,
    showNameInput,
    setShowNameInput,
    isDrawerOpen,
    setIsDrawerOpen,
    total,
  } = useOrder();

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
                  disabled
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
            </div>
          ))}
        </div>
      </div>

      <button
        className="order__submit__button"
        onClick={() => setIsDrawerOpen(true)}
        disabled={total === 0}
      >
        Next {`₱${formatNumber(total)}`}
      </button>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <div className="order__drawer">
          <div className="order__drawer-header">
            <span className="order__drawer-title">Receipt</span>
            <button
              className="order__drawer-close"
              onClick={() => setIsDrawerOpen(false)}
            >
              ×
            </button>
          </div>

          <div className="order__drawer-content">
            {orderList.map(({ id, name, quantity, totalPrice }: any) => (
              <div key={id} className="order__drawer-item">
                <div className="order__drawer-item-details">
                  <div className="order__drawer-item-quantity">
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(id, quantity - 1)}
                    >
                      -
                    </button>
                    <span>x{quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(id, quantity + 1)}
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

          <div className="order__drawer-total">
            <span>Total:</span>
            <span>₱{formatNumber(total)}</span>
          </div>

          {!showNameInput ? (
            <button
              className="order__drawer-submit"
              onClick={() => setShowNameInput(true)}
            >
              Confirm Order
            </button>
          ) : (
            <div className="order__drawer-name-input">
              <input
                type="text"
                placeholder="Enter your name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="order__drawer-name-field"
                required
              />
              <button
                className="order__drawer-submit"
                onClick={handleConfirmOrder}
                disabled={!customerName.trim()}
              >
                Place Order
              </button>
            </div>
          )}
        </div>
      </Drawer>
    </Fragment>
  );
}

export default Order;
