import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({ counts }) {
  return (
    <div className="app-shell">
      <Sidebar counts={counts} />

      <main className="main-content">
        <Header counts={counts} />
        <section className="page-body">
          <Outlet />
        </section>
      </main>
    </div>
  );
}