import axios from "axios";
import React from 'react';
import { GetStaticProps } from "next";

import { withLayout } from "@/layout/Layout";
import { MenuItem } from "@/interfaces/menu.interface";
import { API } from "@/helpers/api";

const Search: React.FC<HomeProps> = () => {

  return (
    <>
      <p>search</p>
    </>
  );
}

export default withLayout(Search);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, { firstCategory });
  return {
    props: {
      menu,
      firstCategory
    }
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[],
  firstCategory: number,
}