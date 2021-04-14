import React from 'react';
import { Container,Content,Text } from './styles';

interface IIndicated {

      id:string;
      name:string;
      phone:string;
      zip_code:string;
      queue:string;
      indication_date:string;

}

interface Props {
  indicated:IIndicated
}

const Indicated: React.FC<Props> = ({indicated}) => {
  
  return (
    <Container>
      <Content>
        <Text> {indicated.name} </Text>
        <Text>{indicated.indication_date}</Text>
      </Content>
      <Content>
        <Text>{indicated.queue}</Text>
      </Content>
    </Container>
    
  )
}

export default Indicated