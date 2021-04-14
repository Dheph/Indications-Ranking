import React, { useState } from "react";
import {
  InputText,
  Container,
  TitleImage,
  Form,
  SubmitButton,
  ButtonText,
  FooterButton,
  FooterText,
} from "./styles";

import { useNavigation } from "@react-navigation/native";
import asyncStorage from "@react-native-async-storage/async-storage";
import img from "../../../assets/icon.png";
import { api } from "../../services/api";
import { Alert } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import colors from "../../styles/colors";
import { styles } from "../../styles/styles";
import { Wrapper } from "../../styles/globalStyles";

const Login = () => {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");

  const navigator = useNavigation();

  function navigateToRegister() {
    return navigator.navigate("personaldata");
  }

  async function handleSubmit() {
    if (cpf === "" || password === "") {
      return Alert.alert(
        "Ocorreu algum erro",
        "Verifique seu CPF, e não esqueça de preencher todos os campos."
      );
    }

    try {

      const body = {
        cpf,
        password,
      };
      const token = await api.post("auth", body);
      if (token.data.message) {
        Alert.alert("Ops", token.data.message + ' verifique seus dados e tente novamente');
        if (token.data.message === "Senha inválida") {
          setPassword("");
          return;
        }
        setPassword("");
        setCpf("");
        return
      }
      asyncStorage.setItem("token", token.data.token);
      console.log(token.data.token);
      Alert.alert(`Prontinho!`, "Sessão iniciada com sucesso!!");
      return navigator.navigate("bottommenu");
    } catch (error) {
      if (error) {
        return Alert.alert("Ops", error.message);
      }
      return Alert.alert(
        "Ops",
        "Ocorreu um erro ao se conectar, por gentileza tente novamente mais tarde."
      );
    }
  }

  return (
    <Wrapper>
      <Container>
        <TitleImage source={img} />
      </Container>

      <Form>
        <TextInputMask
          type={"cpf"}
          value={cpf}
          keyboardType="number-pad"
          onChangeText={(text) => setCpf(text)}
          placeholder="CPF"
          placeholderTextColor={colors.placeholders}
          style={styles.inputText}
        />

        <InputText
          placeholder="Senha"
          placeholderTextColor={colors.placeholders}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
        />

        <SubmitButton onPress={handleSubmit}>
          <ButtonText>Entrar</ButtonText>
        </SubmitButton>

      </Form>

      <FooterButton onPress={navigateToRegister}>
        <FooterText>Cadastre-se</FooterText>
      </FooterButton>
    </Wrapper>
  );
};

export default Login;
