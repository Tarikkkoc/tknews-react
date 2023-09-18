import "./App.css";
import Layout from "./components/layout/Layout";

import { Routes, Route, useLocation } from "react-router-dom";
import News from "./pages/News";
import Homepage from "./pages/Homepage";
import Weather from "./pages/Weather";
import NewsDetail from "./pages/NewsDetail";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Account from "./components/auth/Account";

function App() {
  return (
    <div className="bg-gray-100 dark:bg-zinc-950">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path=":path">
            <Route index element={<News />} />
            <Route path=":id" element={<NewsDetail />} />
          </Route>
          <Route path="/hava" element={<Weather />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
