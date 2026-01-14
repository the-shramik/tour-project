import React from "react";
import Routing from "./Routing/Routing";
import { Toaster } from "sonner";

const App = () => {
  return (
    <>
      <Routing />
      <Toaster position="top-right" />
    </>
  );
};

export default App;
