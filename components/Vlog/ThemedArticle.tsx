import { ThemedVlogProps } from "@/types/ThemedVlogPType";
import React from "react";
import Spacer from "../Spacer";
import ThemedText from "../ThemedText";

const ThemedArticle = ({ data }: ThemedVlogProps) => {

  return (
    <>
      <ThemedText style={{ marginTop: 10 }}>{data?.articles}</ThemedText>
      <Spacer height={5} />
      <Spacer height={10} />
    </>
  );
};

export default ThemedArticle;
