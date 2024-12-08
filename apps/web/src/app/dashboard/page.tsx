import style from "./Dashboard.module.scss";

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
