// src/pages/index.tsx
import type { ReactNode } from "react";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Logo from "@site/static/img/logo.svg";
import styles from "./index.module.css";

export default function Home(): ReactNode {
  return (
    <Layout
      title="Charting Simple Routes to Success"
      description="Your roadmap to resilience, creativity, and financial freedom."
    >
      {/* Hidden meta so “Wayfinder” is indexed even if the word isn’t visible */}
      <Head>
        <meta name="keywords" content="Wayfinder" />
      </Head>

      <header className={styles.heroBanner}>
        <div className="container">
          <div className={styles.heroInner}>
            {/* TEXT */}
            <div className={styles.heroCopy}>
              <Heading as="h1" className={styles.heroTitle}>
                Charting&nbsp;
                <span className={styles.highlight}>Simple</span>
                <br className={styles.desktopBreak} />
                &nbsp;
                <span className={styles.highlight}>Routes</span>
                <br />
                to&nbsp;
                <span className={styles.highlight}>Success</span>
              </Heading>

              <p className={styles.heroSubtitle}>
                Your roadmap to resilience, creativity, and financial freedom.
              </p>

              <div className={styles.buttons}>
                <Link
                  className="button button--primary button--lg"
                  to="https://wayfinder.eo.page/v6y87"
                >
                  Join&nbsp;Wayfinder&nbsp;
                </Link>
                <Link
                  className="button button--secondary button--lg"
                  to="/blog"
                >
                  Visit&nbsp;Blog
                </Link>
              </div>
            </div>

            {/* LOGO */}
            <Logo className={styles.heroLogo} />
          </div>
        </div>
      </header>

      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
