// src/App.jsx
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer";


function App() {
  return (
    <Router>
      <Navbar />

      <div className="pt-16 min-h-screen flex flex-col">
        {/* MAIN CONTENT */}
        <div className="flex-grow">
          <AppRoutes />
        </div>

        {/* FOOTER */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;