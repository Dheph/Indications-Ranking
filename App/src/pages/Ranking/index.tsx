import React, { useState, useEffect } from "react";
import { Alert, RefreshControl, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Container } from "../../styles/globalStyles";
import { UserData, UserImg, UserInformations } from "../Perfil/styles";
import { Title } from "../PersonalData/styles";
import { Header, HeaderIconsContent } from "./styles";

import colors from "../../styles/colors";

import { Feather } from "@expo/vector-icons";
import Indicator from "../../components/Indicator";
import { api } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Competitor {
  competitor: {
    id: string,
    punctuation: number,
    nick_name: string,
    first_indication_date: string,
    position: number,
    ranking: {
      id: string,
      number: number,
      initial_date: string,
      end_date: string,
    }
  }
}
const Ranking = () => {
  const [profile, setProfile] = useState<Competitor>();
  const [profileImg, setProfileImg] = useState<string>();
  const [competitors, setCompetitors] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);


  useEffect(() => {
    loadProfile();
    loadRanking();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadProfile()
    loadRanking()
    .then(() => setRefreshing(false));
  }, []);

  async function loadProfile(): Promise<void> {
    const token = await AsyncStorage.getItem("token");
    const headers = { Authorization: token };
    console.log(headers);

    await api
      .get<Competitor>("competitor/profile", { headers: headers })
      .then((responseProfile) => {
        setProfile(responseProfile.data);
        console.log(responseProfile.data);
        setProfileImg(
          `https://ui-avatars.com/api/?name=${responseProfile.data.competitor.nick_name}&background=fff&color=003352`
        );

        if(responseProfile.data.competitor.position === 1){
          Alert.alert(`Parabéns ${responseProfile.data.competitor.nick_name} 🥳`, 'Você alcançou o primeiro lugar ')  
        }
      })
      .catch((error) => {
        console.log(error);
        return Alert.alert("Ops", "Parece que você ainda não tem indicações Ativas");
      });
  }
  async function loadRanking(): Promise<void> {
    try {
      const token = await AsyncStorage.getItem("token");
      const headers = { Authorization: token };
      await api
        .get("current/competitors", { headers: headers })
        .then(async (response) => {
          setCompetitors(response.data.competitors);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <Header>
        <UserData>
          <UserImg
            source={{ uri: profileImg }}
            style={{ width: 80, height: 80 }}
          />

          <UserInformations style={{ marginTop: "5%", marginLeft: "5%" }}>
          <Text style={{fontSize:20}}>{profile?.competitor.position === 1? '👑' :''}</Text>
          
            
            <Text
              style={{
                color: colors.primary,
                fontSize: 22,
                fontWeight: "bold",
              }}
            >
              {" "}
              Eu{" "}
            </Text>
            <Text
              style={{
                color: colors.primary,
                fontSize: 17,
              }}
            >
              {" "}
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                {profile?.competitor.position || "-"}° posição
              </Text>{" "}
              {""}
            </Text>
            <Text
              style={{
                color: colors.primary,
                fontSize: 17,
              }}
            >
              {" "}
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                {profile?.competitor.punctuation || "-"} PT
              </Text>{" "}
            </Text>
          </UserInformations>
          <HeaderIconsContent>
            <Feather name="star" size={35} color="#ffd300" />
            <Feather name="star" size={30} color="#f8de7e" />
            <Feather name="star" size={35} color="#ffd300" />
          </HeaderIconsContent>
        </UserData>
        <Title> Ranking Atual </Title>
      </Header>

      <FlatList
        data={competitors}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 20 }}
        renderItem={({ item, index }) => (
          <Indicator key={item.id} ranking={item} />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </Container>
  );
};
export default Ranking;
