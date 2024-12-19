import React from "react";
import { PrismicRichText } from "@prismicio/react";
import { notFound } from "next/navigation";
import { createClient } from "@/prismicio";
import styles from "./playerPage.module.scss";
import { PrismicNextImage } from "@prismicio/next";
import Button from "@/components/Button/Button";

type Params = { uid: string };

export default async function PlayerPage({ params }: { params: Params }) {
  const client = createClient();
  //   old code for just the one current player_card data
  // let page;

  // Fetch current player by UID
  let currentPlayer;
  let allPlayers;

  try {
    //   old code just fetching the current player_card data
    //   page = await client.getByUID("player_card", params.uid);
    // } catch (error) {
    //   console.error("Error fetching player:", error);
    //   notFound();

    // Fetch all players to determine the next one
    allPlayers = await client.getAllByType("player_card");

    // Fetch the current player data
    currentPlayer = await client.getByUID("player_card", params.uid);
  } catch (error) {
    console.error("Error fetching player or player list:", error);
    notFound();
  }

  //   old code for just the one current player_card data
  // if (!page) {
  //   return <div>Player not found</div>;
  // }

  if (!currentPlayer) {
    return <div>Player not found</div>;
  }

  // Find the current player's index in the list
  const currentIndex = allPlayers.findIndex(
    (player) => player.uid === params.uid
  );

  // Determine the next player's UID
  const nextPlayerUid =
    currentIndex !== -1 && currentIndex + 1 < allPlayers.length
      ? allPlayers[currentIndex + 1].uid // Next player
      : allPlayers[0].uid; // Loop back to the first player if this is the last one

  return (
    <>
      <div className={styles.playerPage}>
        <section className={styles.sectionHero}>
          <div className={styles.wrapper}>
            <div className={styles.banner}>
              <PrismicNextImage
                field={currentPlayer.data.player_feature_image}
              />
              <div className={styles.bannerText}>
                <h1>{currentPlayer.data.player_name}</h1>
                <div className={styles.content}>
                  <p>
                    <mark>{currentPlayer.data.short_bio} </mark>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.sectionStats}>
          <ul>
            {currentPlayer.data.player_stats?.map((item) => (
              <li key={item.stat_label}>
                {item.stat_label}: {item.stat}
              </li>
            ))}
          </ul>
        </section>
        <section className={styles.sectionStory}>
          <div className={styles.wrapper}>
            <div className={styles.content}>
              <PrismicRichText field={currentPlayer.data.player_story} />
              {/* <video
                className={styles.playerVideo}
                autoPlay
                muted
                src={page.data.player_video.embed_url}
              /> */}
            </div>
          </div>
        </section>
        <div className={styles.btnWrapper}>
          <Button
            link={`/players/${nextPlayerUid}`}
            label={"Meet the next player"}
          />
        </div>
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
