import React, { useEffect, useState } from "react";
import { Text, StyleSheet } from "react-native";

import colors from "../../styles/colors";
import { Container } from "../../styles/globalStyles";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import {
  Heading,
  UserData,
  UserImg,
  UserInformations,
  Body,
  UserOption,
  FooterOption,
} from "./styles";

import { Title } from "../PersonalData/styles";
import { api } from "../../services/api";
import { IPerfilDTO } from "./PerfilDTO";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Perfil = () => {
  const [indicator, setIndicator] = useState<IPerfilDTO>()
  useEffect(() => {
    loadIndicatorData()
  }, []);

  async function loadIndicatorData() {
    const token = await AsyncStorage.getItem('token')
    console.log('token ' + token)
    const headers = {
      'Authorization': token
    }
    await api.get<IPerfilDTO>('indicator/profile', { headers: headers }).then((response) => {
      setIndicator(response.data)
      console.log(response.data)
    }).catch((error) => {
      console.log(error)
    })
  }
  return (
    <Container>
      <Heading>
        <UserData>
          <UserImg source={{ uri: `https://ui-avatars.com/api/?name=${indicator?.indicator.name}&background=fff&color=003352` }} />
          <UserInformations>
            <Text
              style={{
                color: colors.secondary,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {" "}
              {indicator?.indicator.name || 'Sem Nome'}{" "}
            </Text>
            <Text
              style={{
                color: colors.primary,
                fontSize: 17,
              }}
            >
              {" "}
              {indicator?.indicator.cpf || 'xxx.xxx.xxx-xx'}{" "}
            </Text>
          </UserInformations>
        </UserData>
      </Heading>
      <Title>Meus Dados</Title>

      <Body>
        <UserOption>
          <Feather name="user" size={20} color={colors.secondary} />
          <Text style={styles.optionsText}> Usuário: {indicator?.indicator.username || 'xxx'} </Text>
          <Text style={styles.optionsText}> Conta criada em: {indicator?.indicator.register_date || 'xx/xx/xxxx'} </Text>
        </UserOption>
        <UserOption>
          <Feather name="map-pin" size={20} color={colors.secondary} />
          <Text style={styles.optionsText}>{indicator?.indicator.zip_code || 'xxxxx-xxx'}</Text>
          <Text style={styles.optionsText}>{indicator?.indicator.neighborhood || 'xxxx xxx xxx'}</Text>
          <Text style={styles.optionsText}>{indicator?.indicator.street || 'xxxxxxxx xxx xx'} N° {indicator?.indicator.number || 'xx'}</Text>
        </UserOption>
        <UserOption>
          <MaterialIcons name="cake" size={20} color={colors.secondary} />
          <Text style={styles.optionsText}>{indicator?.indicator.birthday || 'xx/xx/xxxx'}</Text>
        </UserOption>
        <UserOption>
          <Feather name="mail" size={20} color={colors.secondary} />
          <Text style={styles.optionsText}>
            {" "}
            {indicator?.indicator.email || 'Sem email'}{" "}
          </Text>
        </UserOption>
        <UserOption>
          <Feather name="smartphone" size={20} color={colors.secondary} />
          <Text style={styles.optionsText}>{indicator?.indicator.phone_number || '(xx) x xxxx-xxxx'} </Text>
        </UserOption>

        <FooterOption>
          <Feather name="log-out" size={20} color={colors.hiddenBackground} />
          <Text
            style={{
              ...styles.optionsText,
              fontSize: 18,
              color: colors.hiddenBackground,
            }}
          >
            Sair
          </Text>
        </FooterOption>
      </Body>
    </Container>
  );
};

export default Perfil;

const styles = StyleSheet.create({
  optionsText: {
    fontSize: 18,
    margin: 15,
    color: colors.lighText,
  },
});
