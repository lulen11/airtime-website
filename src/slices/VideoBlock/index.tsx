import React from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import styles from "./VideoBlock.module.scss";

// /**
//  * Props for `VideoBlock`.
//  */
export type VideoBlockProps = SliceComponentProps<Content.VideoBlockSlice>;

// /**
//  * Component for "VideoBlock" Slices.
//  */
const VideoBlock = ({ slice }: VideoBlockProps): JSX.Element => {
  const { video } = slice.primary;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.sectionVideoBlock}
    >
      {/* Placeholder component for video_block (variation: {slice.variation})
      Slices */}
      <div>
        {/* <h2>{slice.primary.title}</h2> */}
        <PrismicRichText field={slice.primary.title} />
        <PrismicRichText field={slice.primary.description} />
        {/* <video src={slice.primary.video_url} controls></video> */}

        {video?.html ? (
          // Render embed HTML
          <div
            className={`${styles.embedContainer} ${styles.videoContainer}`}
            dangerouslySetInnerHTML={{ __html: video.html }}
          ></div>
        ) : (
          video?.embed_url && (
            // Fallback to rendering with an iframe

            <>
              <div className={styles.videoCover}></div>
              <iframe
                src={video.embed_url}
                title="Embedded Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles.video}
              ></iframe>
            </>
          )
        )}
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
