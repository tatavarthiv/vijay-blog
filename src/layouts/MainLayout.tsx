import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";

export default function MainLayout() {
  return (
    <div className="site-container">
      <Header />
      <main className="main-content">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
