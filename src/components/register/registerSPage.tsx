import React, { useEffect, useState } from "react";
import Nav2 from "@/components/shared/Nav2";
import Footer from "@/components/shared/Footer";
import { get, ref, set } from "firebase/database";
import { database } from "@/firebaseConfig";

const RegistrationPage = () => {
    const [submissions, setSubmissions] = useState<any[]>([]); // State for storing submissions
    const [loading, setLoading] = useState<boolean>(true); // Optional: for loading state
  
    // Fetch registration submissions from Firebase
    useEffect(() => {
      const fetchSubmissions = async () => {
        try {
          // Reference to the 'UserData' node in your Realtime Database
          const submissionsRef = ref(database, 'registrations');
          const snapshot = await get(submissionsRef);
  
          if (snapshot.exists()) {
            const data = snapshot.val();
            const loadedSubmissions = [];
  
            // Iterating over each submission
            for (const key in data) {
              if (data.hasOwnProperty(key)) {
                loadedSubmissions.push({ id: key, ...data[key] });
              }
            }
            setSubmissions(loadedSubmissions); // Set fetched data to state
          } else {
            console.log("No data available");
          }
        } catch (error) {
          console.error("Error fetching submissions:", error);
        } finally {
          setLoading(false); // End loading state after fetching data
        }
      };
  
      fetchSubmissions();
    }, []);
  
    // Toggle the registration status (for example, answered)
    const toggleStatus = async (index: number) => {
      const updatedSubmissions = [...submissions];
      const updatedSubmission = updatedSubmissions[index];
      updatedSubmission.status = !updatedSubmission.status; // Toggle the status
  
      // Update the submission in Firebase
      const submissionRef = ref(database, `registrations/${updatedSubmission.id}`);
      try {
        await set(submissionRef, { ...updatedSubmission, status: updatedSubmission.status });
        setSubmissions(updatedSubmissions); // Update local state after Firebase update
      } catch (error) {
        alert("Failed to update status");
      }
    };
  
    // Optional: Display a loading spinner while fetching data
    if (loading) {
      return <div>Loading...</div>;
    }
  return (
    <main className="flex flex-col p-0 min-h-screen overflow-hidden dark:bg-neutral-950 bg-white dark:bg-grid-white/5 bg-grid-black/[0.2]">
      {/* Navigation */}
      

      {/* Main Content */}
      <div className="flex-grow  overflow-x-auto">
        
      <Nav2 />
        <div className="flex-grow p-6">
        <h1 className="text-2xl font-bold m-6">Registrations</h1>
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gradient-to-b from-neutral-400 to-neutral-800">
              <th className="border border-gray-300 px-4 py-2">First Name</th>
              <th className="border border-gray-300 px-4 py-2">Last Name</th>
              <th className="border border-gray-300 px-4 py-2">ID Number</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Facebook</th>
              <th className="border border-gray-300 px-4 py-2">University</th>
              <th className="border border-gray-300 px-4 py-2">Internship Type</th>
              <th className="border border-gray-300 px-4 py-2">Start Date</th>
              <th className="border border-gray-300 px-4 py-2">End Date</th>
              <th className="border border-gray-300 px-4 py-2">Training Option</th>
              <th className="border border-gray-300 px-4 py-2">Status</th> {/* New Status Column */}
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission, index) => (
              <tr key={index} className="bg-gray-700 text-white">
                <td className="border border-gray-300 px-4 py-2">{submission.lastName}</td>
                <td className="border border-gray-300 px-4 py-2">{submission.firstName}</td>
                <td className="border border-gray-300 px-4 py-2">{submission.cin}</td>
                <td className="border border-gray-300 px-4 py-2">{submission.phone}</td>
                <td className="border border-gray-300 px-4 py-2">{submission.email}</td>
                <td className="border border-gray-300 px-4 py-2">{submission.facebook}</td>
                <td className="border border-gray-300 px-4 py-2">{submission.university}</td>
                <td className="border border-gray-300 px-4 py-2">{submission.internshipType}</td>
                <td className="border border-gray-300 px-4 py-2">{submission.startDate}</td>
                <td className="border border-gray-300 px-4 py-2">{submission.endDate}</td>
                <td className="border border-gray-300 px-4 py-2">{submission.trainingOption}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="checkbox"
                    checked={submission.status}
                    onChange={() => toggleStatus(index)} // Toggle status
                  />
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

export default RegistrationPage;
