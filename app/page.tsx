import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Sectors from "@/components/Sectors";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen dark:bg-black">
      <Navbar />
      <Hero />
      <Sectors />
    </div>
  );
}
