import axios from "axios";

import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import React, { useState } from 'react';
import { Button, Rating } from "../components";
import { withLayout } from "@/layout/Layout";
import { GetStaticProps } from "next";
import { MenuItem } from "@/interfaces/menu.interface";


const inter = Inter({ subsets: ["latin"] });

const Home: React.FC<HomeProps> = ({ menu } ) => {
  const [rating, setRating] = useState<number>(4);
  return (
    <>
      <Button variant="primary">boom</Button>
      <Rating rating={rating} isEditable={true} setRating={setRating} />
      <ul>
        {menu.map((item) => <li key={ item._id.secondCategory}>{item._id.secondCategory}</li>)}
      </ul>

    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', { firstCategory });
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