import { AlignJustify, User, LogOut } from "lucide-react";
import { SliverText } from "../ui/silver-text";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { auth, db } from "@/firebaseConfig"; // Adjust this import path
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function Nav() {
    const navigateFunction = useNavigate();
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null); // New state for role

    useEffect(() => {
        // Listen for auth state changes
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            setUser(user);
            if (user) {
                try {
                    // Fetch user role from Firestore
                    const userDoc = await getDoc(doc(db, "users", user.uid));
                    if (userDoc.exists()) {
                        const userRole = userDoc.data().role;
                         setRole(userRole);
                    
                    } else {
                        setRole("Guest"); // Fallback role if not found
                    }
                     
                } catch (error) {
                    console.error("Error fetching user role:", error);
                }
            } else {
                setRole(null); // Reset role if user logs out
            }
        });

        // Cleanup subscription
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigateFunction("/login");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const UserDropdown = () => (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-2 outline-none">
                <div className="flex items-center space-x-2 rounded-full border border-white/20 py-1 px-3 hover:bg-white/10 transition-colors">
                    {user?.photoURL ? (
                        <img
                            src={user.photoURL}
                            alt="Profile"
                            className="w-8 h-8 rounded-full"
                        />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                        </div>
                    )}
                    <div className="flex flex-col">
                        <span className="font-mono text-[16px] text-white">
                            {user?.email?.split("@")[0]}
                        </span>
                        {role && (
                            <span className="text-sm text-gray-400">
                                {role}
                            </span>
                        )}
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-[200px] bg-neutral-900 border-white/20">
                <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-red-500 focus:text-red-500 cursor-pointer">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );

    return (
        <nav className="flex max-w-[1600px] mx-auto pt-5 xl:px-[80px] md:px-[50px] px-5">
            <SliverText className="text-[36px]">CGI_Studio</SliverText>
            <div className="md:flex hidden w-full ml-auto items-center justify-end">
 {role !== "admin" && (        
    <p
        onClick={() => {
            navigateFunction("/QuestionPage");
        }}
        className="hover-underline-animation hover:cursor-pointer font-medium font-mono text-[20px]"
    >
        Questions
    </p>

)}


    <p
        onClick={() => {
            navigateFunction("/registerSPage");
        }}
        className="hover-underline-animation hover:cursor-pointer font-medium font-mono text-[20px] md:ml-6"
    >
        Users
    </p>


{role !== "admin" && (
    <p
        onClick={() => {
            navigateFunction("/VerifyProjects");
        }}
        className="hover-underline-animation hover:cursor-pointer font-medium font-mono text-[20px] md:ml-6 mr-8"
    >
        VerifyProjects
    </p>
)}
{role === "admin" && (
    <p
        onClick={() => {
            navigateFunction("/roles");
        }}
        className="hover-underline-animation hover:cursor-pointer font-medium font-mono text-[20px] md:ml-6 mr-8"
    >
        roles
    </p>
)}


                {user ? (
                    <UserDropdown />
                ) : (
                    <Link to="/login">
                        <button
                            name="navActionBtn"
                            className="text-neutral-200 bg-emerald-500 active:scale-100 transition-all bg-gradient-to-tr from-emerald-600 to-emerald-700 hover:from-neutral-300 hover:to-neutral-400 hover:text-black py-2 font-bold text-[18px] px-6 font-mono rounded-md shadow-[0px_0px_20px_#05966988]">
                            login
                        </button>
                    </Link>
                )}
            </div>
            <Sheet>
                <SheetTrigger asChild>
                    <AlignJustify className="md:hidden ml-auto my-auto opacity-70 h-[36px] w-[36px] text-[36px] " />
                </SheetTrigger>
                <SheetContent side={"top"}>
                {role !== "admin" && (
                    <div
                        onClick={() => {
                            navigateFunction("/QuestionPage");
                        }}
                        className="hover-underline-animation !flex opacity-80 py-1 active:scale-95 transition-transform border items-center justify-center mt-4 hover:cursor-pointer w-full font-medium font-mono text-[28px] ">
                        Question
                    </div>
                    )}
                                 

                    <div
                        onClick={() => navigateFunction("/registerSPage")}
                        className="hover-underline-animation !flex opacity-80 py-1 active:scale-95 transition-transform border items-center justify-center mt-4 hover:cursor-pointer w-full font-medium font-mono text-[28px] ">
                        Users
                    </div>
                
                     {role !== "admin" && (
                    <div
                        onClick={() => {
                            navigateFunction("/VerifyProjects");
                        }}
                        className="hover-underline-animation !flex opacity-80 py-1 active:scale-95 transition-transform border items-center justify-center mt-4 hover:cursor-pointer w-full font-medium font-mono text-[28px] ">
                                VerifyProjects

                    </div>
                )}{role === "admin" && (
                    <div
                        onClick={() => {
                            navigateFunction("/roles");
                        }}
                        className="hover-underline-animation !flex opacity-80 py-1 active:scale-95 transition-transform border items-center justify-center mt-4 hover:cursor-pointer w-full font-medium font-mono text-[28px] ">
                        roles
                    </div>
                    
                )}
                    {user ? (
                        <div
                            onClick={handleLogout}
                            className="hover-underline-animation !flex opacity-80 py-1 active:scale-95 transition-transform border items-center justify-center mt-4 hover:cursor-pointer w-full font-medium font-mono text-[28px] text-red-500">
                            Logout
                        </div>
                    ) : (
                        <div
                            onClick={() => {
                                navigateFunction("/login");
                            }}
                            className="hover-underline-animation !flex opacity-80 py-1 active:scale-95 transition-transform border items-center justify-center mt-4 hover:cursor-pointer w-full font-medium font-mono text-[28px] ">
                            login
                        </div>
                    )}
                </SheetContent>
            </Sheet>
        </nav>
    );
}
