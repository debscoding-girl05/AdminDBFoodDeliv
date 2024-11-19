import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminPanelLayout from "./components/admin-panel/admin-panel-layout";
import { ThemeProvider } from "./providers/theme-provider";
import { Toaster } from "./components/ui/toaster";
import ErrorPage from "./components/admin-panel/error-page";
import { handleCategSubmit, handleDishSubmit } from "./lib/formHandler";
import { NewUser } from "./components/admin-panel/Users/NewUser";
import { handleUserSubmit } from "./lib/formHandler";
import AllUsers from "./components/admin-panel/Users/AllUsers";
import MainDashboard from "./components/admin-panel/Dashboard/mainDashboard";
import { NewCat } from "./components/admin-panel/Categories/NewCat";
import AllCats from "./components/admin-panel/Categories/AllCats";
import AllDishes from "./components/admin-panel/Dishes/AllDishes";
import { NewDish } from "./components/admin-panel/Dishes/NewDishes";
import CommandTable from "./components/admin-panel/Commands/AllCommands";
import CommandDetail from "./components/admin-panel/Commands/CommandDetail";


function App() {
 

  return (
    <ThemeProvider>
      <Router>
        <AdminPanelLayout>
          <Toaster />
          <Routes>
            <Route
              path="/dashboard"
              element={<MainDashboard />}
              errorElement={<ErrorPage />}
            />
            <Route path="/plats/all-plat" element={<AllDishes />} />
         
            <Route
              path="/plats/new-plat"
              element={<NewDish onSubmit={handleDishSubmit} />}
              errorElement={<ErrorPage />}
            />
            <Route
              path="/plats/edit-plat/:id"
              element={<NewDish onSubmit={handleDishSubmit} />}
              errorElement={<ErrorPage />}
            />

           
            <Route
              path="/commandes/all-commandes"
              element={<CommandTable />}
            />
            <Route
              path="/all-commandes/command-details/:id"
              element={<CommandDetail/>}
            />

            <Route
              path="/categories/new-categories"
              element={<NewCat onSubmit={handleCategSubmit} />}
            />
            <Route
              path="/categories/edit-categories/:id"
              element={<NewCat onSubmit={handleCategSubmit} />}
            />
            <Route path="/categories/all-categories" element={<AllCats />} />

            <Route
              path="/users/new-user"
              element={<NewUser onSubmit={handleUserSubmit} />}
            />
            <Route
              path="/users/edit-user/:id"
              element={<NewUser onSubmit={handleUserSubmit} />}
            />
            <Route path="/users/all-users" element={<AllUsers />} />
          </Routes>
        </AdminPanelLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
