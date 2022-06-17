import "./styles/App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./routes/SignUp";
import Login from "./routes/Login";
import Home from "./routes/Home";
import Create from "./routes/Create";
import RequireAuth from "./components/ProtectedRoutes/RequireAuth";
import DetailedFeed from "./components/DetailedFeed";
import PersistLogin from "./components/PersistLogin";
import Search from "./routes/Search";
import Popular from "./routes/Popular";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route element={<PersistLogin />}>
          <Route path="/posts/:id" element={<DetailedFeed />} />
          <Route path="/" element={<Home />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/search" element={<Search />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          {/* Private Routes */}

          <Route element={<RequireAuth />}>
            <Route path="/create" element={<Create />} />
          </Route>
        </Route>

        {/* Remaining All */}
        <Route
          path="*"
          element={
            <div className={`h-screen flex justify-center items-center`}>
              <h1 className={`text-white text-center text-2xl`}>
                Page not found
              </h1>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
