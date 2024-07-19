"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/prismicio";
import { SliceComponentProps, SliceLike } from "@prismicio/react";
import styles from "./PlayerList.module.scss";

type PlayerListSlice = SliceLike<string> & {
  primary: {
    player_1: { id: string };
    player_2: { id: string };
    players: { id: string };
  };
};

type PlayerListProps = SliceComponentProps<PlayerListSlice>;

type PlayerInfo = { id: string; name: string; position: string };

const PlayerList = ({ slice }: PlayerListProps): JSX.Element => {
  const [players, setPlayers] = useState<PlayerInfo[]>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const client = createClient();
      const playerIds = [
        slice.primary.player_1.id,
        slice.primary.player_2.id,
        slice.primary.players.id,
      ];

      const response = await client.getByIDs(playerIds, {
        fetchLinks: ["player_card.player_name", "player_card.player_position"],
      });
      type PlayerCardDocumentData = {
        player_name: string;
        player_position: string;
        // add other fields as needed
      };

      function isPlayerCardData(data: any): data is PlayerCardDocumentData {
        return data && "player_name" && "player_position" in data;
      }

      const playerData = response.results.map((player) => ({
        id: player.id,
        name: (player.data as PlayerCardDocumentData).player_name,
        position: (player.data as PlayerCardDocumentData).player_position,
      }));
      setPlayers(playerData);
    };

    fetchPlayers();
  }, [slice.primary]);

  return (
    <section>
      <h2>Player List</h2>
      <div className={styles.playerList}>
        {players.map((player) => (
          <div className={styles.playerCard} key={player.id}>
            <h3>{player.name}</h3>
            <h3>{player.position}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlayerList;
