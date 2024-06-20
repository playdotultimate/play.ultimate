import LandingPageHome from "./components/LandingPageHome";
import LandingPage from "./components/LandingPage";
import Signup from "./components/signup";
import Signup1 from "./components/signup1";
import LandingHeaderHome from "./components/LandingHeaderHome";
import LandingHeader from "./components/LandingHeader";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProfilePage from "./components/ProfilePage";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <LandingHeader />
          <LandingPage />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <Signup />
        </>
      ),
    },
    {
      path: "/home",
      element: (
        <>
          <LandingHeaderHome />
          <LandingPageHome />
        </>
      ),
    },
    {
      path: "/profile",
      element: (
        <>
          <LandingHeaderHome />
          <ProfilePage />
        </>
      ),
    },
  ]);

  return (
    <>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
