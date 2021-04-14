import React from "react";
import { BottomNavigation } from "react-native-paper";
import IndicationPanel from "./pages/IndicationPanel";
import Perfil from "./pages/Perfil";
import Ranking from "./pages/Ranking";
import Rewards from "./pages/Rewards";

const BottomMenu: React.FC = () => {
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: "profile", title: "Conta", icon: "face" },
    { key: "rewards", title: "Prêmios", icon: "gift-outline" },
    { key: "ranking", title: "Ranking", icon: "crown" },
    { key: "indication", title: "Indicar", icon: "plus-circle-outline" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    profile: Perfil,
    indication: IndicationPanel,
    ranking: Ranking,
    rewards: Rewards,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      inactiveColor="#555555"
      activeColor="#003352"
      barStyle={{ backgroundColor: "#fff", padding: 5 }}
    />
  );
};

export default BottomMenu;
