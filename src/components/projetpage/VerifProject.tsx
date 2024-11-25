import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import Nav2 from "../shared/Nav2";
import Footer from "../shared/Footer";
import { db } from "@/firebaseConfig";

interface Project {
  id: string;
  title: string;
  description: string;
  releaseDate: string;
  photos: string[]; // List of photo URLs
  categories: string[];
  approved: boolean;
}

const VerifyProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  // Fetch data from Firebase on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      const projectCollection = collection(db, "projects");
      const projectSnapshot = await getDocs(projectCollection);
      const projectList = projectSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Project[];
      setProjects(projectList);
    };

    fetchProjects();
  }, []);

  // Toggle project approval
  const toggleApproval = async (id: string, currentApproval: boolean) => {
    const projectRef = doc(db, "projects", id);
    await updateDoc(projectRef, { approved: !currentApproval });

    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === id ? { ...project, approved: !currentApproval } : project
      )
    );
  };

  // Delete a project
  const deleteProject = async (id: string) => {
    await deleteDoc(doc(db, "projects", id));

    setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
  };

  return (
    <main className="flex flex-col min-h-screen dark:bg-neutral-950 bg-white dark:bg-grid-white/5 bg-grid-black/[0.2]">
      {/* Navigation Bar */}
      <div>
      <Nav2 />
      </div>
      {/* Main Content */}
      <div className="flex-grow p-8">
        <h2 className="text-3xl font-bold mb-6">Projects</h2>

        <div className="overflow-x-auto">
          <table className="w-full bg-[#1E1E1E] rounded-lg shadow-lg">
            <thead>
              <tr className="text-left bg-gradient-to-b from-neutral-400 to-neutral-800">
                <th className="py-4 border border-gray-300 px-6">Title</th>
                <th className="py-4 border border-gray-300 px-6">Description</th>
                <th className="py-4 border border-gray-300 px-6">Release Date</th>
                <th className="py-4 border border-gray-300 px-6">Photos</th>
                <th className="py-4 border border-gray-300 px-6">Categories</th>
                <th className="py-4 border border-gray-300 px-6">Approved</th>
                <th className="py-4 border border-gray-300 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="border-b border-gray-600 hover:bg-gray-700"
                >
                  <td className="py-4 border border-gray-300 px-6">{project.title}</td>
                  <td className="py-4 border border-gray-300 px-6">{project.description}</td>
                  <td className="py-4 border border-gray-300 px-6">{project.releaseDate}</td>
                  <td className="py-4 border border-gray-300 px-6">
                    {project.photos.map((photo, index) => (
                      <a
                        key={index}
                        href={photo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400  underline mr-2"
                      >
                        Photo {index + 1}
                      </a>
                    ))}
                  </td>
                  <td className="py-4 border border-gray-300 px-6">{project.categories.join(", ")}</td>
                  <td className="py-4 border border-gray-300 px-6">
                    <input
                      type="checkbox"
                      checked={project.approved}
                      onChange={() => toggleApproval(project.id, project.approved)}
                      className="w-5 h-5"
                    />
                  </td>
                  <td className="py-4 border border-gray-300  px-6">
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default VerifyProjects;
