import { ReviewModel } from "@/interfaces/product.interface";
import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";

export interface ReviewProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  review: ReviewModel
}