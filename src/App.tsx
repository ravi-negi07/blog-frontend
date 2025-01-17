import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { Login, SignUp, Header } from "../src/utills";
const App = () => {
  return (
    <>
      <Suspense fallback={<div>....loading</div>}>
        <Header />
      </Suspense>

      <Suspense fallback={<div>...Loading</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </Suspense>

      <ToastContainer />
    </>
  );
};

export default App;
