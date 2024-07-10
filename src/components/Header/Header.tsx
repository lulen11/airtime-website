import { createClient } from "@/prismicio";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

import styles from "./Header.module.scss";

export default async function Header() {
  const client = createClient();
  const nav = await client.getSingle("navigation");

  return (
    <>
      <header
        className={`${styles.header} h-24 flex justify-between items-center font-semibold bg-blue-400`}
      >
        <div>
          <a href="/">
            <PrismicNextImage
              field={nav.data.logo}
              className="w-full h-auto rounded-3xl"
            />
          </a>
        </div>
        <div>
          <ul className="flex gap-8">
            {nav.data.menu_items.map((item) => {
              return (
                <li key={JSON.stringify(item)}>
                  <PrismicNextLink field={item.link}>
                    {item.label}
                  </PrismicNextLink>
                </li>
              );
            })}
          </ul>
        </div>
      </header>
    </>
  );
}
