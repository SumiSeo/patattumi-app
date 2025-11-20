import React from "react";
import SocialMedia from "../SocialMedia";
import Spacer from "../Spacer";
import ThemedText from "../ThemedText";

type Vlog = {
  articles: string;       
  insta?: string;        
  youtube?: string;
  tiktok?: string;
};

export type ThemedVlogProps = {
  data: Vlog;
};

const ThemedVlog = ({ data }: ThemedVlogProps) => {

  return (
    <>
      <ThemedText style={{ marginTop: 10 }}>{data.articles}</ThemedText>
      <Spacer height={5} />
      <SocialMedia
        insta={data.insta}
        tiktok={data.tiktok}
        youtube={data.youtube}
        title="Voir la vidéo de Vlog(cette vidéo s'ouvrira dans une page externe)"
        />
      <Spacer height={10} />
    </>
  );
};

export default ThemedVlog;
