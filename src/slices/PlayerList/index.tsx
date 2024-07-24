"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/prismicio";
import { SliceComponentProps, SliceLike } from "@prismicio/react";
import PlayerCard from "../../components/PlayerCard/PlayerCard";
import styles from "./PlayerList.module.scss";

type PlayerListSlice = SliceLike<string> & {
  primary: {
    player_1: { id: string };
    player_2: { id: string };
    players: { id: string };
  };
};

type PlayerListProps = SliceComponentProps<PlayerListSlice>;

type PlayerCardData = {
  uid: string;
  player_name: string;
  player_position: string;
  image?: any; // Adjust this type based on your actual image field type
  player_stats?: { stat_label: string; stat: string }[];
};

// type PlayerInfo = { id: string; name: string; position: string };

const PlayerList = ({ slice }: PlayerListProps): JSX.Element => {
  const [players, setPlayers] = useState<PlayerCardData[]>([]);

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

      const playerData: PlayerCardData[] = response.results.map((player) => ({
        uid: player.id,
        player_name: player.data.player_name,
        player_position: player.data.player_position,
        image: player.data.image,
        player_stats: player.data.player_stats,
      }));

      setPlayers(playerData);

      // type PlayerCardDocumentData = {
      //   player_name: string;
      //   player_position: string;
      //   // add other fields as needed
      // };

      // function isPlayerCardData(data: any): data is PlayerCardDocumentData {
      //   return data && "player_name" && "player_position" in data;
      // }

      // const playerData = response.results.map((player) => ({
      //   id: player.id,
      //   name: (player.data as PlayerCardDocumentData).player_name,
      //   position: (player.data as PlayerCardDocumentData).player_position,
      // }));
    };

    fetchPlayers();
  }, [slice.primary]);

  return (
    <section>
      <h2>Player List</h2>
      <section className={styles.playerCardsGrid}>
        {players.map((player) => (
          <div className={styles.playerCard} key={player.uid}>
            <PlayerCard player={player} />
          </div>
        ))}
      </section>
    </section>
  );
};

export default PlayerList;
