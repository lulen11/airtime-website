import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import styles from "./ImageCaptionBlock.module.scss";

/**
 * Props for `ImageCaptionBlock`.
 */
export type ImageCaptionBlockProps =
  SliceComponentProps<Content.ImageCaptionBlockSlice>;

/**
 * Component for "ImageCaptionBlock" Slices.
 */
const ImageCaptionBlock = ({ slice }: ImageCaptionBlockProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`${styles.sectionImageBlock} ${styles[slice.primary.image_align]}`}
    >
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.imageWrapper}>
            <PrismicNextImage
              className={styles.image}
              field={slice.primary.image}
            />
          </div>
          <p>{slice.primary.caption}</p>
        </div>
      </div>
    </section>
  );
};

export default ImageCaptionBlock;
