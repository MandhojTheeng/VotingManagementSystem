import PollingStationSection from "../../components/PollingStation/PollingStationSection";
import MainFooter from "../../components/Footer/MainFooter";

export const metadata = {
  title: "Find Your Polling Station • मतदान केन्द्र खोज्नुहोस्",
  description: "Locate your nearest polling station across all 77 districts of Nepal",
};

export default function PollingStationPage() {
  return (
    <>
      <PollingStationSection />
      <MainFooter />
    </>
  );
}