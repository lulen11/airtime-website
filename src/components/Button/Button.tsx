import { PrismicNextLink } from "@prismicio/next";
import styles from "./Button.module.scss";

const Button = ({ link, label }: { link: any; label: any }) => {
  const buttonLabel = label || "";
  const wrapOInSpan = (text) => {
    const index = text.indexOf("o");
    if (index !== -1) {
      return (
        <>
          {text.substring(0, index)}
          <span className={styles.bouncing}>{text.charAt(index)}</span>
          {text.substring(index + 1)}
        </>
      );
    }
    return text;
  };

  return (
    <button className={styles.button}>
      <PrismicNextLink field={link}>
        {/* {label} */}
        {wrapOInSpan(buttonLabel)}
      </PrismicNextLink>
    </button>
  );
};

export default Button;
