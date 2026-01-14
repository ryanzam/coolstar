import Cta from "@/components/Cta";
import Hero from "@/components/Hero";
import QuickAction from "@/components/QuickAction";
import Sectors from "@/components/Sectors";
import Services from "@/components/Services";

export default function Home() {
  return (
    <div className="min-h-screen dark:bg-black">
      <Hero />
      <Sectors />
      <Services />
      <Cta />
      <QuickAction />
    </div>
  );
}
