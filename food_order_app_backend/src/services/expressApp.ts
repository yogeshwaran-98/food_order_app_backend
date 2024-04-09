import express, { Application } from "express";
import path from "path";

import { AdminRoute, DeliveryRoute, VendorRoute } from "../routes";
import { CustomerRoute } from "../routes/customerRoute";
import { ShoppingRoute } from "../routes/shoppingRoute";

export default async (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const imagePath = path.join(__dirname, "../images");

  app.use("/images", express.static(imagePath));

  app.use("/admin", AdminRoute);
  app.use("/vendor", VendorRoute);
  app.use("/customer", CustomerRoute);
  app.use("/delivery", DeliveryRoute);
  app.use(ShoppingRoute);

  return app;
};
