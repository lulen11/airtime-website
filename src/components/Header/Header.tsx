import { createClient } from "@/prismicio";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

import Button from "../Button/Button";
import styles from "./Header.module.scss";

export default async function Header() {
  const client = createClient();
  const nav = await client.getSingle("navigation");

  return (
    <>
      <header className={`${styles.header} flex `}>
        <div>
          <a href="/">
            <PrismicNextImage field={nav.data.logo} className={styles.logo} />
          </a>
        </div>
        <div className={`${styles.nav} flex `}>
          {/* <ul className="flex">
            <div className={styles.navGroup}>
              {nav.data.menu_items.slice(0, 3).map((item) => (
                <li className={styles.navItem} key={JSON.stringify(item)}>
                  <PrismicNextLink field={item.link}>
                    {item.label}
                  </PrismicNextLink>
                </li>
              ))}
            </div>
            {nav.data.menu_items.slice(3).map((item) => (
              <li className={styles.navItem} key={JSON.stringify(item)}>
                <PrismicNextLink field={item.link}>
                  {item.label}
                </PrismicNextLink>
              </li>
            ))}
          </ul> */}

          <ul className="flex">
            {nav.data.menu_items.map((item, index) => {
              // Check if the current item starts a nav group
              if (
                item.nav_group &&
                (!nav.data.menu_items[index - 1]?.nav_group || index === 0)
              ) {
                return (
                  <div className={styles.navGroup} key={JSON.stringify(item)}>
                    {/* Render all items in the group */}
                    {nav.data.menu_items
                      .slice(index) // Slice from the current index
                      .filter((groupItem) => groupItem.nav_group)
                      .map((groupItem, groupIndex) => (
                        <>
                          <li
                            className={styles.navItem}
                            key={`group-${JSON.stringify(groupItem)}`}
                          >
                            <PrismicNextLink field={groupItem.link}>
                              {groupItem.label}
                            </PrismicNextLink>
                          </li>
                        </>
                      ))}
                  </div>
                );
              }

              // Render normal items outside the group
              if (!item.nav_group) {
                return (
                  <li className={styles.navItem} key={JSON.stringify(item)}>
                    <PrismicNextLink field={item.link}>
                      {item.label}
                    </PrismicNextLink>
                  </li>
                );
              }

              return null;
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
