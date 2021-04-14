import React, { useState, useEffect } from "react";
import { Container } from "../../styles/globalStyles";
import { Header, Info, InfoText, Body, List } from "./styles";
import { FlatList } from "react-native-gesture-handler";
import Reward from "../../components/Reward";
import { api } from "../../services/api";
import { Alert,RefreshControl } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const errorImage = [
  {
    name: "Não foi possivel carregar o feed",
    id: "1234541",
    position: 1,
    image: "https://media.tenor.com/images/b276eb1262c2ae17a7d94929051d7a9d/tenor.gif",
  },
];

const Rewards = () => {
  const [rewards, setRewards] = useState([]);
  const [end_date, setEndDate] = useState<string>();
  const [refreshing, setRefreshing] = useState(false);


  useEffect(() => {
    loadRewards()
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

   loadRewards().then(() => setRefreshing(false));
  }, []);

  async function loadRewards() {
    const token = await AsyncStorage.getItem('token')
    console.log('TOKEN ' + token)
    const headers = {
      'Authorization': token
    }
    await api.get('current/rewards', { headers: headers }).then((responseRewards) => {
      setRewards(responseRewards.data.ranking)
      console.log('----------------------')
      console.log(responseRewards.data.ranking)
      setEndDate(responseRewards.data.ranking[0].ranking.end_date)
    }).catch((error) => {
      console.log(error)
      return Alert.alert('Ops', 'Ocorreu um erro ao buscar prêmios, tente novamente mais tarde');
    })
  }

  return (
    <Container>
      <Header>
        <Info>
          <InfoText> Data da premiação </InfoText>
          <InfoText style={{ fontWeight: "bold" }}> {end_date || 'xx/xx/xxxx'}</InfoText>
        </Info>
      </Header>
      <Body>
        <List
          data={rewards || errorImage}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
          <Reward key={item.id} reward={item} />
          )}
         
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />
      </Body>
    </Container>
  );
};

export default Rewards;
