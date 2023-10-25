
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LanguageContextProvider from "./contexts/LanguageContext";
import UserContextProvider from "./contexts/UserContext";
import AlertContextProvider from "./contexts/AlertContext";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Notes from "./components/Notes/Notes";
import Settings from "./components/Settings/Settings";



function App() {

  return (
    <LanguageContextProvider>
      <AlertContextProvider>
        <UserContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="login/" element={<Login />} />
                <Route path="register/" element={<Register />} />
                <Route path="notes/" element={<Notes />} />
                <Route path="settings/" element={<Settings />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserContextProvider>
      </AlertContextProvider>
    </LanguageContextProvider>
  );
}

export default App;