import React, { useContext, useState } from "react";
import useCart from "../../hooks/UseCart";
import { FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthProvider";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  // Calculate the total price for each item in the cart
  const calculateTotalPrice = (item) => {
    return item.price * item.quantity;
  };

  //handleIncrease
  const handleIncrease = (item) => {
    fetch(`http://localhost:6001/carts/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ quantity: item.quantity + 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          const updatedCart = cartItems.map((cartItem) => {
            if (cartItem._id === item._id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              };
            }
            return cartItem;
          });
          setCartItems(updatedCart);
        }
      });
    refetch();
  };

  //handleDecrease
  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      fetch(`http://localhost:6001/carts/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ quantity: item.quantity - 1 }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount > 0) {
            const updatedCart = cartItems.map((cartItem) => {
              if (cartItem._id === item._id) {
                return {
                  ...cartItem,
                  quantity: cartItem.quantity - 1,
                };
              }
              return cartItem;
            });
            setCartItems(updatedCart);
          }
        });
      refetch();
    } else {
      alert("Item can't be zero");
    }
  };

  //handle delete button
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:6001/carts/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              const updatedCart = cartItems.filter(
                (cartItem) => cartItem._id !== item._id
              );
              setCartItems(updatedCart);
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your item has been removed.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  // Calculate the cart subtotal
  const cartSubtotal = cart.reduce((total, item) => {
    return total + calculateTotalPrice(item);
  }, 0);

  // Calculate the order total
  const orderTotal = cartSubtotal;

  return (
    <div className="section-container">
      {/* banner  */}
      <div
        className={`max-w-screen-2xl container mx-auto xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%`}
      >
        <div className="py-12 mt-24 flex flex-col justify-center items-center gap-4">
          {/* texts  */}
          <div className="px-5 mb-12 space-y-4">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Cart Checkout <br />
              That's a <span className="text-red">FEAST</span> right there!
            </h2>
          </div>
        </div>
      </div>

      {/* tables for checkout  */}
      <div className="overflow-x-auto my-8">
        <table className="table">
          {/* head */}
          <thead className="bg-yellow text-white rounded-sm">
            <tr>
              <th>#</th>
              <th>Food</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={item.image} />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="font-medium">{item.name}</td>
                <td className="flex">
                  <button
                    className="btn btn-xs"
                    onClick={() => handleDecrease(item)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={() => console.log(item.quantity)}
                    className="w-10 mx-2 text-center overflow-hidden appearance-none"
                  />
                  <button
                    className="btn btn-xs"
                    onClick={() => handleIncrease(item)}
                  >
                    +
                  </button>
                </td>
                <td>${calculateTotalPrice(item).toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-sm border-none text-red bg-transparent"
                    onClick={() => handleDelete(item)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* customer details */}
      <div className="flex flex-col md:flex-row justify-between items-start my-8 gap-4">
        <div className="md:w-1/2 space-y-3">
          <h3 className="text-lg font-semibold">Customer Details</h3>
          <p>Name: {user?.displayName || "None"}</p>
          <p>Email: {user?.email}</p>
          <p>
            User_id: <span className="text-sm">{user?.uid}</span>
          </p>
        </div>
        <div className="md:w-1/2 space-y-3">
          <h3 className="text-lg font-semibold">Shopping Details</h3>
          <p>Total Items: {cart.length}</p>
          <p>
            Total Price: <span id="total-price">${orderTotal.toFixed(2)}</span>
          </p>
          <Link
            to="/process-checkout"
            className="btn btn-md bg-red text-white px-8 py-1"
          >
            Continue to Payment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
