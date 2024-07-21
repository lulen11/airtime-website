import React from "react";
import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { notFound } from "next/navigation";
import { createClient } from "@/prismicio";

type Player = {
  uid: string;
  data: {
    player_name: string;
    // description: string;
    // Include other fields you need here
  };
};

export default async function AllPlayersPage() {
  const client = createClient();
  const players = await client
    .getAllByType("player_card")
    .catch(() => notFound());

  const playerPage = await client.getSingle("player_listing_page");

  return (
    <>
      <SliceZone slices={playerPage.data.slices} components={components} />;
      <div>
        <h1>All Playersdss</h1>
        <ul>
          {players.map((player: Player) => (
            <li key={player.uid}>
              <a href={`/players/${player.uid}`}>
                <h2>{player.data.player_name}</h2>
                {/* <p>{player.data.description}</p> */}
              </a>
            </li>
          ))}
        </ul>
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
  };
}
