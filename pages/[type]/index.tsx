import axios from "axios";

import { Inter } from "next/font/google";
import React from 'react';
import { withLayout } from "@/layout/Layout";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { MenuItem } from "@/interfaces/menu.interface";
import { firstLevelMenu } from "@/helpers/helpers";
import { ParsedUrlQuery } from "querystring";
import { API } from "@/helpers/api";


const inter = Inter({ subsets: ["latin"] });

const Type: React.FC<TypeProps> = ({ firstCategory }) => {

  return (
    <>
      <p>type {firstCategory}</p>
    </>
  );
}

export default withLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {

  return {
    paths: firstLevelMenu.map((item) => '/' + item.route),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<TypeProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return { notFound: true };
  }
  const firstCategoryItem = firstLevelMenu.find((item) => item.route === params.type);
  if (!firstCategoryItem) {
    return { notFound: true };
  }
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, { firstCategory: firstCategoryItem.id });
  return {
    props: {
      menu,
      firstCategory: firstCategoryItem.id
    }
  };
};

interface TypeProps extends Record<string, unknown> {
  menu: MenuItem[],
  firstCategory: number,
}