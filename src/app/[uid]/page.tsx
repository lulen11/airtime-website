// TODO: REMOVE THIS EVENTUALLY. KEEPING HERE FOR REFERENCE

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const client = createClient();

  // const page = await client
  //   .getByUID("player_card", params.uid)
  //   .catch(() => notFound());

  // Try fetching the `player_card` first
  let page = await client.getByUID("player_card", params.uid).catch(() => null);

  // If no `player_card` found, try fetching `content_page`
  if (!page) {
    page = await client.getByUID("content_page", params.uid).catch(() => null);
  }

  // If neither `player_card` nor `content_page` is found, show 404
  if (!page) {
    notFound();
  }

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  // const page = await client
  //   .getByUID("player_card", params.uid)
  //   .catch(() => notFound());

  // Try fetching the `player_card` first
  let page = await client.getByUID("player_card", params.uid).catch(() => null);

  // If no `player_card` found, try fetching `content_page`
  if (!page) {
    page = await client.getByUID("content_page", params.uid).catch(() => null);
  }

  // If neither `player_card` nor `content_page` is found, show 404
  if (!page) {
    notFound();
  }

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  // const pages = await client.getAllByType("player_card");

  // Fetch all `player_card` and `content_page` entries
  const playerCards = await client.getAllByType("player_card");
  const contentPages = await client.getAllByType("content_page");

  // Combine and map UIDs
  const pages = [...playerCards, ...contentPages];

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
