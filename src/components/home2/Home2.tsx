import Nav2 from "@/components/shared/Nav2";


import Footer from "@/components/shared/Footer";
import About2 from "./about2";


export default function Home2() {
    return (
        <main className="min-h-[200vh]   overflow-hidden p-0 w-full dark:bg-neutral-950 bg-white dark:bg-grid-white/5 bg-grid-black/[0.2] relative">
            <Nav2 />
            <About2 />
            <Footer />
        </main>
    );
}
