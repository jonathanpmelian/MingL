import { Metadata } from "next";
import style from "./Dashboard.module.scss";

export const metadata: Metadata = {
  title: "MingL - Dashboard",
  description: "Your personal dashboard page",
};

function DashboardPage() {
  return (
    <main className={style.dashboard}>
      <section className={style.topBar}>
        <input type="text" placeholder="Search for events..." />
      </section>
    </main>
  );
}

export default DashboardPage;
