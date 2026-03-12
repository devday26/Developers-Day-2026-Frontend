import { Hero } from "@/components/hero";
import { AboutUs } from "@/components/about";
import { ModuleCategories } from "@/components/modules";
import { ReconLogs } from "@/components/recon";
import { Testimonials } from "@/components/testimonials";
import { RegistrationBanner } from "@/components/registration";
import CampusReservationMap from "@/components/campusReservationMap";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutUs />
      <ModuleCategories />
      {/* <CampusReservationMap /> */}
      <ReconLogs />
      <Testimonials />
      <RegistrationBanner />
    </>
  );
}
