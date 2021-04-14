import styled from "styled-components/native";
import colors from "./colors";

export const Container = styled.View`
  margin-top: 5%;
  flex: 1;
  background-color: ${colors.background};
`;

export const Wrapper = styled.SafeAreaView`
  margin-top: 10%;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.background};
`;

export const TitleImage = styled.Image`
  width: 250px;
  height: 250px;
  border-radius: 50px;
`;

export const Form = styled.View`
  padding: 7%;
  justify-content: center;
  align-items: center;
`;

export const InputText = styled.TextInput`
  border-width: 2px;
  border-color: ${colors.primary};
  border-radius: 10px;
  padding: 10px;
  width: 370px;
  height: 70px;
  margin: 3%;
  font-size: 24px;
  color: ${colors.darkText};
  font-weight: bold;
  font-family: Roboto;
  text-align: center;
  align-items: center;
`;

export const SubmitButton = styled.TouchableOpacity`
  width: 370px;
  height: 70px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.primary};
  border-radius: 10px;
  top: 5%;
`;

export const ButtonText = styled.Text`
  color: ${colors.lighText};
  font-size: 22px;
  font-weight: bold;
`;
