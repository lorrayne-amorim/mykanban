import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { BoardPage } from "./pages/BoardPage";
import PageLayout from "./layouts/PageLayout";

function App() {
  return (
    <BrowserRouter basename="/mykanban">
      <PageLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/board/:id" element={<BoardPage />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
}

export default App;
