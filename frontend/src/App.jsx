
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddVisitor from "./pages/AddVisitor";
import VisitorList from "./pages/VisitorList";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<AddVisitor />} />
        <Route path="/list" element={<VisitorList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;