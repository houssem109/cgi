import { cn } from "@/lib/utils";
import { useRef } from "react";

type Props = {
  icon: any;
  link?: string;
  content: string;
};
export default function ContactCard(props: Props) {
  const Icon = props.icon;
  const cardRef = useRef<HTMLAnchorElement>(null);
  //  const navigate = useNavigate();

  const handleMouseMove = (e: any) => {
    const boundingRect = cardRef.current?.getBoundingClientRect();
    if (!boundingRect) return;

    const x = e.clientX - boundingRect?.x;
    const y = e.clientY - boundingRect?.y;
    document.documentElement.style.setProperty("--gradient-card-x", `${x}px`);
    document.documentElement.style.setProperty("--gradient-card-y", `${y}px`);
  };
  const handleMouseLeave = () => {
    cardRef.current?.classList.remove("gradient-card");
  };
  const handleMouseEnter = () => {
    cardRef.current?.classList.add("gradient-card");
  };

  return (
    <a
      href={props.link}
      target="_blank"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      ref={cardRef}
      className="border mobile-gradient-card h-44 w-full md:h-auto border-white/10 rounded flex items-center bg-[#111111] shadow-[0px_0px_50px_#4b4b4b22] justify-center  "
    >
      <p className="flex md:text-[24px] text-[20px] items-center font-bold gap-2">
        <Icon
          className={cn("w-[40px] h-[40px]", {
            "md:block hidden": props.link?.startsWith("mailto:"),
          })}
        />
        <span className="">{props.content}</span>
      </p>
    </a>
  );
}
