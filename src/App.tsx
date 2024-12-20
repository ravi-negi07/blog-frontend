import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "././routes/Routes";
import Header from "./components/layout/Header";

const App: React.FC = () => {
  const renderRoutes = (routes) =>
    routes.map(({ path, component: Component, children }) => (
      <Route
        key={path}
        path={path}
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Component />
          </Suspense>
        }
      >
        {children && renderRoutes(children)}{" "}
      </Route>
    ));

  return (
    <BrowserRouter>
      <Header />
      <Routes>{renderRoutes(routes)}</Routes>
    </BrowserRouter>
  );
};

export default App;
