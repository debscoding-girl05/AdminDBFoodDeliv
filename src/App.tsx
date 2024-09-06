import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminPanelLayout from "./components/admin-panel/admin-panel-layout";
import { ContentLayout } from "./components/admin-panel/content-layout";
import { ThemeProvider } from "./providers/theme-provider";
import AllTechs from "./components/admin-panel/AllTechs";
import NewTech from "./components/admin-panel/NewTech";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AdminPanelLayout>
          <Routes>
            <Route
              path="/dashboard"
              element={
                <ContentLayout title="Dashboard">
                  <div>Your main dashboard content goes here</div>
                </ContentLayout>
              }
            />
            <Route path="/techs/all-tech" element={<AllTechs />} />
            <Route path="/techs/new-tech" element={<NewTech />} />
          </Routes>
        </AdminPanelLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
