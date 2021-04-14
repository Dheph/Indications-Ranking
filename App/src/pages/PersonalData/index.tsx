import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  ButtonText,
  Form,
  InputText,
  SubmitButton,
  Wrapper,
} from "../../styles/globalStyles";
import { validate } from "../../services/dataValidator";
import { Container, Title } from "./styles";
import { Alert } from "react-native";
import colors from "../../styles/colors";
import { styles } from "../../styles/styles";
import { TextInputMask } from "react-native-masked-text";
import { api } from "../../services/api";

interface IClient {
  client: {
    CEP: string;
    CodigoPessoa: string;
    Email: string;
    Endereco: string;
    Fone: string;
    Latitude: string;
    Longitude: string;
    Nome: string;
    Outros: string[];
    Situacao: string;
    status: string;
  };
}

const PersonalData = () => {
  const [client, setClient] = useState<IClient>();
  const [name, setName] = useState<string>();
  const [cpf, setCpf] = useState<string>();
  const [birthday, setBirthday] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [phone_number, setPhoneNumber] = useState<string>();

  const navigator = useNavigation();

  async function clientSearch(client_cpf: string) {
    setCpf(client_cpf);
    if (!cpfVerifier(client_cpf)) {
      return;
    }
    await api
      .post<IClient>("client/verification", { cpf: client_cpf })
      .then((response) => {
        const { client } = response.data;

        setClient({
          client: {
            CEP: client.CEP,
            CodigoPessoa: client.CodigoPessoa,
            Email: client.Email,
            Endereco: client.Endereco,
            Fone: client.Fone,
            Latitude: client.Latitude,
            Longitude: client.Longitude,
            Nome: client.Nome,
            Outros: client.Outros,
            Situacao: client.Situacao,
            status: client.status
          }
        })
        setName(client.Nome);
        setEmail(client.Email);
        setPhoneNumber(client.Fone);
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  }
  function cpfVerifier(cpf: string): boolean {
    const cpfValidation = validate();
    const cpfIsValid = cpfValidation.validate_cpf(cpf);
    return cpfIsValid;
  }

  function phoneNumberVerifier(phoneNumber: string): boolean {

    phoneNumber = phoneNumber.replace(/^[\(]+|[\)]+|[-]+|[ ]/g, '')

    if (phoneNumber.length != 11) return true;
    return false;
  }

  function birthdayVerifier(birthday: string): boolean {
    let rgx = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((18|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((18|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/;
    let dateVerify = rgx.test(birthday);
    if (!dateVerify) {
      Alert.alert(
        "Data inválida!!",
        "Por gentileza verifique o campo data de nascimento."
      );
      return false;
    }
    const year = birthday.replace(/..\//g, "");

    if ("2020" - year <= 0 || year < "1900") {
      Alert.alert(
        `Ops`,
        "O ano informado é inválido, por gentileza verifique e tente novamente."
      );
      return false;
    }
    if ("2020" - year > 0 && "2020" - year < 18) {
      Alert.alert(
        `Ops`,
        "Para participar você deve possuir uma idade superior a 18 anos."
      );
      return false;
    }
    return true;
  }

  async function Next() {
    if (name === "" || cpf === "" || birthday === "" || phone_number === "") {
      return Alert.alert("Ops", "Por gentileza preencha todos os campos.");
    }
    if (!birthdayVerifier(birthday)) return;

    if (!cpfVerifier(cpf))
      return Alert.alert(
        "CPF inválido",
        "Por gentileza verifique o campo CPF."
      );
    if (phoneNumberVerifier(phone_number))
      return Alert.alert(
        "Número inválido!!",
        "Por gentileza verifique o número de telefone."
      );

    const indicator = {
      name,
      cpf,
      password: undefined,
      zip_code: client?.client.CEP,
      neighborhood: undefined,
      street: undefined,
      complement: undefined,
      number: undefined,
      phone_number,
      birthday,
      email
    }
    console.log('Dados de lo indicador');
    console.log(indicator);

    if (!indicator) {
      return Alert.alert('Antes de continuar', 'Verifique se os campos estão corretos')
    }
    console.log(indicator)
    navigator.navigate("address", { indicator: indicator });
  }
  return (
    <Wrapper>
      <Container>
        <Title> 1° Passo de 3 </Title>
        <Title> Dados Pessoais </Title>
      </Container>
      <Form>
        <TextInputMask
          type={"cpf"}
          value={cpf}
          keyboardType="number-pad"
          onChangeText={(text) => clientSearch(text)}
          placeholder="CPF"
          placeholderTextColor={colors.placeholders}
          style={styles.inputText}
        />
        <InputText
          placeholder="Nome completo"
          placeholderTextColor={colors.placeholders}
          secureTextEntry={false}
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <TextInputMask
          type={"datetime"}
          options={{
            format: "DD/MM/YYYY",
          }}
          placeholder="Data de nascimento"
          placeholderTextColor={colors.placeholders}
          maxLength={10}
          secureTextEntry={false}
          keyboardType="numeric"
          onChangeText={(text) => setBirthday(text)}
          value={birthday}
          style={styles.inputText}
        />

        <InputText
          placeholder="Email"
          placeholderTextColor={colors.placeholders}
          secureTextEntry={false}
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />

        <TextInputMask
          type={"cel-phone"}
          options={{
            maskType: "BRL",
            withDDD: true,
            dddMask: "(11) ",
          }}
          placeholder="Telefone"
          placeholderTextColor={colors.placeholders}
          keyboardType="numeric"
          secureTextEntry={false}
          onChangeText={(text) => setPhoneNumber(text)}
          value={phone_number}
          style={styles.inputText}
        />
        <SubmitButton onPress={Next}>
          <ButtonText> Próximo </ButtonText>
        </SubmitButton>
      </Form>

    </Wrapper>
  );
};

export default PersonalData;
