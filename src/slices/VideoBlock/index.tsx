import React from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText, PrismicText } from "@prismicio/react";

// /**
//  * Props for `VideoBlock`.
//  */
export type VideoBlockProps = SliceComponentProps<Content.VideoBlockSlice>;

// /**
//  * Component for "VideoBlock" Slices.
//  */
const VideoBlock = ({ slice }: VideoBlockProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {/* Placeholder component for video_block (variation: {slice.variation})
      Slices */}
      <div>
        {/* <h2>{slice.primary.title}</h2> */}
        <PrismicRichText field={slice.primary.title} />
        <PrismicRichText field={slice.primary.description} />
        {/* <video src={slice.primary.video_url} controls></video> */}
      </div>
    </section>
  );
};

// export default VideoBlock;

// const VideoBlock = ({ slice }: VideoBlockProps): JSX.Element => {
//   return (
//     <section>
//       <div>
//         {/* <h2>{slice.primary.title}</h2> */}
//         <PrismicRichText field={slice.primary.title} />
//         <PrismicRichText field={slice.primary.description} />
//         {/* <video src={slice.primary.video_url} controls></video> */}
//       </div>
//     </section>
//   );
// };

export default VideoBlock;
