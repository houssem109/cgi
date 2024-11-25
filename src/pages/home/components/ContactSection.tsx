import FacebookIcon from "@/components/svg/FacebookIcon";
import WorldMap from "@/components/svg/WorldMap";
import { Mail, Phone } from "lucide-react";
import ContactCard from "./ContactCard";
import ContactForm from "./ContactForm";

export default function ContactSection() {
    return (
        <section className="mx-auto max-w-[1700px] min-h-[500px] mt-5">
            <section className=" md:px-[80px] px-5">
                <p className="text-[28px] font-mono text-neutral-300  w-full    pt-5 font-semibold">
                    <span className="font-mono text-emerald-500 ">02|</span>
                    <span className="px-2 ">CONTACT US</span>
                </p>
            </section>
            <section className=" md:grid-cols-3 grid-cols-1 grid gap-5 min-h-[250px] md:px-[80px] px-5   mt-10">
                <ContactCard
                    content="CGI STUDIO"
                    link="https://www.facebook.com/CGIStudio.videogames"
                    icon={FacebookIcon}
                />
                <ContactCard content="52 534 735" icon={Phone} />
                <ContactCard
                    content="cgistudio.contact@gmail.com"
                    link="mailto:cgistudio.contact@gmail.com"
                    icon={Mail}
                />
            </section>

            {/* contact form */}
            <section className="flex relative md:px-[80px]  px-5 gap-5  mt-20">
                <div className="md:w-1/2 md:mr-10 hidden md:block">
                    <WorldMap />
                </div>
                <ContactForm />
            </section>
        </section>
    );
}
