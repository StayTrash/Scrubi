"use client"
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Features from "./_components/Features";
import Footer from "./_components/Footer";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect } from "react";

export default function Home() {

  const {user}=useKindeBrowserClient();

  useEffect(()=>{
    console.log("--",user)
  },[user])
  return (
    <div className="min-h-screen">
      <Header/>
      <Hero/>
      <Features/>
      <Footer/>
    </div>
  );
}
