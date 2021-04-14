export interface IPerfilDTO {
  indicator: {
    id: string;
    cpf: string;
    name: string;
    username: string;
    register_date: string;
    birthday: string;
    email?: string;
    phone_number: string;
    zip_code: string;
    neighborhood: string;
    street: string;
    complement?: string;
    number: string;
  }
}