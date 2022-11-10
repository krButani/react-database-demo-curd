import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import Add from "./component/Add";
import AddStudent from "./component/addStudent";

function App() {
  return (
    <div>
      <Routes>
        <Route exact index path="/" element={<Home />} />
        <Route exact path="/add" element={<Add />} /> {/*for insert*/}
        <Route exact path="/add/:id" element={<Add />} />
        {/*for update */}
        <Route exact path="/addStudent" element={<AddStudent />} />
      </Routes>
    </div>
  );
}

export default App;
