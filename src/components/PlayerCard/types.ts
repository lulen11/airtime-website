// src/components/PlayerCard/types.ts

export type PlayerData = {
  uid: string;
  player_name: string;
  player_position: string;
  image?: any;
  player_stats?: { stat_label: string; stat: string }[];
};

// TODO: keep until you know if you need this for future components
// export type PrismicPlayerDocument = {
//   id: string;
//   data: PlayerData;
// };

// export function isPrismicPlayerDocument(
//   doc: any
// ): doc is PrismicPlayerDocument {
//   return (
//     doc &&
//     typeof doc.id === "string" &&
//     doc.data &&
//     typeof doc.data.player_name === "string"
//   );
// }
