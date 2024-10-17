"use client";
import RenderCartCourses from "@/components/Dashboard/Cart/RenderCartCourses";
import RenderTotalAmount from "@/components/Dashboard/Cart/RenderTotalAmount";
import { RootState } from "@/redux/reducer";
import React from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const { total, totalItems } = useSelector((state: RootState) => state.cart);
  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-gray-300">Cart</h1>
      <p className="border-b border-b-gray-600 pb-2 font-semibold text-gray-400">
        {totalItems} Courses in Cart
      </p>
      {total > 0 ? (
        <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <p className="mt-14 text-center text-3xl text-gray-300">
          Your cart is empty
        </p>
      )}
    </>
  );
};

export default Cart;
