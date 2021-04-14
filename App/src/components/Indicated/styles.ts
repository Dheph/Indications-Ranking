import styled from 'styled-components/native';
import colors from '../../styles/colors';



export const Container = styled.View`
    flex-direction:row;
    margin:5%;
`;


export const Content = styled.View`

background-color:#fff;
border-bottom-width:3px;
border-right-width:1px;
border-bottom-color:${colors.secondary};
border-right-color:${colors.secondary};
margin:10px;
width:40%;
align-items:center;
justify-content:center;
padding:10px;
border-top-right-radius:10px;
/* border-radius:50px; */

`;

export const Text = styled.Text`
color:${colors.primary};
font-weight:600;
font-size:17px;
text-align:center;
margin:2%;

`;