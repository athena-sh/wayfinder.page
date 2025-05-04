import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Digital Navigation Services",
    Svg: require("@site/static/img/undraw_location-search_nesh.svg").default,
    description: (
      <>
        We help individuals and organizations confidently navigate the digital
        landscape. Our approach ensures you master technology, productivity, and
        personal growth-no more getting lost in the maze.
      </>
    ),
  },
  {
    title: "Knowledge Management",
    Svg: require("@site/static/img/undraw_road-to-knowledge_f9zn.svg").default,
    description: (
      <>
        We help you turn digital clutter into clear, actionable knowledge. Our
        approach ensures you systematically capture, organize, and use
        information-so your digital workspace supports your goals.
      </>
    ),
  },
  {
    title: "Workflow Automation",
    Svg: require("@site/static/img/undraw_teamwork_8val.svg").default,
    description: (
      <>
        Eliminate repetitive tasks and build seamless workflows that save time
        and reduce mental clutter. Our solutions let you focus on what matters
        while systems handle the rest.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
