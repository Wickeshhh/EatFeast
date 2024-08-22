import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from "sweetalert2";

const Cards = ({ item }) => {
  const { name, image, price, recipe, _id } = item;
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  //add to cart
  const handleAddToCart = (item) => {
    // console.log("button clicked", item)
    if (user && user?.email) {
      const cartItem = {
        menuItemId: _id,
        name,
        quantity: 1,
        image,
        price,
        email: user.email,
      };

      fetch("http://localhost:6001/carts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          if (data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Item added to cart!",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else {
      Swal.fire({
        title: "Please login to order the food",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signup", { state: { from: location } });
        }
      });
    }
  };

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  return (
    <div
      to={`/menu/${item._id}`}
      className="card shadow-xl relative mr-5 md:my-5"
    >
      {/* <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-red ${
          isHeartFilled ? "text-rose-500" : "text-white"
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className="w-5 h-5 cursor-pointer heart-outline" />
      </div> */}
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar ${
          isHeartFilled ? "text-rose-500" : "text-white"
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart
          className="w-7 h-7 cursor-pointer"
          style={{ stroke: "black", strokeWidth: 25 }}
        />
      </div>

      <Link to={`/menu/${item._id}`}>
        <figure>
          <img
            src={item.image}
            alt="food images"
            className="hover:scale-105 transition-all duration-300 md:h-72"
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link to={`/menu/${item._id}`}>
          <h2 className="card-title">{item.name}!</h2>
        </Link>
        <p>Description of the item</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-green">$ </span> {item.price}
          </h5>
          <button
            onClick={() => handleAddToCart(item)}
            className="btn bg-yellow text-white"
          >
            Add to Cart{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
