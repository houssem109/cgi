import { useNavigate } from "react-router-dom";
import Footer from "../shared/Footer";
import Nav from "../shared/Nav";
import { SliverText } from "../ui/silver-text";
import GameCard from "./ProjectCard";
import { useEffect, useState } from "react";
import { auth } from "@/firebaseConfig"; // Adjust the path to your firebase config
import { onAuthStateChanged } from "firebase/auth";

const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true); // User is logged in
      } else {
        setIsLoggedIn(false); // User is not logged in
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const projects = [
    {
      title: "Apex Legends",
      description: "A battle royale game where players fight for survival.",
      releaseDate: "5 Nov 2020",
      categories: [
        'Free-to-play',
        'Battle Royale',
        'Multiplayer',
        'FPS',
        '1st Person',
        'PvP',
        'Action',
        'Tactical',
        'Science Fiction',
        'Survival',
        'Looting',
        'Customizable Characters',
        'Co-op',
        'Humor',
        'Rich Universe'
      ],
      installationLink: "https://www.ea.com/games/apex-legends",
      photos: [
        'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1172470/ffbb3e6e82ceb4b3fa219d2e207c98b566a0a33e/capsule_616x353.jpg?t=1730895196',
        'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1172470/ss_6be87726df49a188a6d4bb9d712191b5547e8c9d.600x338.jpg?t=1730895196',
        'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1172470/ss_fab213cdd1f3d8699087b92b72057a96ad868726.600x338.jpg?t=1730895196',
        'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1172470/ss_677940d4d4bd5f3d7bc2cca36f73785a98f2298c.600x338.jpg?t=1730895196'
      ]
    },
    // Add more projects here as needed
  ];

  return (
    <main className="overflow-hidden p-0 w-full dark:bg-neutral-950 bg-white dark:bg-grid-white/5 bg-grid-black/[0.2] relative">
      <Nav />
      <div className="max-w-[1700px] mx-auto relative mb-10 pt-5 xl:px-[80px] mt-0 sm:px-[40px] px-4 min-h-[calc(100vh-60px)] flex flex-col h-full">
        <div className="flex items-center justify-between p-4">
          <SliverText className="text-4xl font-bold">Projects</SliverText>
          
          {/* Conditionally render the Add Project button */}
          {isLoggedIn && (
            <button
              onClick={() => {
                navigate("/projetpage/add");
              }}
              className="text-neutral-200 bg-emerald-500 active:scale-100 transition-all bg-gradient-to-tr from-emerald-600 to-emerald-700 py-2 text-[16px] px-10 font-sans font-semibold rounded-md hover:from-neutral-300 hover:to-neutral-400 hover:text-black shadow-[0px_0px_20px_#05966988]"
            >
              Add Project
            </button>
          )}
        </div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <GameCard
              key={index}
              title={project.title}
              description={project.description}
              releaseDate={project.releaseDate}
              categories={project.categories}
              installationLink={project.installationLink}
              photos={project.photos} // Passing the array of photos here
            />
          ))}
        </div>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </main>
  );
};

export default ProjectsPage;
