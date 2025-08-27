import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  const pages = [
    {
      title: "Activities",
      description: "Comprehensive activity management system with support cases, meeting summaries, and project tracking",
      path: "/activities",
      icon: "📋",
      features: ["Activity tracking", "Status management", "Search & filtering", "Sortable tables", "Question management"]
    },
    {
      title: "Button Demo",
      description: "Interactive showcase of the design system button components with all variants and states",
      path: "/button-demo",
      icon: "🔘",
      features: ["Multiple variants", "Different sizes", "Icon support", "Interactive states", "Design system"]
    }
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>⚔️</span>
            <span className={styles.logoText}>Samurai UI</span>
          </div>
          <nav className={styles.nav}>
            <Link href="/" className={styles.navLink}>Home</Link>
            <Link href="/activities" className={styles.navLink}>Activities</Link>
            <Link href="/button-demo" className={styles.navLink}>Components</Link>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Samurai UI</h1>
          <p className={styles.subtitle}>Modern, scalable design system for enterprise applications</p>
          <p className={styles.description}>
            Built with Next.js and TypeScript, featuring a comprehensive activity management system 
            and a robust design system for building consistent user interfaces.
          </p>
        </div>

        <div className={styles.pagesGrid}>
          {pages.map((page) => (
            <Link key={page.path} href={page.path} className={styles.pageCard}>
              <div className={styles.pageIcon}>{page.icon}</div>
              <h2 className={styles.pageTitle}>{page.title}</h2>
              <p className={styles.pageDescription}>{page.description}</p>
              <div className={styles.pageFeatures}>
                {page.features.map((feature, index) => (
                  <span key={index} className={styles.featureTag}>
                    {feature}
                  </span>
                ))}
              </div>
              <div className={styles.pageArrow}>→</div>
            </Link>
          ))}
        </div>

        <div className={styles.info}>
          <h3>Getting Started</h3>
          <p>Navigate to any page above to explore the application features. The Activities page demonstrates a full-featured data management interface, while the Button Demo showcases our design system components.</p>
        </div>
      </main>
    </div>
  );
}
