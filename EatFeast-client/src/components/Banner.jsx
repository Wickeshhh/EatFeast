import React from "react";
import bannerImg from "/images/home/banner1.png";
// import { useTheme } from "../hooks/ThemeContext";

const Banner = () => {
  return (
    <div
      className={`max-w-screen-2xl container mx-auto xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%`}
    >
      <div className="py-24 flex flex-col md:flex-row-reverse justify-between items-center gap-8">
        {/* img */}
        <div className="md:w-1/2">
          <img src={bannerImg} alt="" />
          <div className="flex flex-col md:flex-row items-center justify-around -mt-14 gap-4">
            <div className="bg-white px-3 py-2 rounded-2xl flex items-center gap-3 shadow-lg w-64 ">
              <img
                src="/images/home/burger.png"
                alt=""
                className="rounded-2xl"
              />
              <div className="space-y-1">
                <h5>The Chickenator</h5>
                <div className="rating rating-sm">
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-500"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-500"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-500"
                    checked
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-400"
                    readOnly
                  />
                </div>
                <p className="text-red">₹239</p>
              </div>
            </div>
            <div className="bg-white px-3 py-2 rounded-2xl md:flex items-center gap-3 shadow-lg w-64 hidden">
              <img
                src="/images/home/b-food1.png"
                alt=""
                className="rounded-2xl"
              />
              <div className="space-y-1">
                <h5>Chicken Fried Rice</h5>
                <div className="rating rating-sm">
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-500"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-500"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-500"
                    checked
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-400"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-400"
                    readOnly
                  />
                </div>
                <p className="text-red">₹189</p>
              </div>
            </div>
          </div>
          <p className="md:text-4xl text-2xl font-semibold md:leading-snug leading-snug justify-between mt-5 text-center">
            And many more to munchhh!
          </p>
        </div>

        {/* texts  */}
        <div className="md:w-1/2 px-5 mb-24 space-y-7">
          <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
            Your Favorite Meals, Just a Click Away! <br />
            <span className="text-red">Eat, Feast, Repeat!</span>
          </h2>
          {/* <h2 className="md:text-5xl text-4xl text-red font-bold md:leading-snug leading-snug">
        Eat, Feast, Repeat!
          </h2> */}
          <p className="text-[#4A4A4A] text-xl">
            Order from your favourite restaurants and make every meal worth a
            Feast!
          </p>
          <button className="bg-red font-semibold btn text-white px-8 py-3 rounded-full">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
