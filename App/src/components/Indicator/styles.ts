import styled from 'styled-components/native';
import colors from '../../styles/colors';

export const Container = styled.View`
margin-top:9%;
justify-content:center;
align-items:center;
`;

export const Indicators = styled.View`
width:90%;
flex-direction:row;
justify-content:center;
align-items:center;
background-color:${colors.primary};
padding:20px;
border-radius:20px;
`;

export const CompetitorsImage = styled.Image`
width:50px;
height:50px;
border-radius:20px;
`;