import { Request, Response, NextFunction } from "express";
import { createVendorInput } from "../dto/vendor.dto";
import { Vendor } from "../models/vendor";
import { DeliveryUser } from "../models/deliveryUser";
import { Transaction } from "../models/transaction";
const bcrypt = require("bcrypt");

export const findVendor = async (id: String | undefined, email?: string) => {
  if (email) {
    return await Vendor.findOne({ email: email });
  } else {
    return await Vendor.findById(id);
  }
};

export const CreateVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    address,
    pincode,
    foodType,
    email,
    password,
    ownerName,
    phone,
  } = req.body as createVendorInput;
  const isexistingVendor = await findVendor(undefined, email);

  if (isexistingVendor !== null) {
    return res.json({ msg: "Vendor exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const createNewVendor = await Vendor.create({
    name,
    address,
    pincode,
    foodType,
    email,
    password: hashedPassword,
    ownerName,
    phone,
    rating: 0,
    serviceAvailable: false,
    coverImages: [],
    lat: 0,
    lng: 0,
  });

  return res.json(createNewVendor);
};

export const GetVendors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vendors = await Vendor.find();

  if (vendors !== null) {
    return res.json(vendors);
  }

  return res.json({ msg: "vendor does not exist" });
};

export const GetVendorByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vendorId = req.body.id;

  const vendor = await findVendor(vendorId);

  if (vendor !== null) {
    return res.json(vendor);
  }

  return res.json({ msg: "vendor does not exist" });
};

export const GetTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const transactions = await Transaction.find();
  if (transactions) {
    return res.json(transactions);
  }

  return res.json({ msg: "empty" });
};

export const GetTransactionById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const transactionId = req.body.id;

  const transaction = await Transaction.findById(transactionId);

  if (transaction !== null) {
    return res.json(transaction);
  }

  return res.json({ msg: "No transaction for this id" });
};

export const GetDeliveryUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const deliveryUsers = await DeliveryUser.find();

  if (deliveryUsers !== null) {
    return res.json(deliveryUsers);
  }

  return res.json({ msg: "No delivery users found" });
};

export const VerifyDeliveryUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { _id, status } = req.body;

  if (_id) {
    const deliveryUser = await DeliveryUser.findById(_id);

    if (deliveryUser) {
      deliveryUser.verified = status;
      const result = await deliveryUser.save();
      return res.status(200).json(result);
    }
  }

  return res.json({ msg: "No delivery user exist with this ID" });
};
