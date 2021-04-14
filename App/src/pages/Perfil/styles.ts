import styled from "styled-components/native";
import colors from "../../styles/colors";

export const Heading = styled.View`
  margin: 2%;
  border-bottom-width: 2px;
  border-bottom-color: ${colors.lighText};
`;

export const UserImg = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 50px;
  border-width: 0.5px;
  border-color: ${colors.primary};
`;

export const UserData = styled.View`
  flex-direction: row;
  margin: 2%;
`;

export const UserInformations = styled.View`
  justify-content: center;
  text-align: center;
  margin: 2%;
`;

export const Body = styled.ScrollView``;

export const UserOption = styled.View`
  margin: 5%;
  background-color:${colors.primary};

  justify-content: center;
  align-items: center;
  padding: 3%;
  border-radius: 20px;
`;

export const FooterOption = styled.TouchableOpacity`
  margin-top: 2%;
  margin-bottom: 5%;
  margin-left: 25%;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  padding:5%;
  width:50%;
  height:8%;
`;
