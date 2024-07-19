import { createClient } from "@/prismicio";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

import Button from "../Button";
import styles from "./PlayerCard.module.scss";

export default async function PlayerCard() {
  const client = createClient();
  const playerCard = await client.getSingle("player_card");

  //  * TODO: This is not right at all. Remove or change
  return (
    <>
      <h1>
        {/* <PrismicNextLink field={slice.primary.player}>Link</PrismicNextLink> */}
      </h1>
      <div>
        {/* <PrismicNextImage field={nav.data.logo} className={styles.logo} /> */}

        <ul className="flex gap-8">
          {/* {nav.data.menu_items.map((item) => {
              return (
                <li className={styles.navItem} key={JSON.stringify(item)}>
                  <PrismicNextLink field={item.link}>
                    {item.label}
                  </PrismicNextLink>
                </li>
              );
            })} */}
        </ul>
        {/* <div className={styles.btnWrapper}>
            <Button link={""} label="Donate" />
          </div> */}
      </div>
    </>
  );
}
