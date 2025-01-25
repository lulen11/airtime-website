"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@/prismicio";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

import Button from "../Button/Button";
import styles from "./Header.module.scss";

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [nav, setNav] = useState(null);

  // const client = createClient();
  // const nav = await client.getSingle("navigation");

  const toggleMenu = () => setIsMobile(!isMobile);
  const closeMenu = () => setIsMobile(false);

  useEffect(() => {
    const fetchData = async () => {
      const client = createClient();
      const navigationData = await client.getSingle("navigation");
      setNav(navigationData);
    };

    fetchData();
  }, []);

  if (!nav) {
    return null; // Or add a loader if you want
  }

  return (
    <>
      <header className={`${styles.header} flex `}>
        <div>
          <a href="/">
            <PrismicNextImage field={nav.data.logo} className={styles.logo} />
          </a>
        </div>
        <div
          className={`${styles.nav} flex ${isMobile ? styles.mobileNavActive : ""} `}
        >
          {/* TODO: delete this once you're sure about the new nav */}
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

          <ul className={styles.navList}>
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
                            <PrismicNextLink
                              field={groupItem.link}
                              onClick={closeMenu}
                            >
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
                    <PrismicNextLink field={item.link} onClick={closeMenu}>
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

        <div className={styles.hamburger} onClick={toggleMenu}>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </div>
      </header>
    </>
  );
}
