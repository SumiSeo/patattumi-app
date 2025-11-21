import rawArticles from "@/app/datas/articles.json";
import { ThemedVlogProps } from "@/types/ThemedVlogPType";
import React from "react";
import { StyleSheet } from "react-native";
import Spacer from "../Spacer";
import ThemedText from "../ThemedText";

export interface Article {
  culture_id: number;
  header: string;
  [key: string]: any;
}

const articles = rawArticles as Article[];

const ThemedArticle = ({ data }: ThemedVlogProps) => {
  const selectedArticle = articles.find(
    (article) => article.culture_id === data?.id
  );

  if (!selectedArticle) return null;

  const content: { type: "header" | "paragraph"; text: string }[] = [];

  let i = 1;
  while (
    selectedArticle[`header_paragraph${i}`] ||
    selectedArticle[`paragraph${i}`]
  ) {
    if (selectedArticle[`header_paragraph${i}`]) {
      content.push({
        type: "header",
        text: selectedArticle[`header_paragraph${i}`],
      });
    }

    if (selectedArticle[`paragraph${i}`]) {
      content.push({
        type: "paragraph",
        text: selectedArticle[`paragraph${i}`],
      });
    }

    i++;
  }

  return (
    <>
      <ThemedText title style={styles.header}>
        {selectedArticle.header}
      </ThemedText>

      <Spacer height={20} />

      {content.map((item, index) => (
        <React.Fragment key={index}>
          <ThemedText
            style={
              item.type === "header"
                ? styles.header_paragraph
                : styles.paragraph
            }
          >
            {item.text}
          </ThemedText>
          <Spacer height={10} />
        </React.Fragment>
      ))}
    </>
  );
};

export default ThemedArticle;

const styles = StyleSheet.create({
  header: {
    marginTop: 10,
    fontSize: 16,
  },
  header_paragraph: {
    fontSize: 18,
    fontStyle: "italic",
    marginTop: 10,
  },
  paragraph: {
    fontSize: 14,
  },
});
