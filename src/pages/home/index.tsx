import Nav from "@/components/shared/Nav";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";

import Footer from "@/components/shared/Footer";
import ContactSection from "./components/ContactSection";

export default function Home() {
    return (
        <main className="min-h-[200vh]   overflow-hidden p-0 w-full dark:bg-neutral-950 bg-white dark:bg-grid-white/5 bg-grid-black/[0.2] relative">
            <Nav />
            <HeroSection />
            <AboutSection />
            <ContactSection />
            <Footer />
        </main>
    );
}
