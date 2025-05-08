import React from "react";
import { AppRoutes } from "./routes";
import Header from "./components/Header/Header";

export default function App() {
  return (
    <div className="container">
      <Header/>
      <AppRoutes />
    </div>
  );
}
