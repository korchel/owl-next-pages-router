export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products
}

interface TopPageAdvantage {
  _id: string,
  title: string,
  description: string,
}

interface HhData {
  _id: string,
  count: number,
  juniorSalary: number,
  middleSalary: number,
  seniorSalary: number,
  updatedAt: Date,
}

export interface TopPageModel {
  hh: HhData,
  tags: string[],
  _id: string,
  firstCategory: TopLevelCategory,
  secondCategory: string,
  alias: string,
  title: string,
  category: string,
  metaTitle: string,
  metaDescription: string,
  categoryOn: string,
  createdAt:  Date,
  updatedAt: Date,
  advantages: TopPageAdvantage[],
  tagsTitle: string,
}