import { Copyright, Mail } from "lucide-react";
import FacebookIcon from "../svg/FacebookIcon";
import InstagramIcon from "../svg/InstagramIcon";

export default function Footer() {
    return (
        <footer className="w-full  px-5 md:px0-[80px] md:text-[16px] text-[14px] flex items-center  h-[60px] border-t font-mono border-white/20 ">
            <span className="flex items-center ">
                <Copyright className="mr-2" /> CGI studio, 2024 - All rights
                reserved
            </span>
            <span className=" items-center md:flex hidden gap-3 ml-auto">
                <a
                    href="https://www.facebook.com/CGIStudio.videogames"
                    target="_blank">
                    <FacebookIcon className="scale-90 translate-x-[2px]" />
                </a>
                <InstagramIcon className="h-[26px] scale-105 w-[26px]" />
                <a href="mailto:cgistudio.contact@gmail.com">
                    <Mail className="h-[26px] w-[26px]" />
                </a>
            </span>
        </footer>
    );
}
