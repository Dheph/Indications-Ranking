interface IAddress {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
}

import axios from "axios";

export class Verificator {

  async zipCodeVerifier(zip_code: string): Promise<IAddress | void> {
    zip_code = zip_code.replace(/-/g, '');
    if (zip_code.length < 8) {
      throw new Error("Cep Inválido");
    }
    try {
      const zipCode = await axios.get<IAddress>(
        `https://brasilapi.com.br/api/cep/v1/${zip_code}`
      )

      if (zipCode.status === 200) {
        return zipCode.data
      }
      return;
    } catch (error) {
      console.log(error);
      throw new Error("Cheque os dados de endereço e verifique o CEP");
    }
  }
}
