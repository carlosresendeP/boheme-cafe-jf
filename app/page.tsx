import Hero from "@/components/Hero";
import Essence from "@/components/Essence";
import ChefHighlights from "@/components/ChefHighlights";
import Menu from "@/components/Menu";
import Environment from "@/components/Environment";
import Gallery from "@/components/Gallery";
import CoffeeArt from "@/components/CoffeeArt";
import Reviews from "@/components/Reviews";
import Events from "@/components/Events";
import Location from "@/components/Location";
import Reservation from "@/components/Reservation";

export default function Home() {
  return (
    <div className="min-h-screen">

      <main>
        <Hero />
        <Essence />
        <ChefHighlights />
        <Menu />
        <Environment />
        <Gallery />
        <CoffeeArt />
        <Reviews />
        <Events />
        <Location />
        <Reservation />
      </main>
    </div>
  );
}
