import React, { useEffect, useState } from "react";
import {TouchableOpacity, Alert, Text, Modal,RefreshControl} from "react-native";
import { Wrapper, Form, ButtonText } from "../../styles/globalStyles";
import { SubmitButton } from "../Login/styles";
import { TopImage, Input } from "./styles";
import indicationImg from "../../images/indication.jpg";
import colors from "../../styles/colors";
import { api } from "../../services/api";
import { TextInputMask } from "react-native-masked-text";
import { styles } from "../../styles/styles";
import { Verificator } from "../../services/verificator";
import { Title } from "../PersonalData/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Feather} from '@expo/vector-icons'
import {Header,ContentList,List} from './styles'
import Indicated from "../../components/Indicated";

interface IIndicated {
  
      id:string;
      name:string;
      phone:string;
      zip_code:string;
      queue:string;
      indication_date:string;
}

const IndicationPanel = () => {
  const [open,setOpen] = useState<boolean>(false)
  const [name, setName] = useState<string>("");
  const [phone_number, setPhoneNumber] = useState<string>("");
  const [zip_code, setZipCode] = useState<string>("");
  const [indicateds,setIndicateds] = useState<IIndicated[]>([]);
  const [refreshing, setRefreshing] = useState(false);


  useEffect(() => {
    loadIndications()
  },[])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

   loadIndications().then(() => setRefreshing(false));
  }, []);

  async function loadIndications() {
    const token = await AsyncStorage.getItem('token')
    console.log('token ' + token)
    const headers = {
      'Authorization': token
    }
    await api.get('list/indications', { headers: headers }).then((response) => {
     setIndicateds(response.data.data.indications)

      console.log(response.data.data.indications)
    }).catch((error) => {
      console.log(error)
    })
  }
  const verificator = new Verificator();

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
      })
      .catch((error) => {
        console.log(error.message);
        setZipCode("");
        return Alert.alert("Opa", error.message);
      });
  }
  async function handleIndication() {

    const token = await AsyncStorage.getItem('token')

    try {

      const data = {
        name,
        phone: phone_number,
        zip_code
      }
      const headers = {
        'Authorization': token
      }

      await api.post('/new/indication', data, { headers: headers }).then((response) => {
        if (response.data.message) {
          return Alert.alert('Ops', response.data.message)
        }
        setName('')
        setPhoneNumber('')
        setZipCode('')
        return Alert.alert("Muito bom", 'Indicação realizada com sucesso!')
      })
    } catch (error) {
      return Alert.alert(
        "Ocorreu um erro inesperado!!",
        "Por gentileza verifique os dados e tente novamente"
      );
    }
  }
  return (
    <Wrapper>
      <Title style={{ fontSize: 28 }}> Indique um amigo </Title>
      <Form>
        <TopImage source={indicationImg} />
        <Title style={{ fontSize: 18 }}>
          {" "}
          Dados de quem você deseja indicar{" "}
        </Title>

        <Input
          placeholder="Nome 👤"
          placeholderTextColor={colors.placeholders}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInputMask
          type={"cel-phone"}
          options={{
            maskType: "BRL",
            withDDD: true,
            dddMask: "(11) ",
          }}
          placeholder="Telefone 📱"
          placeholderTextColor={colors.placeholders}
          keyboardType="numeric"
          secureTextEntry={false}
          onChangeText={(text) => setPhoneNumber(text)}
          value={phone_number}
          style={styles.inputText}
        />
        <TextInputMask
          type={"zip-code"}
          placeholder="CEP 📍"
          placeholderTextColor={colors.placeholders}
          secureTextEntry={false}
          keyboardType="number-pad"
          onChangeText={(text) => zipVerify(text)}
          value={zip_code}
          style={styles.inputText}
        />
        <SubmitButton onPress={handleIndication}>
          <ButtonText> Indicar </ButtonText>
        </SubmitButton>
        <TouchableOpacity style={{marginTop:20,borderBottomColor:"#003352",borderBottomWidth:1}} onPress={() => setOpen(true)}>
         <Text style={{fontSize:18,color:colors.primary}} >
          Minhas Indicações 
          </Text>
        </TouchableOpacity>
      </Form>

      {
        <Modal 
        visible={open} 
        animationType="fade" 
        presentationStyle="fullScreen" 
        transparent={false}>
          <Header style={{flexDirection:'row'}}>
            <TouchableOpacity style={{marginRight:30}} onPress={() => setOpen(false)}>
              <Feather name="arrow-left" color={colors.primary} size={30}/>
            </TouchableOpacity>
                <Title
                onPress={() => setOpen(false)} 
                style={{color:colors.secondary,fontWeight:'bold',marginRight:30}}
                >
                    Histórico de indicações
                </Title>
            </Header>

                <List
                data={indicateds}
                renderItem={({item}) => (
                    <ContentList>
                        <Indicated indicated={item} />
                    </ContentList>
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                />
        </Modal>
      }

    </Wrapper>
  );
};

export default IndicationPanel;
