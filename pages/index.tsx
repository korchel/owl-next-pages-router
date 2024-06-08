import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import React, { useState } from 'react';
import { Button, Rating } from "../components";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [rating, setRating] = useState<number>(4);
  console.log(rating)
  return (
    <>
      <Button variant="primary">boom</Button>
      <Rating rating={rating} isEditable={true} setRating={setRating} />
    </>
  );
}
