import { DetailedHTMLProps, HtmlHTMLAttributes, ReactNode } from "react";

export interface CardProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  color?: 'white' | 'lilac';
  children: ReactNode;
}