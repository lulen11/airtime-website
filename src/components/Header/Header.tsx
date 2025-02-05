"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@/prismicio";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { usePathname } from "next/navigation";

import Button from "../Button/Button";
import styles from "./Header.module.scss";

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [nav, setNav] = useState(null);
  const pathname = usePathname(); // Get the current path

  // const client = createClient();
  // const nav = await client.getSingle("navigation");

  const toggleMenu = () => setIsMobile(!isMobile);
  const closeMenu = () => setIsMobile(false);

  useEffect(() => {
    const fetchData = async () => {
      // const client = createClient();
      const client = createClient({
        routes: [
          // 🔥 Force routes here (hopefully can remove in future)
          { type: "content_page", path: "/:uid" },
          { type: "player_listing_page", path: "/players" },
        ],
      });
      const navigationData = await client.getSingle("navigation");
      console.log("Menu Items:", navigationData.data.menu_items);

      setNav(navigationData);
    };

    fetchData();
  }, []);

  if (!nav) {
    return null; // Or add a loader if you want
  }

  // Determine the dynamic class based on the current page
  const dynamicClass = () => {
    if (pathname === "/") return styles.homeHeader;
    // if (pathname.includes("/players")) return styles.playerHeader;
    if (pathname.startsWith("/players")) return styles.playerHeader;
    return styles.defaultHeader;
  };

  return (
    <>
      <header
        className={`${styles.header} flex ${dynamicClass()} ${
          isMobile ? styles.mobileNavActive : ""
        }`}
      >
        <div>
          <a href="/">
            <PrismicNextImage field={nav.data.logo} className={styles.logo} />
          </a>
        </div>
        <div
          className={`${styles.nav} flex ${isMobile ? styles.mobileNavActive : ""} `}
        >
          <ul className={styles.navList}>
            {nav.data.menu_items.map((item, index) => {
              console.log(`Nav Item ${index}:`, item);
              // Check if link exists
              if (!item.link || !item.link.url) {
                console.warn(`⚠️ Missing link for menu item:`, item);
              }

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
