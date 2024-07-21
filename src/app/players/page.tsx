import React from "react";
import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { notFound } from "next/navigation";
import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";
import styles from "./players.module.scss";

type Player = {
  uid: string;
  data: {
    player_name: string;
    player_position: string;
    player_location: string;
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
        <section className={styles.playerCardsGrid}>
          {players.map((player: Player) => (
            <div className={styles.playerCard} key={player.uid}>
              <a href={`/players/${player.uid}`}>
                <div className={styles.playerCardInner}>
                  <div className={styles.playerCardFront}>
                    <h3>
                      {player.data.player_name} <br />
                      <span>{player.data.player_position}</span>
                    </h3>
                    {player.data.image && (
                      <PrismicNextImage field={player.data.image} />
                    )}
                  </div>
                  <div className={styles.playerCardBack}>
                    <h3>{player.data.player_name}</h3>
                    <ul>
                      <li>
                        <strong>Position:</strong> {player.data.player_position}
                      </li>
                      <>
                        {player.data.player_stats.map((item) => (
                          <li key={item.stat_label}>
                            <strong>{item.stat_label}: </strong>
                            {item.stat}
                          </li>
                        ))}
                      </>
                    </ul>
                  </div>
                </div>
              </a>
            </div>
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
  };
}
