import axios from "axios";

import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import React, { useState } from 'react';
import { Button, Input, Rating, TextArea } from "../components";
import { withLayout } from "@/layout/Layout";
import { GetStaticProps } from "next";
import { MenuItem } from "@/interfaces/menu.interface";
import { API } from "@/helpers/api";


const inter = Inter({ subsets: ["latin"] });

const Home: React.FC<HomeProps> = () => {
  const [rating, setRating] = useState<number>(4);
  return (
    <>

    </>
  );
}

export default withLayout(Home);

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