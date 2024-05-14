import "./App.css";
import Home from "./components/Home";
import {
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import MovieDetails from "./components/MovieDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
