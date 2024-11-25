import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SliverText } from "@/components/ui/silver-text";
import { wait } from "@/utils/time";
import Spotlight from "@/components/svg/Spotlight";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
    const navigateFunction = useNavigate();
    const animation1 = useAnimation();
    const animation2 = useAnimation();
    const animation3 = useAnimation();

    const startAnimationSequence = async () => {
        animation2.start(
            { y: 0 },
            { duration: 1.2, ease: "anticipate", mass: 3, stiffness: 5 }
        );
        animation1.start(
            { y: -100 },
            { duration: 1.2, ease: "anticipate", mass: 3, stiffness: 5 }
        );
        animation3.set({ y: 100 });

        await wait(2200);
        animation3.start({ y: 0 }, { duration: 1.2, ease: "backInOut" });
        animation2.start({ y: -100 }, { duration: 1.2, ease: "backInOut" });
        animation1.set({ y: 100 });

        await wait(2200);
        animation1.start({ y: 0 }, { duration: 1.2, ease: "backInOut" });
        animation2.set({ y: 100 });
        animation3.start({ y: -100 }, { duration: 1.2, ease: "backInOut" });
        await wait(2200);
        startAnimationSequence();
    };

    useEffect(() => {
        startAnimationSequence();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className="h-[55vh] max-w-[1700px] mx-auto ">
            <section className="xl:px-[80px]  sm:px-[50px] px-4  md:mt-28 mt-[10vh]  ">
                <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black/60 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_85%,black)]"></div>

                <Spotlight className="-top-40 -left-56"></Spotlight>
                <SliverText className="font-bold xl:w-fit text-center  w-full xl:text-[50px] md:text-[60px] text-[42px]">
                    Crafting Amazing Games,
                    <br className="md:block hidden" />
                </SliverText>
                <SliverText className="font-bold xl:w-fit text-center w-full xl:text-[50px] md:text-[60px] text-[34px]">
                    Pixel by Pixel.
                </SliverText>
                <div className="overflow-hidden md:flex w-full  flex   relative h-[80px] ">
                    <div className="sm:ml-[20%] flex-col flex xl:ml-0">
                        <p className="relative  font-bold xl:text-[50px] md:text-[50px] text-[34px] z-20 opacity-80 te bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-500">
                            We offer
                        </p>

                        <motion.div
                            className="item1 ml-[155px]  sm:ml-[180px] md:ml-[214px] line-clamp-1 flex xl:text-[50px] md:text-[50px] text-[34px]  absolute top-0 font-bold z-20 bg-clip-text text-transparent bg-gradient-to-b from-emerald-300/50 to-[#05dd99]"
                            id="item1"
                            animate={animation1}
                            initial={{ y: 0 }}>
                            Game <span className="flex xl:hidden">Dev</span>{" "}
                            <span className="hidden xl:flex ml-3 ">
                                {" "}
                                Development
                            </span>
                        </motion.div>
                        <motion.div
                            id="item2"
                            className="md:flex hidden ml-[155px] sm:ml-[180px] md:ml-[214px] line-clamp-1 xl:text-[50px] md:text-[50px] text-[34px] absolute top-0 font-bold z-20 bg-clip-text text-transparent bg-gradient-to-b    from-blue-300/50 to-[#3173ff]"
                            animate={animation2}
                            initial={{ y: 100 }}>
                            internship{" "}
                        </motion.div>

                        <motion.div
                            id="#item2"
                            className="flex ml-[155px]   md:hidden sm:ml-[180px] md:ml-[214px] line-clamp-1 xl:text-[50px] md:text-[50px] text-[34px] absolute top-0 font-bold z-20 bg-clip-text   text-transparent bg-gradient-to-b from-yellow-300/50 to-[#ffcf3f]"
                            animate={animation2}
                            initial={{ y: 200 }}>
                            training
                        </motion.div>

                        <motion.div
                            id="#item3"
                            className="md:flex hidden ml-[155px]   sm:ml-[180px] md:ml-[214px] line-clamp-1 xl:text-[50px] md:text-[50px] text-[34px] absolute top-0 font-bold z-20 bg-clip-text   text-transparent bg-gradient-to-b from-yellow-300/50 to-[#ffcf3f]"
                            animate={animation3}
                            initial={{ y: 200 }}>
                            training
                        </motion.div>

                        <motion.div
                            id="#item3"
                            className="flex md:hidden ml-[155px]   sm:ml-[180px] md:ml-[214px] line-clamp-1 xl:text-[50px] md:text-[50px] text-[34px] absolute top-0 font-bold z-20 bg-clip-text   text-transparent bg-gradient-to-b from-red-300/50 to-[#ff3f3f]"
                            animate={animation3}
                            initial={{ y: 200 }}>
                            internship
                        </motion.div>
                    </div>
                </div>
            </section>
            <section className="absolute 2xl:right-[10vw] xl:right-20 right-0     xl:top-24 xl:block hidden ">
                <img alt="" className="h-[550px]" src="/heroSvg.svg" />
            </section>
            <div className="md:px-[80px] px-5 justify-center xl:justify-start mt-8 flex gap-3">
                <Button
                    onClick={() => {
                        window.scrollTo({
                            behavior: "smooth",
                            top: 500,
                        });
                    }}
                    className="font-sans font-semibold  rounded-md  h-[45px] px-10 hover:cursor-pointer  transition-all text-[16px]"
                    variant={"outline"}>
                    About us
                </Button>
                <button
                    onClick={() => {
                        navigateFunction("/register");
                    }}
                    name="ActionBtn"
                    className=" text-neutral-200  bg-emerald-500   active:scale-100 transition-all  bg-gradient-to-tr from-emerald-600 to-emerald-700    py-2  text-[16px]  px-10 font-sans font-semibold rounded-md hover:from-neutral-300 hover:to-neutral-400 hover:text-black    shadow-[0px_0px_20px_#05966988]  ">
                    Registration
                </button>
            </div>
        </section>
    );
}
