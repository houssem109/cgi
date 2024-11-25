import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type Props = {} & HTMLAttributes<HTMLParagraphElement>;
export function SliverText({ className, children, ...props }: Props) {
  return (
    <div
      {...props}
      className={cn(
        " relative font-bold  z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-500",
        className
      )}
    >
      {children}
    </div>
  );
}
