import { Navigate, Route, Routes } from "react-router";
import Home from "./Pages/Home";
import Navigation from "./Components/Navigation";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "./Context/MyContext";
import Auth from "./Pages/Auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateBlog from "./Pages/CreateBlog";
import { auth } from "./firebase-config";

function App() {
  const [sidebar, setSidebar] = useState(false);
  const { isMobile } = useContext(MyContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <>
      <ToastContainer position="top-center" />
      <div
        className={`main overflow-hidden transition-all lg:transition-none ease-in-out duration-500 ${
          sidebar && isMobile ? "grid-rows-[340px_1fr]" : "grid-rows-[70px_1fr]"
        }`}
      >
        <div className="header bg-[#f7f7f7]">
          <Navigation sidebar={sidebar} setSidebar={setSidebar} user={user} />
        </div>
        <main className="content bg-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/create"
              element={
                user?.uid ? <CreateBlog user={user} /> : <Navigate to="/" />
              }
            />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
