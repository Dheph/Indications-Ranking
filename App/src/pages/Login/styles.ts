import styled from "styled-components/native";
import colors from "../../styles/colors";

export const Container = styled.View``;

export const TitleImage = styled.Image`
  width: 250px;
  height: 250px;
  border-radius: 50px;
`;

export const Form = styled.View`
  padding: 7%;
  justify-content: center;
  align-items: center;
  margin-bottom: 10%;
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
`;

export const ButtonText = styled.Text`
  color: ${colors.lighText};
  font-size: 22px;
  font-weight: bold;
`;

export const FooterButton = styled.TouchableOpacity`
    text-align:center;
    justify-content:center;
`;

export const FooterText = styled.Text`
    color:${colors.darkText};
    font-size:20px;
    font-weight:600;
`;
