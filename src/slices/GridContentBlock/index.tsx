import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

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
    >
      Placeholder component for grid_content_block (variation: {slice.variation}
      ) Slices
    </section>
  );
};

export default GridContentBlock;
