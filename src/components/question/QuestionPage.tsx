import React, { useEffect, useState } from "react";
import { database, ref, get, set } from "@/firebaseConfig"; // Import Firebase Realtime Database methods
import Nav2 from "@/components/shared/Nav2";
import Footer from "@/components/shared/Footer";

const QuestionPage = () => {
  const [questions, setQuestions] = useState<any[]>([]); // State for storing questions
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  // Fetch questions from Firebase
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Reference to the 'Questions' node in your Realtime Database
        const questionsRef = ref(database, 'Questions');
        const snapshot = await get(questionsRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const loadedQuestions: any[] = [];

          // Iterate over each question and store it in the state
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              loadedQuestions.push({ id: key, ...data[key] });
            }
          }
          setQuestions(loadedQuestions); // Set fetched data to state
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false); // End loading state after fetching data
      }
    };

    fetchQuestions();
  }, []);

  // Update the answered status
  const toggleAnswer = async (index: number) => {
    const updatedQuestions = [...questions];
    const updatedQuestion = updatedQuestions[index];
    updatedQuestion.answered = !updatedQuestion.answered;

    // Reference to the question in Firebase
    const questionRef = ref(database, `Questions/${updatedQuestion.id}`);
    try {
      await set(questionRef, { ...updatedQuestion, answered: updatedQuestion.answered });
      setQuestions(updatedQuestions); // Update local state after Firebase update
    } catch (error) {
      alert("Failed to update answer status");
    }
  };

  // Optional: Display a loading spinner while fetching data
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col p-0 min-h-screen overflow-hidden dark:bg-neutral-950 bg-white dark:bg-grid-white/5 bg-grid-black/[0.2]">
      {/* Navigation */}
      
      
      {/* Main Content */}
      <div className="flex-grow  overflow-x-auto">
      <Nav2 />
      <div className="flex-grow p-6">

        <h1 className="text-2xl font-bold m-6 "> Questions</h1>
        <table className="w-full bg-[#1E1E1E] rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gradient-to-b from-neutral-400 to-neutral-800">
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Subject</th>
              <th className="border border-gray-300 px-4 py-2">Content</th>
              <th className="border border-gray-300 px-4 py-2">Answered or Not</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <tr key={question.id} className="border-b border-gray-600 hover:bg-gray-700">
                <td className="border border-gray-300 px-4 py-2">{question.email}</td>
                <td className="border border-gray-300 px-4 py-2">{question.subject}</td>
                <td className="border border-gray-300 px-4 py-2">{question.content}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="checkbox"
                    checked={question.answered}
                    onChange={() => toggleAnswer(index)}
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
    </div>
  );
};

export default QuestionPage;
