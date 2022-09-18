import React from "react";
import CreateBlog from "./create";
// import BlogView from "./show";
import BlogEdit from "./edit";
import SearchPage from "./pages/searchpage";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Signin from "./signup";
import { NavBar } from "./components/navbar";

// import fb from "./firebase";
// import useAuthState from "./hooks";
import { ProfilePage } from "./pages/ProfilePage";
import { BlogViewPage } from "./pages/BlogViewPage";

function App() {
  // const {user} = useAuthState(fb.auth());
  return (
    <Router>
      <NavBar/>
      <Routes>
            <Route exact path="/" element={<HomePage/>}/>
            <Route path="/signin/" element={<Signin/>}/>
            <Route path="/Create/" element={<CreateBlog/>}/>
            <Route path="/show/:id" element={<BlogViewPage/>}/>
            <Route path="/EditBlog/:id" element={<BlogEdit/>}/>
            <Route path="/Search/" element={<SearchPage/>}/>
            <Route path="/profile/" element={<ProfilePage/>}/>
        </Routes>
        
    </Router>
  );
}

export default App;
