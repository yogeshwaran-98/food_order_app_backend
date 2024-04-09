import { vendorPayload } from "./vendor.dto";
import { CustomerPayload } from "./Customer.dto";

export type AuthPayload = vendorPayload | CustomerPayload;
