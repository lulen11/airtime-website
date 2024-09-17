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

export default async function Footer() {
  const client = createClient();
  const footer = await client.getSingle("footer");

  return (
    <>
      <div className={styles.footer}>
        <div className={styles.bigFooterImage}>&nbsp;</div>
        <div className={styles.footerContentWrapper}>
          <div className={styles.footerContent}>
            <PrismicRichText field={footer.data.text_field} />
          </div>
          <ul className={styles.footerMenu}>
            {/* <li>Players</li>
            <li>About</li> */}
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
            {/* <li className={styles.icon}>
              <a className={styles.footerLink} href="#">
                <IconX />
              </a>
            </li> */}
            {/* <li className={styles.icon}>
              <a className={styles.footerLink} href="#">
                <IconTikTok />
              </a>
            </li> */}
            {/* <li className={styles.icon}>
              <a className={styles.footerLink} href="#">
                <IconYouTube />
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
}
