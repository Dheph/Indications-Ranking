import styled from 'styled-components/native';
import colors from '../../styles/colors';

export const Header = styled.View`
height:20%;
top:2%;
left:4%;
`;


export const RankingList = styled.View`
margin-top:4%;
justify-content:center;
align-items:center;
`;

export const Indicators = styled.View`
width:90%;
flex-direction:row;
justify-content:center;
align-items:center;
background-color:${colors.lighText};
padding:20px;
border-radius:20px;
`;

export const CompetitorsImage = styled.Image`
width:50px;
height:50px;
border-radius:20px;
`;

export const HeaderIconsContent = styled.View`
    flex-direction:row;
    left:15%;
    height:35px;
    width:35px;
`;