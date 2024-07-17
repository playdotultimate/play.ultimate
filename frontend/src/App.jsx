import LandingPageHome from "./components/LandingPageHome";
import LandingPage from "./components/LandingPage";
import Signup from "./components/signup";
import LandingHeaderHome from "./components/LandingHeaderHome";
import LandingHeader from "./components/LandingHeader";
import ProfileSetting from "./components/ProfileSetting";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'tailwindcss/tailwind.css';
import "./App.css";
import TournamentsPage from "./components/TournamentsPage";
import {TournamenEventRouter,TournamentHomeRouter} from "./TournamentRouter.jsx";

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
          <LandingHeaderHome active={'home'}/>
          <LandingPageHome />
        </>
      ),
    },
    {
      path: "/myprofile",
      element: (
        <>
          
          <ProfileSetting/>
        </>
      ),
    },{
      path: "/tournaments",
      element: (
        <>
          <LandingHeaderHome active={'tournaments'}/>
          <TournamentsPage/>
        </>
      ),
    },{
      path: "/tournaments/:name",
      element: (
        <>
          <TournamentHomeRouter/>
        </>
      ),
    },
    {
      path: "/tournaments/:name/:event",
      element: (
        <>
          <TournamenEventRouter/>
        </>
      ),
    }
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
