import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/themeContext";
import { ContentServiceProvider } from "./context/contentServiceContext";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectPostPage from "./pages/ProjectPostPage";
import AboutPage from "./pages/AboutPage";
import NewsletterPage from "./pages/NewsletterPage";

function App() {
  return (
    <ThemeProvider>
      <ContentServiceProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="blog/:slug" element={<BlogPostPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="projects/:slug" element={<ProjectPostPage />} />
              <Route path="about" element={<AboutPage />} />

              {/* Newsletter route */}
              <Route path="newsletter" element={<NewsletterPage />} />

              {/* 404 page */}
              <Route
                path="*"
                element={
                  <div className="not-found">
                    <h1>404</h1>
                    <p>Page not found</p>
                  </div>
                }
              />
            </Route>
          </Routes>
        </Router>
      </ContentServiceProvider>
    </ThemeProvider>
  );
}

export default App;
