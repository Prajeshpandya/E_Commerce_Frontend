import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader";

//normal import 
// import Home from "./pages/Home";

//for LAZY Loading.. 
const Search = lazy(() => import("./pages/Search"));
const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/Cart"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loader/>}>
        <Routes>
          {/* Headers */}
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Suspense>

    </Router>
  );
}


export default App;
