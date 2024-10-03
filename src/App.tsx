import { Route, Routes } from "react-router-dom";
import { siteConfig } from "@/config/site";
import GroupsPage from "@/pages/groups";
import StudentsPage from "./pages/students";
import TeachersPage from "./pages/teachers";
import GroupDetail from './pages/groupDetail';
import StudentDetail from './pages/studentDetail';
import TeacherDetail from "./pages/teacherDetail";
import FinancesPage from "./pages/finances";
import LessonsPage from "./pages/lessons";

function App() {
  return (
    <Routes>
      <Route element={<GroupsPage />} path={siteConfig.navItems[0].href} />
      <Route element={<GroupDetail />} path={siteConfig.navItems[0].href + "/:groupParam"} />
      <Route element={<StudentsPage />} path={siteConfig.navItems[1].href} />
      <Route element={<StudentDetail />} path={siteConfig.navItems[1].href + "/:studentParam"} />
      <Route element={<TeachersPage />} path={siteConfig.navItems[2].href} />
      <Route element={<TeacherDetail />} path={siteConfig.navItems[2].href + "/:teacherParam"} />
      <Route element={<LessonsPage />} path={siteConfig.navItems[3].href} />
      <Route element={<FinancesPage />} path={siteConfig.navItems[4].href} />
    </Routes>
  );
}

export default App;