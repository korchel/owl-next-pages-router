import BooksIcon from './icons/books.svg';
import CoursesIcon from './icons/courses.svg';
import ServicesIcon from './icons/services.svg';
import ProductsIcon from './icons/products.svg';
import { TopLevelCategory } from "@/interfaces/page.interface";
import { FirstLevelMenuItem } from "@/interfaces/menu.interface";


export const firstLevelMenu: FirstLevelMenuItem[] = [
  {
    route: 'courses',
    name: 'Курсы',
    icon: <CoursesIcon />,
    id: TopLevelCategory.Courses,
  },
  {
    route: 'books',
    name: 'Книги',
    icon: <BooksIcon />,
    id: TopLevelCategory.Books,
  },
  {
    route: 'services',
    name: 'Сервисы',
    icon: <ServicesIcon />,
    id: TopLevelCategory.Services,
  },
  { 
    route: 'products',
    name: 'Товары',
    icon: <ProductsIcon />,
    id: TopLevelCategory.Products,
  },
];

export const priceToRu = (price: number) => new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price);

export const getDeclination = (number: number, words: [string, string, string]): string => {
	const cases = [2, 0, 1, 1, 1, 2];
  if ((number % 100 > 4) && (number % 100 < 20)) {
    return words[2];
  }
  if (number % 10 < 5) {
    return words[cases[number % 10]];
  }
  return words[cases[5]];
};