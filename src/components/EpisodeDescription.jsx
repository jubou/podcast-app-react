import React from "react";
import styles from "./EpisodeDescription.module.scss";

function looksLikeHtml(text) {
  return /<\/?[a-z][\s\S]*>/i.test(text);
}

function linkify(text) {
  const urlRegex = /(https?:\/\/[^\s)]+)(?![^<]*>)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer">
        {part}
      </a>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    ),
  );
}

export default function EpisodeDescription({ value }) {
  if (!value) return null;

  if (looksLikeHtml(value)) {
    return (
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    );
  }

  return <div className={styles.description}>{linkify(value)}</div>;
}
