import "./App.css";
import Layout from "./Layout";
import { Route, Routes } from "react-router-dom";
import CreatePost from "./CreatePost";
import Index from "./Index";
import Individualpost from "./Individualpost";
import EditPost from "./EditPost";
import Signin from "./SignIn";
import PrivateRoute from "./PrivateRoute";
import Signup from "./SignUp";
import ShowBlogs from "./ShowBlogs";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="/blog/:id" element={<Individualpost />} />
        <Route element={<PrivateRoute />}>
          <Route path="/create" element={<CreatePost />} exact />
          <Route path="/edit/:id" element={<EditPost />} exact />
          <Route path="/blogs" element={<ShowBlogs />} />
        </Route>
      </Route>

      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
