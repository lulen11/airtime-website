import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import Button from "../../components/Button/Button";
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
      className={`${styles.sectionGridContentBlock} ${styles[slice.variation]}`}
    >
      <div className={`${styles.wrapper} `}>
        <h3>{slice.primary.title}</h3>
        <div className={styles.grid}>
          {slice.primary.grid_items?.map((item, index) => (
            <div className={styles.gridItem} key={index}>
              <PrismicRichText field={item.content} />
              {item.button_label && (
                <div className={styles.btnWrapper}>
                  <Button link={item.button_link} label={item.button_label} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GridContentBlock;
