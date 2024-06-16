import { ProductModel } from "@/interfaces/product.interface";
import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";

export interface ProductProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: ProductModel,
}