// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import UploadImages from "./pages/UploadImages";
import {UploadDocs} from "./pages/UploadDocs";

export default function App() {
  return (
    <Router>
      <Routes>
       
        <Route path="/" element={<Dashboard />}>
          <Route path="upload-images" element={<UploadImages />} />
          <Route path="upload-documents" element={<UploadDocs />} />
        </Route>
      </Routes>
    </Router>
  );
}
