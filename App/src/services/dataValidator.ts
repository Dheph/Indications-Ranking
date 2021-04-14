import { cpf } from "cpf-cnpj-validator";

function validate() {

  function validate_cpf(cpfNumber: string): boolean {
    const cpfValidation = cpf.isValid(cpfNumber);
    return cpfValidation;
  }

  return {
    validate_cpf,
  };
}

export { validate }
