import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Books from "./pages/Books";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Drones from "./pages/Drones";
import Employees from "./pages/Employees";
import Pilots from "./pages/Pilots";
import Orders from "./pages/Orders";
import Views from "./pages/Views";
import "./style.css";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element={<Books/>}/>
          <Route path = "/customer" element={<Customers/>}/>
          <Route path = "/employee" element={<Employees/>}/>
          <Route path = "/product" element={<Products/>}/>
          <Route path = "/drone" element={<Drones/>}/>
          <Route path = "/pilot" element={<Pilots/>}/>
          <Route path = "/order" element={<Orders/>}/>
          <Route path = "/view" element={<Views/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
