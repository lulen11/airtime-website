import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

import Button from "../../components/Button/Button";
import styles from "./TextBlock.module.scss";

/**
 * Props for `TextBlock`.
 */
export type TextBlockProps = SliceComponentProps<Content.TextBlockSlice>;

/**
 * Component for "TextBlock" Slices.
 */
const TextBlock = ({ slice }: TextBlockProps): JSX.Element => {
  // Type guards to check if [text_align] (slice fields) exist
  const textAlign =
    "text_align" in slice.primary ? slice.primary.text_align : "";
  const sliceImage = "image" in slice.primary ? slice.primary.image : null;
  const titleField =
    "title_field" in slice.primary ? slice.primary.title_field : null;
  const bodyField =
    "body_field" in slice.primary ? slice.primary.body_field : null;
  const buttonLink =
    "button_link" in slice.primary ? slice.primary.button_link : null;
  const buttonLabel =
    "button_label" in slice.primary ? slice.primary.button_label : null;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`${styles.sectionTextBlock} ${styles[slice.variation]} w-full ${textAlign}`}
    >
      <div
        className={`${styles.wrapper} ${textAlign === "text-left" ? styles.wrapperLeft : ""}`}
      >
        {["textBlockWithImage"].includes(slice.variation) && sliceImage && (
          <PrismicNextImage
            field={sliceImage}
            className="w-full h-auto rounded-3xl"
          />
        )}

        <div
          className={`${slice.variation && textAlign === "text-left" ? styles.contentLeft : styles.contentCenter}`}
        >
          {titleField && <PrismicRichText field={titleField} />}
        </div>

        <div
          className={`${slice.variation && textAlign === "text-left" ? styles.contentLeft : styles.contentCenter}`}
        >
          {bodyField && <PrismicRichText field={bodyField} />}

          {["textBlockWithButton"].includes(slice.variation) && (
            <div className={styles.btnWrapper}>
              <Button link={buttonLink} label={buttonLabel} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TextBlock;
