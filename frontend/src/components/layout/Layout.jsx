import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({ children, active, setActive, counts }) {
  return (
    <div className="app-shell">
      <Sidebar active={active} setActive={setActive} counts={counts} />

      <main className="main-content">
        <Header counts={counts} />
        <section className="page-body">{children}</section>
      </main>
    </div>
  );
}