import LandingPageHome from "./components/LandingPageHome";
import LandingPage from "./components/LandingPage";
import Signup from "./components/signup";
import Signup1 from "./components/signup1";
import LandingHeaderHome from "./components/LandingHeaderHome";
import LandingHeader from "./components/LandingHeader";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
      path: "/Login",
      element: (
        <>
          <Signup />
        </>
      ),
    },
    {
      path: "/Home",
      element: (
        <>
          <LandingHeaderHome />
          <LandingPageHome />
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
