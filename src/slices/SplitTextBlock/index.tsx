"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/prismicio";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import PlayerCard from "../../components/PlayerCard/PlayerCard";
import { PlayerData } from "../../components/PlayerCard/types";

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
  const [coaches, setCoaches] = useState<PlayerData[]>([]);

  useEffect(() => {
    const fetchCoaches = async () => {
      const client = createClient();
      const coachIds = [slice.primary.coach_1.id, slice.primary.coach_2.id];

      const response = await client.getByIDs(coachIds, {
        fetchLinks: [
          "player_card.player_name",
          "player_card.player_position",
          "player_card.image",
          "player_card.player_stats",
        ],
      });

      const coachData = response.results.map((coach) => ({
        uid: coach.uid,
        player_name: (coach.data as any).player_name,
        player_position: (coach.data as any).player_position,
        image: (coach.data as any).image,
        player_stats: (coach.data as any).player_stats,
      }));

      setCoaches(coachData);
    };

    fetchCoaches();
  }, [slice.primary]);

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
      className={`${styles.sectionSplitTextBlock} ${styles[slice.variation]}`}
    >
      <h3 className={styles.sectionTitle}>
        <PrismicRichText field={slice.primary.section_title} />
      </h3>
      <div className={`${styles.wrapper} `}>
        <div className={styles.column}>
          <div className={styles.contentWrapper}>
            {coaches[0] && (
              <div className={styles.playerCardWrapper}>
                <PlayerCard player={coaches[0]} key={coaches[0].uid} />
              </div>
            )}

            <div className={styles.content}>
              <span className={styles.eyebrow}>
                {slice.primary.heading_one_eyebrow}
              </span>
              <PrismicRichText field={slice.primary.heading_one} />
              <PrismicRichText field={slice.primary.body_content_one} />
              <PrismicNextLink field={slice.primary.link_one}>
                <span>{slice.primary.link_label_one}</span>
              </PrismicNextLink>
            </div>
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.contentWrapper}>
            {coaches[1] && (
              <div className={styles.playerCardWrapper}>
                <PlayerCard player={coaches[1]} key={coaches[1].uid} />
              </div>
            )}
            <div className={styles.content}>
              <span className={styles.eyebrow}>
                {slice.primary.heading_two_eyebrow}
              </span>
              <PrismicRichText field={slice.primary.heading_two} />
              <PrismicRichText field={slice.primary.body_content_two} />
              <PrismicNextLink field={slice.primary.link_two}>
                <span>{slice.primary.link_label_two}</span>
              </PrismicNextLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SplitTextBlock;
