import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";

/**
 * Props for `PlayerCard`.
 */
export type PlayerCardProps = SliceComponentProps<Content.PlayerCardSlice>;

/**
 * Component for "PlayerCard" Slices.
 */
const PlayerCard = ({ slice }: PlayerCardProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <h3>{slice.primary.player_name}</h3>
      <ul>
        <>
          {slice.primary.player_stats.map((item) => (
            <li key={item.stat_label}>
              <strong>{item.stat_label}: </strong>
              {item.stat}
            </li>
          ))}
        </>
      </ul>
      <PrismicRichText field={slice.primary.player_bio} />
      <hr />
      <PrismicRichText field={slice.primary.player_story} />
    </section>
  );
};

export default PlayerCard;
