import HeroSlider from "@/components/HeroSlider";
import QuickLinks from "@/components/QuickLinks";
import FeaturedCategories from "@/components/FeaturedCategories";
import StoreFinder from "@/components/StoreFinder";
import ProductsGrid from "@/components/ProductsGrid";
import SeoContent from "@/components/SeoContent";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <QuickLinks />
      <FeaturedCategories />
      <StoreFinder />
      <ProductsGrid />
      <SeoContent />
    </>
  );
}
