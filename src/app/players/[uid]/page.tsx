import React from "react";
import { PrismicRichText } from "@prismicio/react";
import { notFound } from "next/navigation";
import { createClient } from "@/prismicio";
import styles from "./playerPage.module.scss";

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
      <div className={styles.playerPage}>
        <section className={styles.sectionHero}>
          <div className={styles.wrapper}>
            <div>video</div>
            <h1>{page.data.player_name}</h1>
            <div className={styles.content}>
              <p>
                <mark>{page.data.short_bio} </mark>
              </p>
            </div>
          </div>
        </section>
        <section className={styles.sectionStats}>
          <ul>
            {page.data.player_stats?.map((item) => (
              <li key={item.stat_label}>
                {item.stat_label}: {item.stat}
              </li>
            ))}
            <li>another one</li>
            <li>another oneone</li>
            <li>another one</li>
            <li>another lone</li>
            <li>another oneone</li>
            <li>another one</li>
          </ul>
        </section>
        <section className={styles.sectionStory}>
          <div className={styles.wrapper}>
            <div className={styles.content}>
              <PrismicRichText field={page.data.player_story} />
            </div>
          </div>
        </section>
      </div>
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
