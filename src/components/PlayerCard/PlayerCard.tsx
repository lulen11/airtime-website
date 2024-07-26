import React from "react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import styles from "./PlayerCard.module.scss";
import { PlayerData } from "./types"; // Import types here

type PlayerCardProps = {
  player: PlayerData;
};

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  const { uid, player_name, player_position, image, player_stats } = player;

  return (
    <>
      <div className={styles.playerCard} key={uid}>
        <a href={`/players/${uid}`}>
          <div className={styles.playerCardInner}>
            <div className={styles.playerCardFront}>
              <h3 className={styles.name}>
                {player_name} <br />
                <span>{player_position}</span>
              </h3>
              {image && (
                <PrismicNextImage
                  className={styles.playerImage}
                  field={image}
                />
              )}
            </div>
            <div className={styles.playerCardBack}>
              <div className={styles.playerCardBackLogo}>&nbsp;</div>
              <div className={styles.playerDetails}>
                <h3 className={styles.name}>{player_name}</h3>
                <ul className={styles.stats}>
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
          </div>
        </a>
      </div>
    </>
  );
};

export default PlayerCard;
