import { useState } from "react";
import { database, ref, set } from "@/firebaseConfig"; // Import Realtime Database methods
import { SliverText } from "@/components/ui/silver-text";

export default function ContactForm() {
  const [user, setUser] = useState({
    email: "",
    subject: "",
    content: "",
  });

  let name, value;
  const data = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
    console.log(user)

  };

  const getdata = async (e) => {
    const { email, subject, content } = user;
    e.preventDefault();

    const messageId = Date.now().toString();

    // Set the message in Firebase Realtime Database
    try {
      await set(ref(database, "Questions/" + messageId), {
        email,
        subject,
        content,
        answered: false, 
      });

      alert("Message sent!");
    } catch (error) {
      console.error("Error writing to Firebase:", error);
      alert("An error occurred while sending the message.");
    }
  };

  return (
    <>
      <form action="" className="md:w-auto w-full min-h-[500px]">
        <SliverText className="mb-4 text-4xl text-center w-full">
          Have a question ?
        </SliverText>
        <div className="flex flex-col">
          <label htmlFor="" className="font-mono text-[20px] mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={data}
            autoComplete="off"
            className="md:w-[600px] w-full bg-transparent pl-2 fon py-3 text-white rounded  border-white/20 border-2 font-mono focus:outline-none focus:border-white/40 transition-all focus:pl-4 focus:placeholder:opacity-0 "
            placeholder="Example@example.com"
            required
          />
        </div>
        <div className="flex mt-3 flex-col">
          <label htmlFor="" className="font-mono text-[20px] mb-1">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            value={user.subject}
            onChange={data}
            autoComplete="off"
            className="md:w-[600px] w-full bg-transparent pl-2 fon py-3 text-white rounded  border-white/20 border-2 font-mono focus:outline-none focus:border-white/40 transition-all focus:pl-4 focus:placeholder:opacity-0 "
            placeholder="Email subject"
            required
          />
        </div>

        <div className="flex flex-col mt-5">
          <label htmlFor="" className="font-mono text-[20px] mb-1">
            Content
          </label>

          <textarea
            rows={5}
            name="content"
            value={user.content}
            onChange={data}
            autoComplete="off"
            placeholder="Email content"
            required
            className="md:w-[600px] w-full bg-transparent pl-2 fon py-3 text-white rounded  border-white/20 border-2 font-mono focus:outline-none focus:border-white/40 transition-all focus:pl-4 focus:placeholder:opacity-0 "
          />
        </div>
        <div className="flex space-x-4 mt-4">
          <button
            name="ResetBtn"
            onClick={getdata}
            className="text-neutral-200 bg-gray-500 active:scale-100 transition-all bg-gradient-to-tr from-gray-600 to-gray-700 py-2 text-[16px] px-10 font-sans font-semibold rounded-md hover:from-neutral-300 hover:to-neutral-400 hover:text-black shadow-[0px_0px_20px_#6b728088]">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
