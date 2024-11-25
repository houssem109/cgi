import { useNavigate } from "react-router-dom";
import Footer from "../shared/Footer";
import Nav from "../shared/Nav";
import { SliverText } from "../ui/silver-text";
import GameCard from "./ProjectCard";
import { useEffect, useState } from "react";
import { auth, db } from "@/firebaseConfig"; // Adjust the path to your firebase config
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

interface Project {
  id: string;
  title: string;
  description: string;
  releaseDate: string;
  categories: string[];
  installationLink: string;
  photos: string[];
  approved: boolean;
}

const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsRef = collection(db, "projects");
        const q = query(projectsRef, where("approved", "==", true)); // Fetch only approved projects
        const querySnapshot = await getDocs(q);

        const fetchedProjects: Project[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Project[];

        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <main className="overflow-hidden p-0 w-full dark:bg-neutral-950 bg-white dark:bg-grid-white/5 bg-grid-black/[0.2] relative">
      <Nav />
      <div className="max-w-[1700px] mx-auto relative mb-10 pt-5 xl:px-[80px] mt-0 sm:px-[40px] px-4 min-h-[calc(100vh-60px)] flex flex-col h-full">
        <div className="flex items-center justify-between p-4">
          <SliverText className="text-4xl font-bold">Projects</SliverText>
          {isLoggedIn && (
            <button
              onClick={() => navigate("/projetpage/add")}
              className="text-neutral-200 bg-emerald-500 active:scale-100 transition-all bg-gradient-to-tr from-emerald-600 to-emerald-700 py-2 text-[16px] px-10 font-sans font-semibold rounded-md hover:from-neutral-300 hover:to-neutral-400 hover:text-black shadow-[0px_0px_20px_#05966988]"
            >
              Add Project
            </button>
          )}
        </div>
        <div className="space-y-8">
          {projects.map((project) => (
            <GameCard
              key={project.id}
              title={project.title}
              description={project.description}
              releaseDate={project.releaseDate}
              categories={project.categories}
              installationLink={project.installationLink}
              photos={project.photos}
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
