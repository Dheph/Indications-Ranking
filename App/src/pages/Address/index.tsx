import React, { useState, useEffect } from "react";

import {
  ButtonText,
  Form,
  InputText,
  SubmitButton,
  Wrapper,
} from "../../styles/globalStyles";
import { TextInputMask } from "react-native-masked-text";

import { Container, Title } from "./styles";
import { Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import colors from "../../styles/colors";
import { styles } from "../../styles/styles";

import { Verificator } from "../../services/verificator";
import { TextInput } from "react-native-gesture-handler";
import { IIndicator } from "../PersonalData/IIndicator";

const Address = () => {
  const [zip_code, setZipCode] = useState<string>("");
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [complement, setComplement] = useState<string>(" ");
  const [number, setNumber] = useState<string>("");
  const [campsInput, setCampsInput] = useState<boolean>();

  const navigator = useNavigation();
  const verificator = new Verificator();

  const route = useRoute();
  const indicator: IIndicator = route.params.indicator;

  useEffect(() => {
    setCampsInput(true);
    autoInput()
    console.log(campsInput);
  }, []);

  function autoInput() {
    if (!indicator) {
      return
    }
    setZipCode(indicator.zip_code);
    return searchAddress(indicator.zip_code);
  }

  function zipVerify(zipCode: string) {
    setZipCode(zipCode);
    if (zipCode.length < 9) {
      return;
    }
    return searchAddress(zipCode);
  }
  async function searchAddress(zipCode: string) {

    await verificator
      .zipCodeVerifier(zipCode)
      .then((zipCodeResponse: any) => {
        setZipCode(zipCodeResponse.cep);
        setNeighborhood(zipCodeResponse.neighborhood);
        setStreet(zipCodeResponse.street);

        setCampsInput(false);
      })
      .catch((error) => {
        console.log(error.message);
        setZipCode("");
        setNeighborhood("");
        setStreet("");
        setCampsInput(true);
        return Alert.alert("Opa", error.message);
      });
  }

  async function Next() {
    console.log(zip_code.length);
    const zipCode = zip_code.replace(/-/g, '');
    if (zipCode.length < 8) {
      Alert.alert("Opa!", "por gentileza verifique seu CEP");
      return;
    }
     
    searchAddress(zip_code);
     
    if (
      zip_code === "" ||
      neighborhood === "" ||
      street === "" ||
      number === ""
    ) {
      return Alert.alert("Ops", "Preencha todos os campos para continuar.");
    }

    indicator.zip_code = zip_code;
    indicator.neighborhood = neighborhood;
    indicator.street = street;
    indicator.complement = complement;
    indicator.number = number;

    if (!indicator) {
      return Alert.alert('Lembre-se', 'Verifique se os campos estão corretos')
    }
    navigator.navigate("registerpass", { indicator: indicator });
  }

  return (
    <Wrapper>
      <Container>
        <Title> 2° Passo de 3 </Title>
        <Title> Endereço para entrega </Title>
      </Container>
      <Form>
        <TextInputMask
          type={"zip-code"}
          placeholder="CEP"
          placeholderTextColor={colors.placeholders}
          secureTextEntry={false}
          keyboardType="number-pad"
          onChangeText={(text) => zipVerify(text)}
          value={zip_code}
          style={styles.inputText}
        />
        <TextInput
          placeholder="Bairro"
          placeholderTextColor={
            campsInput ? colors.lighText : colors.placeholders
          }
          secureTextEntry={false}
          onChangeText={(text) => setNeighborhood(text)}
          value={neighborhood}
          caretHidden={campsInput ? true : false}
          style={
            campsInput
              ? {
                ...styles.inputText,
                backgroundColor: colors.hiddenBackground,
                borderWidth: 0.5,
              }
              : { ...styles.inputText }
          }
        />
        <InputText
          placeholder="Rua"
          placeholderTextColor={
            campsInput ? colors.lighText : colors.placeholders
          }
          secureTextEntry={false}
          onChangeText={(text) => setStreet(text)}
          value={street}
          caretHidden={campsInput ? true : false}
          style={
            campsInput
              ? {
                ...styles.inputText,
                backgroundColor: colors.hiddenBackground,
                borderWidth: 0.5,
              }
              : { ...styles.inputText }
          }
        />
        <InputText
          placeholder="Número"
          placeholderTextColor={colors.placeholders}
          secureTextEntry={false}
          maxLength={6}
          onChangeText={(text) => setNumber(text)}
          value={number}
        />
        <InputText
          placeholder="Complemento"
          placeholderTextColor={colors.placeholders}
          secureTextEntry={false}
          onChangeText={(text) => setComplement(text)}
          value={complement}
        />
        <SubmitButton onPress={Next}>
          <ButtonText> Próximo </ButtonText>
        </SubmitButton>
      </Form>

    </Wrapper>
  );
};

export default Address;
