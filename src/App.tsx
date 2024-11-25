import Home from "./pages/home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/register/register";

import Login from "./components/login/login";
import Programs from "./pages/home/components/programs";
import ProjectsPage from "./components/projetpage/ProjectsPage";
import QuestionPage from "./components/question/QuestionPage";
import RegisterSPage from "./components/register/registerSPage";
import RolesManagement from "./pages/roles";
import AddProjectPage from "./components/projetpage/AddProjectPage";
import Home2 from "./components/home2/Home2";
import VerifyProjects from "./components/projetpage/VerifProject";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/Programs" element={<Programs />} />
                <Route path="/projetpage" element={<ProjectsPage />} />
                <Route path="/registerSPage" element={<RegisterSPage />} />
                <Route path="/QuestionPage" element={<QuestionPage />} />
                <Route path="/roles" element={<RolesManagement />} />
                <Route path="/Programs" element={<Programs />} />
                <Route path="/projetpage" element={<ProjectsPage />} />
                <Route path="/QuestionPage" element={<QuestionPage />} />
                <Route path="/Home2" element={<Home2 />} />
                <Route path="/registerSPage" element={<RegisterSPage />} />
                <Route path="/projetpage/add" element={<AddProjectPage />} />
                <Route path="/VerifyProjects" element={<VerifyProjects />} />
                
            </Routes>
        </Router>
    );
}

export default App;
