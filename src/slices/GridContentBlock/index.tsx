import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import styles from "./GridContentBlock.module.scss";

/**
 * Props for `GridContentBlock`.
 */
export type GridContentBlockProps =
  SliceComponentProps<Content.GridContentBlockSlice>;

/**
 * Component for "GridContentBlock" Slices.
 */
const GridContentBlock = ({ slice }: GridContentBlockProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.sectionGridContentBlock}
    >
      <div className={`${styles.wrapper} `}>
        <h3>{slice.primary.title}</h3>
        {slice.primary.grid_items?.map((item, index) => (
          <div className={styles.grid} key={index}>
            <PrismicRichText field={item.content} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default GridContentBlock;
