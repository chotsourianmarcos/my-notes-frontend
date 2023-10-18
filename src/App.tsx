import UserContextProvider from "./contexts/UserContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Notes from "./components/Notes/Notes";
import AlertContextProvider from "./contexts/AlertContext";

function App() {

  return (
    <AlertContextProvider>
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login/" element={<Login />} />
              <Route path="register/" element={<Register />} />
              <Route path="notes/" element={<Notes />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </AlertContextProvider>
  );
}

export default App;