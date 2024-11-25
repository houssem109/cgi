import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../shared/Footer";
import { SliverText } from "../ui/silver-text";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebaseConfig";

// AddProjectPage Component
const AddProjectPage: React.FC = () => {
  // State to manage form input fields
  const [formData, setFormData] = useState({
    title: "", // Project title
    description: "", // Project description
    releaseDate: "", // Release date for the project
    installationLink: "", // Link for installation or download
  });

  // State to manage dynamic lists (photos and categories)
  const [photos, setPhotos] = useState<string[]>([]); // Array of photo URLs
  const [categories, setCategories] = useState<string[]>([]); // Array of category names

  // Navigation hook for redirection
  const navigate = useNavigate();

  // Handle input field changes for the form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target; // Get field name and value
    setFormData((prev) => ({ ...prev, [name]: value })); // Update the corresponding field in formData
  };

  // Add an empty photo input field
  const handleAddPhoto = () => setPhotos([...photos, ""]); // Append an empty string to photos array

  // Update a specific photo URL in the photos array
  const handlePhotoChange = (index: number, value: string) => {
    const updatedPhotos = [...photos]; // Create a copy of photos array
    updatedPhotos[index] = value; // Update the specific index with the new value
    setPhotos(updatedPhotos); // Save the updated array
  };

  // Remove a specific photo input field
  const handleRemovePhoto = (index: number) => setPhotos(photos.filter((_, i) => i !== index)); // Remove the photo at the specified index

  // Add an empty category input field
  const handleAddCategory = () => setCategories([...categories, ""]); // Append an empty string to categories array

  // Update a specific category in the categories array
  const handleCategoryChange = (index: number, value: string) => {
    const updatedCategories = [...categories]; // Create a copy of categories array
    updatedCategories[index] = value; // Update the specific index with the new value
    setCategories(updatedCategories); // Save the updated array
  };

  // Remove a specific category input field
  const handleRemoveCategory = (index: number) =>
    setCategories(categories.filter((_, i) => i !== index)); // Remove the category at the specified index

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Create a new project object with form data
    const newProject = {
      ...formData, // Spread formData fields (title, description, releaseDate, installationLink)
      photos, // Attach photos array
      categories, // Attach categories array
      approved: false, // Set the approved status to false by default
      createdAt: new Date().toISOString(), // Add a timestamp of the project creation
    };

    try {
      // Add the new project to the Firestore 'projects' collection
      await addDoc(collection(db, "projects"), newProject);
      console.log("Project added successfully!"); // Log success message
      navigate("/projetpage"); // Redirect the user to the projects page
    } catch (error) {
      console.error("Error adding project: ", error); // Log error if Firestore operation fails
    }
  };



  return (
    <main className="overflow-hidden p-0 w-full dark:bg-neutral-950 bg-white dark:bg-grid-white/5 bg-grid-black/[0.2] relative">
    <div className="max-w-4xl mx-auto p-8 mb-7 dark:bg-neutral-900 bg-white text-white rounded-lg shadow-lg mt-10">
    <SliverText className="text-[36px] pb-5">Add Project</SliverText>
      <form onSubmit={handleSubmit} className="space-y-4 pl-9">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block mb-2 font-semibold">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter project title"
            className="md:w-[600px] w-full bg-transparent pl-2 fon py-3 text-white rounded  border-white/20 border-2 font-mono focus:outline-none focus:border-white/40 transition-all focus:pl-4 focus:placeholder:opacity-0 "
            minLength={3}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block mb-2 font-semibold">Description</label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter project description"
            className="md:w-[600px] w-full bg-transparent pl-2 fon py-3 text-white rounded  border-white/20 border-2 font-mono focus:outline-none focus:border-white/40 transition-all focus:pl-4 focus:placeholder:opacity-0 "
            required
          />
        </div>

        {/* Release Date */}
        <div>
          <label htmlFor="releaseDate" className="block mb-2 font-semibold">Release Date</label>
          <input
            type="date"
            name="releaseDate"
            id="releaseDate"
            value={formData.releaseDate}
            onChange={handleInputChange}
            className="md:w-[600px] w-full bg-transparent pl-2 fon py-3 text-white rounded  border-white/20 border-2 font-mono focus:outline-none focus:border-white/40 transition-all focus:pl-4 focus:placeholder:opacity-0 "
            required
          />
        </div>

        {/* Installation Link */}
        <div>
          <label htmlFor="installationLink" className="block mb-2 font-semibold">Installation Link</label>
          <input
            type="url"
            name="installationLink"
            id="installationLink"
            value={formData.installationLink}
            onChange={handleInputChange}
            placeholder="e.g., https://example.com/installation"
            className="md:w-[600px] w-full bg-transparent pl-2 fon py-3 text-white rounded  border-white/20 border-2 font-mono focus:outline-none focus:border-white/40 transition-all focus:pl-4 focus:placeholder:opacity-0 "
            required
          />
        </div>

        {/* Photos */}
        <div>
          <label className="block mb-2 font-semibold">Photos</label>
          {photos.map((photo, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="url"
                value={photo}
                onChange={(e) => handlePhotoChange(index, e.target.value)}
                placeholder="Photo URL"
                className="md:w-[600px] w-full bg-transparent pl-2 fon py-3 text-white rounded  border-white/20 border-2 font-mono focus:outline-none focus:border-white/40 transition-all focus:pl-4 focus:placeholder:opacity-0 "
                required
              />
              <button
                type="button"
                onClick={() => handleRemovePhoto(index)}
                className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddPhoto}
            className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Add Photo
          </button>
        </div>

        {/* Categories */}
        <div>
          <label className="block mb-2 font-semibold">Categories</label>
          {categories.map((category, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={category}
                onChange={(e) => handleCategoryChange(index, e.target.value)}
                placeholder="Category"
                className="md:w-[600px] w-full bg-transparent pl-2 fon py-3 text-white rounded  border-white/20 border-2 font-mono focus:outline-none focus:border-white/40 transition-all focus:pl-4 focus:placeholder:opacity-0 "
                required
              />
              <button
                type="button"
                onClick={() => handleRemoveCategory(index)}
                className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddCategory}
            className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Add Category
          </button>
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("/projetpage")}
            className="px-4 py-2 bg-red-600 rounded-md hover:bg-red-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 rounded-md hover:bg-green-700"
          >
            Add Project
          </button>
        </div>
      </form>
    </div>
    <Footer />
    </main>
  );
};

export default AddProjectPage;
