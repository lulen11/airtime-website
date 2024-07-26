import React from "react";
import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { notFound } from "next/navigation";
import { createClient } from "@/prismicio";
import { PrismicDocument } from "@prismicio/types";
// import { PrismicNextImage } from "@prismicio/next";
import PlayerCard from "../../components/PlayerCard/PlayerCard";

import styles from "./players.module.scss";

export default async function AllPlayersPage() {
  const client = createClient();
  const players: PrismicDocument[] = await client
    .getAllByType("player_card")
    .catch(() => notFound());

  const playerPage = await client.getSingle("player_listing_page");

  // Map players to match the PlayerCardProps type
  const formattedPlayers = players.map((player) => ({
    uid: player.uid,
    player_name: player.data.player_name,
    player_position: player.data.player_position,
    image: player.data.image,
    player_stats: player.data.player_stats,
  }));

  return (
    <>
      <SliceZone slices={playerPage.data.slices} components={components} />
      <div>
        <h1>All Players</h1>
        <section className={styles.playerCardsGrid}>
          {formattedPlayers.map((player) => (
            <PlayerCard key={player.uid} player={player} />
          ))}
        </section>
      </div>
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("player_listing_page");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    robots: page.data.meta_robots,
  };
}
