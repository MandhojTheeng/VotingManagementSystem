import HeroSection from "../components/Hero/HeroSection";
import FeaturesSection from "../components/Features/FeaturesSection";
import MainFooter from "../components/Footer/MainFooter";
import FAQSection from "../components/FAQ/FAQSection";
import DemocracyHistorySection from "../components/Democracy/DemocracyHistorySection";
import ContactSection from "../components/Contact/ContactSection";
import PollingStationSection from "../components/PollingStation/PollingStationSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <DemocracyHistorySection />
      <FAQSection />
      <PollingStationSection />
      <ContactSection />
      <MainFooter />
    </>
  );
}