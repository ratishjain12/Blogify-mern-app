import "./App.css";
import Layout from "./Layout";
import { Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import { UserContextProvider } from "./UserContext";
import CreatePost from "./CreatePost";
import Index from "./Index";
import Individualpost from "./Individualpost";
import EditPost from "./EditPost";
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<Individualpost />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
