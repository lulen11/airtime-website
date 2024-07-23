import React from "react";
// import { createClient } from "@/prismicio";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import styles from "./PlayerCard.module.scss";

type PlayerCardProps = {
  player: {
    uid: string;
    player_name: string;
    player_position: string;
    image?: any; // Adjust this type based on your actual image field type
    player_stats?: { stat_label: string; stat: string }[];
  };
};

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  const { uid, player_name, player_position, image, player_stats } = player;

  // export default async function PlayerCard() {
  // const client = createClient();

  return (
    <>
      <div className={styles.playerCard} key={uid}>
        <a href={`/players/${uid}`}>
          <div className={styles.playerCardInner}>
            <div className={styles.playerCardFront}>
              <h3>
                {player_name} <br />
                <span>{player_position}</span>
              </h3>
              {image && <PrismicNextImage field={image} />}
            </div>
            <div className={styles.playerCardBack}>
              <h3>{player_name}</h3>
              <ul>
                <li>
                  <strong>Position:</strong> {player_position}
                </li>
                {player_stats?.map((item) => (
                  <li key={item.stat_label}>
                    <strong>{item.stat_label}: </strong>
                    {item.stat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </a>
      </div>
      {/* <div className={styles.playerCard} key={player.uid}>
        <a href={`/players/${player.uid}`}>
          <div className={styles.playerCardInner}>
            <div className={styles.playerCardFront}>
              <h3>
                {player_name} <br />
                <span>{player_position}</span>
              </h3>
              {image && <PrismicNextImage field={image} />}
            </div>
            <div className={styles.playerCardBack}>
              <h3>{player_name}</h3>
              <ul>
                <li>
                  <strong>Position:</strong> {player_position}
                </li>
                {player_stats?.map((item) => (
                  <li key={item.stat_label}>
                    <strong>{item.stat_label}: </strong>
                    {item.stat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </a>
      </div> */}
    </>
  );
};

export default PlayerCard;
