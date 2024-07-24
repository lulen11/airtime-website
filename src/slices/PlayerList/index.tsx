"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/prismicio";
import { SliceComponentProps, SliceLike } from "@prismicio/react";
import PlayerCard from "../../components/PlayerCard/PlayerCard";
import {
  PlayerData,
  PrismicPlayerDocument,
  isPrismicPlayerDocument,
} from "../../components/PlayerCard/types";
import styles from "./PlayerList.module.scss";

type PlayerListSlice = SliceLike<string> & {
  primary: {
    player_1: { id: string };
    player_2: { id: string };
    players: { id: string };
  };
};

type PlayerListProps = SliceComponentProps<PlayerListSlice>;

// type PlayerCardData = {
//   uid: string;
//   player_name: string;
//   player_position: string;
//   image?: any;
//   player_stats?: { stat_label: string; stat: string }[];
// };

const PlayerList = ({ slice }: PlayerListProps): JSX.Element => {
  const [players, setPlayers] = useState<PlayerData[]>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const client = createClient();
      const playerIds = [
        slice.primary.player_1.id,
        slice.primary.player_2.id,
        slice.primary.players.id,
      ];

      const response = await client.getByIDs(playerIds, {
        fetchLinks: [
          "player_card.player_name",
          "player_card.player_position",
          "player_card.image",
          "player_card.player_stats",
        ],
      });

      // console.log("Fetched documents:", response.results);

      // // Debugging type guard
      // response.results.forEach((doc) => {
      //   console.log("Checking document:", doc);
      //   console.log("Is player document:", isPrismicPlayerDocument(doc));
      // });

      const playerData = response.results.map((player) => ({
        uid: player.id,
        player_name: (player.data as any).player_name,
        player_position: (player.data as any).player_position,
        image: (player.data as any).image,
        player_stats: (player.data as any).player_stats,
      }));

      setPlayers(playerData);
    };

    fetchPlayers();
  }, [slice.primary]);

  return (
    <section>
      <h2>Player List</h2>
      <section className={styles.playerCardsGrid}>
        {players.map((player) => (
          <PlayerCard player={player} key={player.uid} />
        ))}
      </section>
    </section>
  );
};

export default PlayerList;
