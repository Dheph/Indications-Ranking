import React from "react";

import { Text } from "react-native";
import { IRanking } from "../../pages/Ranking/RankingDTO";
import colors from "../../styles/colors";

import { Container, Indicators, CompetitorsImage } from "./styles";

interface Props {
  ranking: IRanking,
  position: number
}

const Indicator: React.FC<Props> = ({ ranking, position }) => {
  console.log(ranking)
  return (
    <Container>
      <Indicators>
        <Text
          style={{
            right: "80%",
            color: colors.secondary,
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          {ranking.position === 1?  ranking.position + ' 👑 °' : ranking.position + '°'}
        </Text>
        <CompetitorsImage
          source={{
            uri:
              `https://ui-avatars.com/api/?name=${ranking.nick_name}&background=8ecae6&color=003352`,
          }}
        />

        <Text style={{ left: "30%", fontSize: 16, color:colors.secondary  }}>{ranking.nick_name}</Text>
        <Text style={{ left: "100%", color: colors.secondary , fontSize: 18 }}>
          {ranking.punctuation} PT
        </Text>
      </Indicators>
    </Container>
  );
};

export default Indicator;
