import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminPanelLayout from "./components/admin-panel/admin-panel-layout";
import { ContentLayout } from "./components/admin-panel/content-layout";
import { ThemeProvider } from "./providers/theme-provider";
import AllTechs from "./components/admin-panel/Technologies/AllTechs";
import { NewTech } from "./components/admin-panel/Technologies/NewTech";
import { Toaster } from "./components/ui/toaster";
import ErrorPage from "./components/admin-panel/error-page";
import { Test } from "./components/admin-panel/Tutorials/NewTuto";
import AllTutos from "./components/admin-panel/Tutorials/AllTutos";
import { handleBlockSubmit, handleLessonSubmit, handleSubmit } from "./lib/formHandler";
import { handleTutorialSubmit } from "./lib/formHandler";
import { NewFormation } from "./components/admin-panel/Formations/NewFormation";
import { handleFormationSubmit } from "./lib/formHandler";
import AllFormations from "./components/admin-panel/Formations/AllFormations";
import { NewLesson } from "./components/admin-panel/Lessons/NewLesson";
import AllLessons from "./components/admin-panel/Lessons/AllLessons";
import AllBlocks from "./components/admin-panel/Blocks/AllBlocks";
import { NewBlock } from "./components/admin-panel/Blocks/NewBlock";



function App() {
 

  return (
    <ThemeProvider>
      <Router>
        <AdminPanelLayout>
          <Toaster />
          <Routes>
            <Route
              path="/dashboard"
              element={
                <ContentLayout title="Dashboard">
                  <div>Your main dashboard content goes here</div>
                </ContentLayout>
              }
              errorElement={<ErrorPage />}
            />
            <Route path="/techs/all-tech" element={<AllTechs />} />
            {/* Ensure AllTechs is used */}
            <Route
              path="/techs/new-tech"
              element={<NewTech onSubmit={handleSubmit} />}
              errorElement={<ErrorPage />}
            />
            <Route
              path="/techs/edit-tech/:id"
              element={<NewTech onSubmit={handleSubmit} />}
              errorElement={<ErrorPage />}
            />
            <Route
              path="/tutorials/add-tutorial"
              element={<Test onSubmit={handleTutorialSubmit} />}
            />
            <Route path="/tutorials/all-tutorials" element={<AllTutos />} />
            <Route
              path="/tutorials/edit-tutorial/:id"
              element={<Test onSubmit={handleTutorialSubmit} />}
            />

            <Route
              path="/formations/new-formation"
              element={<NewFormation onSubmit={handleFormationSubmit} />}
            />

            <Route
              path="/formations/all-formations"
              element={<AllFormations />}
            />
            <Route
              path="/formations/edit-formation/:id"
              element={<NewFormation onSubmit={handleFormationSubmit} />}
            />

            <Route
              path="/lessons/new-lesson"
              element={<NewLesson onSubmit={handleLessonSubmit} />}
            />
            <Route
              path="/lessons/edit-lesson/:id"
              element={<NewLesson onSubmit={handleLessonSubmit} />}
            />

            <Route path="/lessons/all-lessons" element={<AllLessons />} />

            <Route
              path="/blocks/new-block"
              element={<NewBlock onSubmit={handleBlockSubmit} />}
            />
            <Route
              path="/blocks/edit-block/:id"
              element={<NewBlock onSubmit={handleBlockSubmit} />}
            />

            <Route path="/blocks/all-blocks" element={<AllBlocks />} />
          </Routes>
        </AdminPanelLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
