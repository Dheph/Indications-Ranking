import React, { useState } from "react";

import {
  ButtonText,
  Form,
  InputText,
  SubmitButton,
  Wrapper,
} from "../../styles/globalStyles";
import { Container, Title } from "./styles";
import { Alert } from "react-native";
import colors from "../../styles/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { IIndicator } from "../PersonalData/IIndicator";
import { api } from "../../services/api";

const RegisterPass = () => {
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");

  const navigator = useNavigation();
  const route = useRoute();

  const indicator: IIndicator = route.params.indicator;

  async function handleSubmit() {
    if (password === "" || repassword === "")
      return Alert.alert(
        "Hmm!!",
        "Você precisa preencher todos os campos antes de finalizar"
      );

    if (password != repassword) {
      return Alert.alert(
        "Senhas não conferem",
        "As senhas que você colocou estão diferentes"
      );
    }

    indicator.password = password;

    console.log('PASSWORD')
    console.log(indicator)
    try {
      await api.post('new/indicator', indicator).then(response => {
        console.log('response')
        console.log(response.data)
      }).catch((error) => {
        console.log(error)
        return Alert.alert('Ops', 'ocorreu um erro no cadastro, por favor tente novamente')
      })
      Alert.alert("Muito Bom!!", "Seu cadastro foi realizado com sucesso");
      navigator.navigate("login");
    } catch (error) {
      console.log(error)
      Alert.alert("Ops", 'Ocorreu um erro na hora de realizar o cadastro por favor tente novamente.');
    }
  }

  return (
    <Wrapper>
      <Container>
        <Title> 3° e ultimo passo </Title>
        <Title> Criando minha senha </Title>
      </Container>
      <Form>
        <InputText
          placeholder="Senha"
          placeholderTextColor={colors.placeholders}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <InputText
          placeholder="Repita a senha"
          placeholderTextColor={colors.placeholders}
          secureTextEntry={true}
          onChangeText={(text) => setRePassword(text)}
          value={repassword}
        />

        <SubmitButton onPress={handleSubmit}>
          <ButtonText> Finalizar </ButtonText>
        </SubmitButton>
      </Form>

    </Wrapper>
  );
};

export default RegisterPass;
