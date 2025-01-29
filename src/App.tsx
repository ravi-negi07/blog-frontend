import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { SidebarProvider } from "./components/ui/sidebar";
import {
  Login,
  SignUp,
  Header,
  About,
  Home,
  Dashboard,
  BlogCreator,
  BlogDisplay,
  BlogStatus,
} from "../src/utills";

const App = () => {
  return (
    <>
      <Suspense fallback={<div>....loading</div>}>
        <Header />
      </Suspense>

      <Suspense fallback={<div>...Loading</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/dashboard"
            element={
              <SidebarProvider>
                <Dashboard />
              </SidebarProvider>
            }
          />
          <Route path="/create-post" element={<BlogCreator />} />
          <Route path="/display/:_id" element={<BlogDisplay />} />
          <Route path="/status" element={<BlogStatus />} />
        </Routes>
      </Suspense>

      <ToastContainer />
    </>
  );
};

export default App;
