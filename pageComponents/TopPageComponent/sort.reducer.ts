import { SortEnum } from "@/components/Sort/Sort.props";
import { ProductModel } from "@/interfaces/product.interface";

export type SortAction = { type: SortEnum };

export interface sortState {
  sort: SortEnum;
  products: ProductModel[];
}

export const sortReducer = (state: sortState, action: SortAction): sortState => {
  switch (action.type) {
    case SortEnum.Rating:
      return {
        sort: SortEnum.Rating,
        products: state.products.sort((a, b) => a.initialRating > b.initialRating ? -1 : 1),
      };
    case SortEnum.Price:
      return {
        sort: SortEnum.Price,
        products: state.products.sort((a, b) => a.price > b.price ? 1 : -1),
      };
    default:
      throw new Error('wrong sort');
  }
};