import "./App.css";
import Home from "./components/Home";
import Movie from "./components/Movies";
import TvSeries from "./components/TvSeries";
import Bookmark from "./components/Bookmark";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Searchbar from "./components/layout/SearchBar";
import Topbar from "./components/layout/Topbar";
import PageNotFound from "./components/PageNotFound";
import Loading from "./components/Loading";
import PrivateRoute from "./components/PrivateRoute";
import ItemInformationPage from "./components/ItemInformationPage";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="Login" element={<Login />} />
          <Route path="Signup" element={<Signup />} />
          <Route path="PageNotFound" element={<PageNotFound />} />
          <Route path="Loading" element={<Loading />} />

          <Route path="/" element={<PrivateRoute />}>
            <Route path="Home" element={<Home />} />
            <Route path="Movie" element={<Movie />} />
            <Route path="TvSeries" element={<TvSeries />} />
            <Route path="Bookmark" element={<Bookmark />} />
            <Route path="Sidebar" element={<Sidebar />} />
            <Route path="Searchbar" element={<Searchbar />} />
            <Route
              path="ItemInformationPage"
              element={<ItemInformationPage />}
            />
            <Route path="Topbar" element={<Topbar />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
