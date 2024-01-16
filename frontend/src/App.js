import React from "react";
import { Switch, Route, Routes } from "react-router-dom";

import HomePage from "./pages/Home/Home";
import Gallery from "./pages/Gallery/Gallery";

import "./global-styles.sass";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Features from "./pages/Home/components/Features/Features";
import FeaturedEvents from "./pages/Home/components/FeaturedEvents/FeaturedEvents";
import FeaturedArticles from "./pages/Home/components/FeaturedArticles/FeaturedArticles";
import Articles from "./pages/Articles/Articles";
import Blog from "./pages/Blog/Blog";
import Events from "./pages/Events/Events";
import ContactUs from "./pages/ContactUs/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import AdminPage from "./pages/Admin/AdminPage";
import Login from "./pages/Admin/components/Login/Login";
import PrivateRoute from "./routes/PrivateRoute";
import Error404page from "./pages/Errors/Error404page";

function App() {
  return (
    <div id="al-ghadiya–website">
      <Navbar />
      <Routes>
        <Route element={<Error404page />} path="*" />
        <Route element={<HomePage />} path="/" />
        <Route element={<Articles />} path="blogs" />
        <Route element={<Blog />} path="blog/:slug" />
        <Route element={<Events />} path="events" />
        <Route element={<Gallery />} path="gallery" />
        <Route element={<PrivacyPolicy />} path="privacy-policy" />
        <Route element={<ContactUs />} path="contact-us" />
        <Route element={<PrivateRoute />} path="/">
          <Route element={<AdminPage />} path="admin" />
          <Route element={<AdminPage subpage="blogs" />} path="admin/blogs" />
          <Route
            element={<AdminPage subpage="blogadd" />}
            path="admin/blog/new"
          />
          <Route
            element={<AdminPage subpage="blogedit" />}
            path="admin/blog/:slug"
          />
          <Route
            element={<AdminPage subpage="blogedit" />}
            path="admin/blog/:slug"
          />
          <Route
            element={<AdminPage subpage="gallery" />}
            path="admin/gallery"
          />
          <Route
            element={<AdminPage subpage="analytics" />}
            path="admin/analytics"
          />
        </Route>
        <Route element={<Login />} path="login" />
      </Routes>
      <div style={{ paddingTop: 450 }} className="footer-separator"></div>
      <Footer />
    </div>
  );
}

export default App;
