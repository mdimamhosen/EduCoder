"use client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import React from "react";

import store from "../reducer";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};
