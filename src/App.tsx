import "./App.css";
import Details from "./components/Details";
import Home from "./components/Home";
import { Route, BrowserRouter, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/:type?" element={<Home />} />
          <Route path="/:type/:id" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
