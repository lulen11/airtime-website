import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import Button from "../../components/Button";
import styles from "./TextBlock.module.scss";

/**
 * Props for `TextBlock`.
 */
export type TextBlockProps = SliceComponentProps<Content.TextBlockSlice>;

/**
 * Component for "TextBlock" Slices.
 */
const TextBlock = ({ slice }: TextBlockProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      // className={`w-full h-auto rounded-3xl ${["default"].includes(slice.variation) ? "" : "text-center mx-auto"}`.trim()}
      className={`${styles.sectionTextBlock} w-full h-auto rounded-3xl ${slice.variation === "textBlockCenterWithButton" ? styles.sectionTextBlockCenter + " text-center mx-auto" : ""}`.trim()}
    >
      <div className={styles.wrapper}>
        <PrismicRichText field={slice.primary.title_field} />

        <div
          className={`${slice.variation === "textBlockWithButton" ? styles.contentLeft : styles.contentCenter}`}
        >
          <PrismicRichText field={slice.primary.body_field} />

          {/* NOTE: This logic: {slice.variation && ( ... checks if it's *any* variation 
        where as what I've used checks for specifically named variations */}
          {["textBlockCenterWithButton", "textBlockWithButton"].includes(
            slice.variation
          ) && (
            <div className={styles.btnWrapper}>
              <Button
                link={slice.primary.button_link}
                label={slice.primary.button_label}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TextBlock;
