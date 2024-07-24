import React from "react";
import { notFound } from "next/navigation";
import { createClient } from "@/prismicio";

type Params = { uid: string };

export default async function PlayerPage({ params }: { params: Params }) {
  const client = createClient();
  let page;

  try {
    page = await client.getByUID("player_card", params.uid);
  } catch (error) {
    console.error("Error fetching player:", error);
    notFound();
  }

  if (!page) {
    return <div>Player not found</div>;
  }

  return (
    <>
      <h1>{page.data.player_name}</h1>
      <p>{page.data.player_location}</p>
      {/* TODO: Add other player details here */}
    </>
  );
}

export async function generateMetadata({ params }: { params: Params }) {
  const client = createClient();
  let page;

  try {
    page = await client.getByUID("player_card", params.uid);
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {};
  }

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  let players;

  try {
    players = await client.getAllByType("player_card");
  } catch (error) {
    console.error("Error fetching players for static params:", error);
    return [];
  }

  return players.map((player) => ({
    uid: player.uid,
  }));
}
