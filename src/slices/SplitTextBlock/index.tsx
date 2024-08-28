import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

import styles from "./SplitTextBlock.module.scss";

/**
 * Props for `SplitTextBlock`.
 */
export type SplitTextBlockProps =
  SliceComponentProps<Content.SplitTextBlockSlice>;

/**
 * Component for "SplitTextBlock" Slices.
 */
const SplitTextBlock = ({ slice }: SplitTextBlockProps): JSX.Element => {
  // Type guards to check if slice fields exist
  // const titleField =
  //   "title_field" in slice.primary ? slice.primary.title_field : null;
  // const heading_one_eyebrow = slice.primary?.heading_one_eyebrow ?? null;
  // const heading_one = slice.primary?.heading_one ?? null;
  // const body_content_one = slice.primary?.body_content_one ?? null;
  // const link_one = slice.primary?.link_one ?? null;
  // const link_label_one = slice.primary?.link_label_one ?? null;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.sectionSplitTextBlock}
    >
      <h3 className={styles.sectionTitle}>Airtime Assist</h3>
      <div className={`${styles.wrapper} `}>
        <div className={styles.column}>
          <span className={styles.eyebrow}>
            {slice.primary.heading_one_eyebrow}
          </span>
          <div className={styles.content}>
            <PrismicRichText field={slice.primary.heading_one} />
            <PrismicRichText field={slice.primary.body_content_one} />
            <PrismicNextLink field={slice.primary.link_one}>
              <span>{slice.primary.link_label_one}</span>
            </PrismicNextLink>
          </div>
        </div>
        <div className={styles.column}>
          <span className={styles.eyebrow}>
            {slice.primary.heading_two_eyebrow}
          </span>
          <div className={styles.content}>
            <PrismicRichText field={slice.primary.heading_two} />
            <PrismicRichText field={slice.primary.body_content_two} />
            <PrismicNextLink field={slice.primary.link_two}>
              <span>{slice.primary.link_label_two}</span>
            </PrismicNextLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SplitTextBlock;
