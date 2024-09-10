import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminPanelLayout from "./components/admin-panel/admin-panel-layout";
import { ContentLayout } from "./components/admin-panel/content-layout";
import { ThemeProvider } from "./providers/theme-provider";
import AllTechs from "./components/admin-panel/AllTechs";
import { NewTech } from "./components/admin-panel/NewTech";
import { Toaster } from "./components/ui/toaster";
import { useTechStore } from "./hooks/techStore";

function App() {
  const addTech = useTechStore((state) => state.addTech);

  const handleSubmit = (
    name: string,
    slug: string,
    image: string | null,
    active: boolean,
    created_At: string // Changed to string
  ) => {
    addTech(name, image || "", slug, active, created_At);
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
            />
            <Route path="/techs/all-tech" element={<AllTechs />} />{" "}
            {/* Ensure AllTechs is used */}
            <Route
              path="/techs/new-tech"
              element={<NewTech onSubmit={handleSubmit} />}
            />
            <Route path="/techs/edit-tech/:id" element={<NewTech onSubmit={handleSubmit} />} 
            />
          </Routes>
        </AdminPanelLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
