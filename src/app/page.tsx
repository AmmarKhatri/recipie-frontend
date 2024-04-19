'use client'
import HomeNavBar from "@/components/homeNavBar";
import UniverseSection from "@/components/mainpageSections/UniverseSection";
import TeamSection from "@/components/mainpageSections/TeamSection";
import ServicesSection from "@/components/mainpageSections/ServicesSection";
import AboutUsSection from "@/components/mainpageSections/AboutusSection";
import ContactUsSection from "@/components/mainpageSections/ContactusSection";
export default function Home() {
      return (
        <>
        <HomeNavBar/>
          <main>
            <UniverseSection/>
            <TeamSection/>
            <ServicesSection/>
            <AboutUsSection/>
            <ContactUsSection/>
          </main>
        </>
        
      )
}
