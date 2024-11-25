import Nav from "@/components/shared/Nav";
import Footer from "@/components/shared/Footer";
import { SliverText } from "../ui/silver-text";
import { useState } from "react";
import { database, ref, set } from "@/firebaseConfig";

export default function Register() {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setIsChecked(event.target.checked);
    };
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        cin: "",
        phone: "",
        email: "",
        facebook: "",
        university: "",
        internshipType: "",
        startDate: "",
        endDate: "",
        trainingOption: "",
        status: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    console.log(formData);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the default form submission behavior
        const updatedFormData = { ...formData, status: false };
        // Define the reference in the database where the data will be stored
        const formDataRef = ref(database, "registrations/" + formData.cin); // Assuming cin is unique

        // Save the data to Firebase
        set(formDataRef, updatedFormData)
            .then(() => {
                alert("Registration successful!"); // Notify the user
            })
            .catch((error) => {
                console.error("Error saving data: ", error);
            });
    };

    return (
        <main className="overflow-hidden p-0 w-full dark:bg-neutral-950 bg-white dark:bg-grid-white/5 bg-grid-black/[0.2] relative">
            <Nav />
            <div className="max-w-[1700px] mx-auto relative mb-10 pt-5 xl:px-[80px] mt-0 sm:px-[40px] px-4 min-h-[calc(100vh-60px)] flex flex-col h-full">
                <SliverText className="text-4xl font-bold">Register</SliverText>
                <form
                    className="flex flex-col space-y-4 mt-4 "
                    onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label
                            htmlFor="firstName"
                            className="font-mono text-[20px] mb-1">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="md:w-[600px] w-full bg-transparent pl-2 py-3 text-white rounded border-white/20 border-2 font-mono focus:outline-none focus:border-white/40 transition-all focus:pl-4"
                            placeholder="Enter your first name"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="lastName"
                            className="font-mono text-[20px] mb-1">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            name="lastName"
                            className="md:w-[600px] w-full bg-transparent pl-2 py-3 text-white rounded border-white/20 border-2 font-mono focus:outline-none focus:border-white/40 transition-all focus:pl-4"
                            placeholder="Enter your last name"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="cin"
                            className="font-mono text-[20px] mb-1">
                            ID Number
                        </label>
                        <input
                            type="number"
                            id="cin"
                            name="cin"
                            value={formData.cin}
                            onChange={handleInputChange}
                            className="md:w-[600px] w-full bg-transparent pl-2 py-3 text-white rounded border-white/20 border-2 font-mono focus:outline-none focus:border-white/40 transition-all focus:pl-4"
                            placeholder="Enter your ID number"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="phone"
                            className="font-mono text-[20px] mb-1">
                            Phone
                        </label>
                        <input
                            type="number"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="md:w-[600px] w-full bg-transparent pl-2 py-3 text-white rounded border-white/20 border-2 font-mono focus:outline-none focus:border-white/40 transition-all focus:pl-4"
                            placeholder="Enter your phone number"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="email"
                            className="font-mono text-[20px] mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="md:w-[600px] w-full bg-transparent pl-2 py-3 text-white rounded border-white/20 border-2 font-mono focus:outline-none focus:border-white/40 transition-all focus:pl-4"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="facebook"
                            className="font-mono text-[20px] mb-1">
                            Facebook Profile
                        </label>
                        <input
                            type="text"
                            id="facebook"
                            name="facebook"
                            value={formData.facebook}
                            onChange={handleInputChange}
                            className="md:w-[600px] w-full bg-transparent pl-2 py-3 text-white rounded border-white/20 border-2 font-mono focus:outline-none focus:border-white/40 transition-all focus:pl-4"
                            placeholder="Enter your Facebook profile link"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="university"
                            className="font-mono text-[20px] mb-1">
                            University
                        </label>
                        <input
                            type="text"
                            id="university"
                            name="university"
                            value={formData.university}
                            onChange={handleInputChange}
                            className="md:w-[600px] w-full bg-transparent pl-2 py-3 text-white rounded border-white/20 border-2 font-mono focus:outline-none focus:border-white/40 transition-all focus:pl-4"
                            placeholder="Enter your university"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-mono text-[20px] mb-1">
                            Internship Type
                        </label>
                        <div className="flex flex-col space-y-4">
                            <label>
                                <input
                                    type="radio"
                                    name="internshipType"
                                    required
                                    value="Introduction, 1st Year"
                                    className="mr-2"
                                    checked={
                                        formData.internshipType ===
                                        "Introduction, 1st Year"
                                    }
                                    onChange={handleInputChange}
                                />
                                Introduction, 1st Year
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="internshipType"
                                    required
                                    value="Advanced, 2nd Year"
                                    className="mr-2"
                                    checked={
                                        formData.internshipType ===
                                        "Advanced, 2nd Year"
                                    }
                                    onChange={handleInputChange}
                                />
                                Advanced, 2nd Year
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="internshipType"
                                    required
                                    value="Final Year Project (PFE)  3rd Year"
                                    className="mr-2"
                                    checked={
                                        formData.internshipType ===
                                        "Final Year Project (PFE)  3rd Year"
                                    }
                                    onChange={handleInputChange}
                                />
                                Final Year Project (PFE) 3rd Year
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="internshipType"
                                    required
                                    value="Engineer"
                                    className="mr-2"
                                    checked={
                                        formData.internshipType === "Engineer"
                                    }
                                    onChange={handleInputChange}
                                />
                                Engineer
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="internshipType"
                                    required
                                    value="Apprenticeship Final Project (Optional)"
                                    className="mr-2"
                                    checked={
                                        formData.internshipType ===
                                        "Apprenticeship Final Project (Optional)"
                                    }
                                    onChange={handleInputChange}
                                />
                                Apprenticeship Final Project (Optional)
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="internshipType"
                                    required
                                    value="Optional"
                                    className="mr-2"
                                    checked={
                                        formData.internshipType === "Optional"
                                    }
                                    onChange={handleInputChange}
                                />
                                Optional
                            </label>
                        </div>
                    </div>
                    <div className="flex mt-5 flex-col">
                        <label
                            htmlFor="startDate"
                            className="font-mono text-[20px] mb-1">
                            Start Date
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleInputChange}
                            required
                            className="md:w-[600px] w-full bg-transparent pl-2 py-3 text-white rounded border-white/20 border-2 font-mono focus:outline-none focus:border-white/40 transition-all focus:pl-4"
                        />
                    </div>

                    <div className="flex mt-5 flex-col">
                        <label
                            htmlFor="endDate"
                            className="font-mono text-[20px] mb-1">
                            End Date
                        </label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            required
                            value={formData.endDate}
                            onChange={handleInputChange}
                            className="md:w-[600px] w-full bg-transparent pl-2 py-3 text-white rounded border-white/20 border-2 font-mono focus:outline-none focus:border-white/40 transition-all focus:pl-4"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-mono text-[20px] mb-1">
                            Training and Internship Options
                        </label>
                        <div className="flex flex-col space-y-4">
                            <label>
                                <input
                                    type="radio"
                                    name="trainingOption"
                                    required
                                    value="Certified Training 500DT"
                                    className="mr-2"
                                    checked={
                                        formData.trainingOption ===
                                        "Certified Training 500DT"
                                    }
                                    onChange={handleInputChange}
                                />
                                Certified Training 500DT
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="trainingOption"
                                    required
                                    value="Internship + Certified Training 500DT"
                                    className="mr-2"
                                    checked={
                                        formData.trainingOption ===
                                        "Internship + Certified Training 500DT"
                                    }
                                    onChange={handleInputChange}
                                />
                                Internship + Certified Training 500DT
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="trainingOption"
                                    required
                                    value="Internship + Certified Training 'One to One' 1000DT"
                                    className="mr-2"
                                    checked={
                                        formData.trainingOption ===
                                        "Internship + Certified Training 'One to One' 1000DT"
                                    }
                                    onChange={handleInputChange}
                                />
                                Internship + Certified Training "One to One"
                                1000DT
                            </label>
                        </div>
                    </div>
                    {/* New Question */}
                    <div className="flex flex-col mt-4">
                        <label className="font-mono text-[20px] mb-1">
                            I have read the description above and I understand
                            that the internship is free, the training is paid,
                            and the training is strongly recommended for the
                            successful completion of the internship.
                        </label>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="agreement"
                                className="mr-2"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                            <label
                                htmlFor="agreement"
                                className="font-mono text-[16px]">
                                YES
                            </label>
                        </div>
                    </div>

                    {/* Submit and Reset Buttons */}
                    <div className="flex space-x-4 mt-4">
                        <button
                            name="SubmitBtn"
                            disabled={!isChecked}
                            className={`transition-all py-2 text-[16px] px-10 font-sans font-semibold rounded-md shadow-[0px_0px_20px_#05966988] ${
                                isChecked
                                    ? "bg-gradient-to-tr from-emerald-600 to-emerald-700 text-white hover:from-neutral-300 hover:to-neutral-400 hover:text-black"
                                    : "bg-gray-400 text-gray-600 cursor-not-allowed"
                            }`}>
                            Submit
                        </button>
                        <button
                            name="ResetBtn"
                            type="reset"
                            className="text-neutral-200 bg-gray-500 active:scale-100 transition-all bg-gradient-to-tr from-gray-600 to-gray-700 py-2 text-[16px] px-10 font-sans font-semibold rounded-md hover:from-neutral-300 hover:to-neutral-400 hover:text-black shadow-[0px_0px_20px_#6b728088]">
                            Reset
                        </button>
                    </div>
                </form>
            </div>
            <div className="mt-auto">
                <Footer />
            </div>
        </main>
    );
}
