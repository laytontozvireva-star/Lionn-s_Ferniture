import React from 'react';
import HeroSection       from '../components/ui/HeroSection';
import CategoriesSection from '../components/ui/CategoriesSection';
import FeaturedProducts  from '../components/ui/FeaturedProducts';
import WhyChooseUs       from '../components/ui/WhyChooseUs';
import CustomCTABanner   from '../components/ui/CustomCTABanner';
import Testimonials      from '../components/ui/Testimonials';
import Newsletter        from '../components/ui/Newsletter';

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <WhyChooseUs />
      <CustomCTABanner />
      <Testimonials />
      <Newsletter />
    </>
  );
}
