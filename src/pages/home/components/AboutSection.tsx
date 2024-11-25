export default function AboutSection() {
    return (
        <section className="min-h-[350px] max-w-[1700px] mx-auto relative xl:px-[80px] pt-166 sm:px-[40px] px-4">
            <p
                id="about-section"
                className="text-[32px] font-mono text-neutral-300  w-full    pt-5 font-semibold">
                <span className="font-mono text-emerald-500 ">01|</span>
                <span className="px-2 ">ABOUT US </span>
            </p>
            <div className="flex md:flex-row flex-col gap-4">
                <div className="mt-5 font-mono text-[20px] md:w-[60%] w-full">
                    <p>
                        Founded in 2017,{" "}
                        <span className="text-emerald-400 font-semibold uppercase ">
                            {" "}
                            CGI Studio{" "}
                        </span>
                        is a gaming company based in{" "}
                        <span className="text-emerald-400 font-semibold uppercase  ">
                            Tunisia in Menzel Temime
                        </span>
                        . Our mission is to make{" "}
                        <span className="text-emerald-400 font-semibold uppercase ">
                            amazing video games (PC, PS4, XBOX-ONE)
                        </span>{" "}
                        and teach people how to create them.
                    </p>

                    {/*    <p className="mt-5 md:block hidden">
                        We use top tools like{" "}
                        <span className="text-emerald-400 font-semibold uppercase">
                            Blender
                        </span>{" "}
                        for 3D modeling,
                        <span className="text-emerald-400 font-semibold uppercase">
                            {" "}
                            Unity
                        </span>
                        , and{" "}
                        <span className="text-emerald-400 font-semibold uppercase">
                            Unreal Engine
                        </span>{" "}
                        to develop our games. We make both 2D and 3D games,
                        always aiming for high quality and creativity.
                    </p>

                    <p className=" md:block hidden mt-5">
                        Our dream is to become the{" "}
                        <span className="text-emerald-400 font-semibold uppercase">
                            {" "}
                            number one{" "}
                        </span>
                        gaming studio in Tunisia and then in Africa. We are
                        excited about{" "}
                        <span className="text-emerald-400 font-semibold uppercase">
                            the future
                        </span>{" "}
                        and have many new projects{" "}
                        <span className="text-emerald-400 font-semibold uppercase">
                            coming up
                        </span>
                        . We believe in making games that entertain, inspire,
                        and educate.{" "}
                    </p>
                */}
                </div>
                
                <div className="xl:w-[40%] md:w-[30%] md:static absolute left-0  top-0  xl:h-[400px] h-[250px] right-0 flex items-center justify-center  ">
                    <div className="xl:w-[350px]  w-full  xl:translate-x-0 translate-x-10 relative xl:h-[350px] h-[250px]  border xl:mt-5 mt-56 md:block hidden  shadow-[0px_0px_400px_#05966988]">
                        <img
                            src="/logo.png"
                            className="object-center md:opacity-80 object-cover  md:block hidden"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
