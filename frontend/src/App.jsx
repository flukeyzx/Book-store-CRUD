import { Routes, Route } from "react-router-dom";
import CreateBook from "./pages/CreateBook.jsx";
import Home from "./pages/Home.jsx";
import ShowBook from "./pages/ShowBook.jsx";
import UpdateBook from "./pages/UpdateBook.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books/create" element={<CreateBook />} />
      <Route path="/books/details/:id" element={<ShowBook />} />
      <Route path="/books/edit/:id" element={<UpdateBook />} />
    </Routes>
  );
}

export default App;
