import styled from "styled-components/native";
import colors from "../../styles/colors";

export const TopImage = styled.Image`
  width: 300px;
  height: 150px;
  border-radius: 50px;
`;
export const Input = styled.TextInput`
  border-width: 2px;
  border-color: ${colors.primary};
  border-radius: 10px;
  padding: 10px;
  width: 370px;
  height: 60px;
  margin: 5%;
  font-size: 24px;
  color: ${colors.darkText};
  font-weight: bold;
  font-family: Roboto;
  text-align: center;
  align-items: center;
`;

export const Header = styled.View`
    /* flex:1; */
    height:20%;
    width:100%;
    align-items:center;
    justify-content:center;
    margin:2%;
`;

export const ContentList = styled.View`
    /* flex:2; */
    /* height:80%; */
    width:100%;
    align-items:center;
    /* margin:5%; */
    /* padding:2%; */
    /* justify-content:center; */
    /* background-color:${colors.darkColor}; */
`;

export const Text = styled.Text`
    color:#fff;
    font-size:18px;
`;

export const List = styled.FlatList`

`;