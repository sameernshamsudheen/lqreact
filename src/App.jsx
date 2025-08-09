import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ImageReveal from "./components/ImageReveal";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home route */}
        <Route path="/" element={<ImageReveal />} />

        {/* Example: Add more routes here */}
        <Route path="/about" element={<h1>About Page</h1>} />
        <Route path="/contact" element={<h1>Contact Page</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
