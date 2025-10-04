import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    const totalCost = cart.reduce((accumulator, item) => {
      const itemCost = parseFloat(item.cost.replace('$', '')) || 0;
      const itemQuantity = item.quantity || 1; //default for 1 if quantity is not provided
      return accumulator + itemCost * itemQuantity;
    }, 0); //Starts with an initial accumulator value of 0
    return totalCost;
  };

  const handleContinueShopping = (e) => {
    alert('Functionality to be added at a later date!');
  };



  const handleIncrement = (item) => {
    dispatch(updateQuantity({name: item.name, quantity: (item.quantity || 1) + 1}));
  };

  const handleDecrement = (item) => {
    if(item.quantity >1){
      dispatch(updateQuantity({name: item.name, quantity: (item.quantity || 1) - 1}));
    } else if(item.quantity - 1 === 0){
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const itemCost = parseFloat(item.cost.replace('$', '')) || 0;
    const itemQuantity = item.quantity;
    const itemTotalCost = itemCost * itemQuantity;

    return itemTotalCost;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


