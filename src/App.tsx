import { BrowserRouter, Routes, Route } from "react-router";
import { CreateUserForm } from "./components/CreateUserForm/CreateUserForm";
import { LoginUserForm } from "./components/LoginUserForm/LoginForm";
import { Dashboard } from "./pages/Dashboard";

export function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route
          path="/signup"
          element={<CreateUserForm />}
        />
        <Route
          path="/login"
          element={<LoginUserForm />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
      </Routes>
    </BrowserRouter>
  )  
}