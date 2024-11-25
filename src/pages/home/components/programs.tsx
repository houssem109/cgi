import React from "react";
import Nav from "@/components/shared/Nav"; 
import Footer from "@/components/shared/Footer";

export default function Programs() {
    // Function to handle file download
    const handleDownload = () => {
        const fileUrl = "/path-to-your-file.pdf"; // Replace with your file's actual URL
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = "CGI_Studio_Programs.pdf"; // Set desired file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
      
        <main className="overflow-hidden p-0 w-full dark:bg-neutral-950 bg-white dark:bg-grid-white/5 bg-grid-black/[0.2] relative">

            <Nav />

         
            <section className="min-h-screen flex items-center justify-center dark:bg-neutral-950 bg-white dark:bg-grid-white/5 bg-grid-black/[0.2] text-neutral-200 py-10">
                <div className="bg-neutral-800 border border-neutral-700  p-8 rounded-lg shadow-lg w-[500px] md:w-[900px] text-center">
                    <h1 className="text-3xl font-semibold text-emerald-500 mb-5">
                        Programs
                    </h1>
                    <p className="text-neutral-300 text-sm mb-5">
                        Learn about our programs for game development and 3D animation.
                        Download the full guide or register now to join us!
                    </p>
                    <img
                        src="/logo.png" 
                        alt="About Us"
                        className="w-40 h-40 mx-auto mb-5 object-contain"
                    />
                    <div className="flex flex-col md:flex-row gap-4">
                       
                        <button
                            onClick={() => {
                                window.location.href = "/register"; 
                            }}
                            className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-md shadow-lg">
                            Register
                        </button>

                      
                        <button
                            onClick={handleDownload}
                            className="w-full py-2 bg-neutral-700 hover:bg-neutral-600 text-white font-semibold rounded-md shadow-lg">
                            Download Guide
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
       </main>
    );
}
