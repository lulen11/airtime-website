"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/prismicio";
import {
  IconFacebook,
  IconInstagram,
  // IconTikTok,
  // IconYouTube,
  // IconX,
} from "../../images/icons";
import { PrismicRichText } from "@prismicio/react";
import styles from "./Footer.module.scss";

export default function Footer() {
  const [footerClass, setFooterClass] = useState("");
  const pathname = usePathname();
  const footerRef = useRef(null);
  // const stickersCreated = useRef(false); // Flag to ensure stickers are created only once

  useEffect(() => {
    if (
      pathname === "/" ||
      pathname === "/development-training" ||
      pathname === "/yet-another-page"
    ) {
      setFooterClass(`${styles.footer} ${styles.stickerFooter}`);
    } else if (pathname === "/players") {
      setFooterClass(`${styles.footer} ${styles.playersPageFooter}`);
    } else {
      setFooterClass(`${styles.footer} ${styles.defaultFooter}`);
    }
  }, [pathname]);

  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    async function fetchFooterData() {
      const client = createClient();
      const footer = await client.getSingle("footer");
      setFooterData(footer);
    }
    fetchFooterData();
  }, []);

  // Scroll event listener to detect when footer is in view
  useEffect(() => {
    const handleScroll = () => {
      const footerElement = footerRef.current;
      if (!footerElement) return;

      const rect = footerElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if the footer is in view
      if (rect.top < windowHeight && rect.bottom >= 0) {
        setFooterClass((prev) => `${prev} ${styles.inView}`);
        // if (pathname === "/development-home" && !stickersCreated.current) {
        // stickersCreated.current = true; // Set the flag to true so stickers are only created once
        // triggerStickers();
        // }
      } else {
        setFooterClass((prev) => prev.replace(` ${styles.inView}`, ""));
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Initial check in case the footer is already in view when the page loads
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  if (!footerData) {
    return null; // or a loading spinner
  }

  return (
    <div ref={footerRef} className={footerClass}>
      <div className={styles.bigFooterImage}>&nbsp;</div>
      <ul className={styles.stickers}>
        <li className={styles.sticker}></li>
        <li className={styles.sticker}></li>
        <li className={styles.sticker}></li>
        <li className={styles.sticker}></li>
        <li className={styles.sticker}></li>
        <li className={styles.sticker}></li>
        <li className={styles.sticker}></li>
      </ul>
      <div className={styles.footerContentWrapper}>
        <div className={styles.footerContent}>
          <PrismicRichText field={footerData.data.text_field} />
        </div>
        <ul className={styles.footerMenu}>
          <li>
            <a
              className={styles.footerLink}
              href="mailto:michael@airtimebasketball.com"
            >
              Contact
            </a>
          </li>
          <li className={styles.icon}>
            <a
              className={styles.footerLink}
              href="https://www.facebook.com/profile.php?id=61565089387926"
            >
              <IconFacebook />
            </a>
          </li>
          <li className={styles.icon}>
            <a
              className={styles.footerLink}
              href="https://www.instagram.com/airtime.basketball/"
            >
              <IconInstagram />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
