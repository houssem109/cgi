export default function About2() {
    return (
        <section className="min-h-[350px] max-w-[1700px] mx-auto relative xl:px-[80px] pt-166 sm:px-[40px] px-4">
            <p
                id="about-section"
                className="text-[32px] font-mono text-neutral-300  w-full    pt-5 font-semibold">
                <span className="font-mono text-emerald-500 ">00|</span>
                <span className="px-2 ">Hello Moderator </span>
            </p>
            <div className="flex md:flex-row flex-col gap-4">
                <div className="mt-5 font-mono text-[20px] md:w-[60%] w-full">
                    <p>
                       {" "}
                        <span className="text-emerald-400 font-semibold uppercase ">
                            {" "}
                            As a moderator{" "}
                        </span>
                        ,you have several key responsibilities within the platform.You can{" "}
                        <span className="text-emerald-400 font-semibold uppercase  ">
                        answer questions                        </span>
                        from users, providing guidance and support where needed. Additionally, you are responsible for{" "}
                        <span className="text-emerald-400 font-semibold uppercase ">
                        verifying users registrations.
                        </span>{" "}
                        and finnaly You are responsible for {" "}
                        <span className="text-emerald-400 font-semibold uppercase ">
                        verifying  the projects
                        </span>{" "} submitted by users
                    </p>

                    
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
