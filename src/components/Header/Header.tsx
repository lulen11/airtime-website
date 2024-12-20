import { createClient } from "@/prismicio";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

import Button from "../Button/Button";
import styles from "./Header.module.scss";

export default async function Header() {
  const client = createClient();
  const nav = await client.getSingle("navigation");

  return (
    <>
      <header className={`${styles.header} h-24 flex items-center`}>
        <div>
          <a href="/">
            <PrismicNextImage field={nav.data.logo} className={styles.logo} />
          </a>
        </div>
        <div className="flex items-center">
          <ul className="flex">
            {nav.data.menu_items.map((item) => {
              return (
                <li className={styles.navItem} key={JSON.stringify(item)}>
                  <PrismicNextLink field={item.link}>
                    {item.label}
                  </PrismicNextLink>
                </li>
              );
            })}
          </ul>
          {/* <div className={styles.btnWrapper}>
            <Button link={""} label="Donate" />
          </div> */}
        </div>
      </header>
    </>
  );
}
