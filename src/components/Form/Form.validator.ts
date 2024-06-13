import { z } from "zod";

// 1. Texto que permite apenas letras e não obrigatório
const lettersOptional = z
  .string()
  .regex(/^[A-Za-z]*$/, "Apenas letras são permitidas")
  .optional();

// 2. Texto que permite apenas letras e obrigatório
const lettersRequired = z
  .string()
  .min(1, "Campo obrigatório")
  .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "Apenas letras e espaços são permitidos");

// 3. Texto que permite qualquer string e obrigatório
const anyStringRequired = z.string().min(1, "Campo obrigatório");
const anyStringOptional = z.string();

// 4. Texto que seja uma data e não obrigatório
const dateOptional = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de data inválido")
  .optional();

// 5. Texto que seja uma data e obrigatório
const dateRequired = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de data inválido");

// 6. Texto que seja uma data, obrigatório e que não permita data no passado
const dateNotPastRequired = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de data inválido")
  .refine((date) => {
    const [year, month, day] = date.split("-").map(Number);
    const dateObj = new Date(year, month - 1, day);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    return dateObj >= hoje;
  }, "Data não pode ser anterior a hoje")
  .transform((str) => new Date(str));

// 7. Texto que seja data, não obrigatório e que não permita data no passado
const dateNotPastOptional = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de data inválido")
  .optional()
  .refine((date) => {
    if (!date) return true;

    const [year, month, day] = date.split("-").map(Number);
    const dateObj = new Date(year, month - 1, day);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    return dateObj >= hoje;
  }, "Data não pode ser anterior a hoje");

// 8. Texto data, obrigatório, e que não permita data no futuro
const dateNotFutureRequired = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de data inválido")
  .refine(
    (date) => new Date(date) <= new Date(),
    "Data não pode estar no futuro"
  );

// 9. Texto data, não obrigatório e que não permita data no futuro
const dateNotFutureOptional = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de data inválido")
  .optional()
  .refine(
    (date) => !date || new Date(date) <= new Date(),
    "Data não pode estar no futuro"
  );

// 10. Texto data e obrigatório
const dateOnlyRequired = dateRequired;

// 11. Texto data e não obrigatório
const dateOnlyOptional = dateOptional;

// 12. Que seja um CPF
const cpf = z
  .string()
  .regex(/^(?:\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/, "Formato de CPF inválido");
//.regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Formato de CPF inválido");

// 13. Que seja CNPJ
const cnpj = z
  .string()
  .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "Formato de CNPJ inválido");

// 14. Que seja email
const email = z.string().email("Formato de email inválido");

// 15. Que seja CEP
const cep = z.string().regex(/^\d{5}-\d{3}$/, "Formato de CEP inválido");

// 16. Que seja um inteiro positivo e obrigatório
const positiveIntegerRequired = z
  .number()
  .int()
  .positive("Deve ser um número inteiro positivo");

// 17. Que seja um inteiro positivo e não obrigatório
const positiveIntegerOptional = z.preprocess(
  (val) => {
    if (typeof val === "string") {
      const numberVal = parseInt(val, 10);
      return isNaN(numberVal) ? undefined : numberVal;
    }
    return val;
  },
  z
    .number()
    .int()
    .optional()
    .refine((value) => value === undefined || value >= 0, {
      message: "Deve ser um número inteiro positivo e maior que zero",
    })
);

// 18. Que seja um número decimal positivo e obrigatório
const positiveDecimalRequired = z
  .number()
  .positive("Deve ser um número decimal positivo");

// 19. Que seja um número decimal positivo e não obrigatório
const positiveDecimalOptional = z
  .number()
  .positive("Deve ser um número decimal positivo")
  .optional();

const currency = z
  .string()
  .regex(/^\d{1,3}(\.\d{3})*,\d{2}$/, "Formato de valor inválido");

const cellphoneRequired = z
  .string()
  .regex(/^\(\d{2}\) 9 \d{4}-\d{4}$/, "Telefone inválido.");

const cellphoneOptional = cellphoneRequired.or(z.literal("")).optional();

const selectOptionOptional = z.string().nullable().or(z.literal(""));

// Exporta as validações como um objeto
export const ZOD_VALIDATOR = {
  lettersOptional,
  lettersRequired,
  anyStringRequired,
  anyStringOptional,
  dateOptional,
  dateRequired,
  dateNotPastRequired,
  dateNotPastOptional,
  dateNotFutureRequired,
  dateNotFutureOptional,
  dateOnlyRequired,
  dateOnlyOptional,
  cpf,
  cnpj,
  email,
  cep,
  positiveIntegerRequired,
  positiveIntegerOptional,
  positiveDecimalRequired,
  positiveDecimalOptional,
  currency,
  cellphoneRequired,
  cellphoneOptional,
  selectOptionOptional,
};
