import React from "react";
import { Text } from "react-native";

import { Container, RewardsImage } from "./styles";
import { IRewards } from "../../pages/Rewards/RewardsDTO";
import colors from "../../styles/colors";

interface Props {
  reward: IRewards;
}

const Reward: React.FC<Props> = ({ reward }) => {
  return (
    <Container>
      <Text style={{ fontSize: 20,color:colors.primary }}>Posição: {reward.position}</Text>
      <Text style={{ fontSize: 18, fontWeight: "bold", margin:10, color:colors.primary }}>
        {reward.name}
      </Text>
      <RewardsImage source={{ uri: reward.image }} />
    </Container>
  );
};

export default Reward;
