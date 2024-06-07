import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import React from 'react';
import { Button } from "../components";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Button variant="primary">boom</Button>
    </>
  );
}
