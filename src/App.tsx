import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminPanelLayout from "./components/admin-panel/admin-panel-layout";
import { ContentLayout } from "./components/admin-panel/content-layout";
import { ThemeProvider } from "./providers/theme-provider";
import AllTechs from "./components/admin-panel/Technologies/AllTechs";
import { NewTech } from "./components/admin-panel/Technologies/NewTech";
import { Toaster } from "./components/ui/toaster";
import { useTechStore } from "./hooks/techStore";
import ErrorPage from "./components/admin-panel/error-page";
import { Test, formSchema } from "./components/admin-panel/Tutorials/NewTuto";
import AllTutos from "./components/admin-panel/Tutorials/AllTutos";
import { useTutoStore } from "./hooks/tutoStore";
import { z } from "zod";

function App() {
  const addTech = useTechStore((state) => state.addTech);
  const addTutorial = useTutoStore((state) => state.addTutorial);

  const handleSubmit = (
    name: string,
    slug: string,
    image: string | null,
    active: boolean,
    created_At: string // Changed to string
  ) => {
    addTech(name, image || "", slug, active, created_At);
  };
 

  const handleTutorialSubmit = (data: z.infer<typeof formSchema>) => {
    const technology_id = Number(data.technologies[0]?.id) || 0;
    const adjustedData = {
      ...data,
      technology_id,
      meta_keywords: data.meta_keywords.map(({ id, text }) => ({ id: Number(id), name: text })),
      image: data.image || '', // Provide default empty string
    };
    addTutorial(adjustedData);
  };

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
            <Route
              path="/tutorials/all-tutorials"
              element={<AllTutos  />}
            />
            <Route
              path="/tutorials/edit-tutorial/:id"
              element={<Test onSubmit={handleTutorialSubmit} />}
            />
          </Routes>
        </AdminPanelLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
