import { ActionReturn } from "@/components/EntityBrowser/EntityBrowser.types";
import {
  FormAction,
  FormField,
  FieldTypes,
  EntityForm,
  ZOD_VALIDATOR,
} from "@/components/Form";
import { Participant } from "@/entities/Participant";

export class ParticipantForm implements EntityForm<Participant> {
  object: Participant;
  newObject = {
    id: 0,
    cpf: "",
    name: "",
    email: "",
    phone: "",
  };

  constructor(participant: Participant) {
    this.object = participant;
  }

  onCreate(object: Participant): ActionReturn {
    console.log(object);
    return {
      success: true,
      message: "Participante criado com sucesso!",
    };
  }

  onUpdate(object: Participant): ActionReturn {
    console.log(object);
    return {
      success: true,
      message: "Participante atualizado com sucesso!",
    };
  }

  onDelete(object: Participant): ActionReturn {
    console.log(object);
    return {
      success: true,
      message: "Participante apagado com sucesso!",
    };
  }

  createFormSchema(action: FormAction): FormField[] {
    return this.baseSchema.map((field) => ({
      ...field,
      value: this.object ? this.object[field.name as keyof Participant] : "",
    }));
  }

  idSchema: FormField = {
    name: "id",
    label: "ID",
    type: FieldTypes.int,
    required: false,
    readOnly: false,
    validator: ZOD_VALIDATOR.positiveIntegerOptional,
    visibleInList: false,
    primaryKey: true,
  };

  cpfSchema: FormField = {
    name: "cpf",
    label: "CPF",
    type: FieldTypes.text,
    required: true,
    validator: ZOD_VALIDATOR.cpf,
    mask: "999.999.999-99",
  };

  nameSchema: FormField = {
    name: "name",
    label: "Nome",
    type: FieldTypes.text,
    required: true,
    validator: ZOD_VALIDATOR.lettersRequired,
  };

  emailSchema: FormField = {
    name: "email",
    label: "E-mail",
    type: FieldTypes.email,
    required: true,
    validator: ZOD_VALIDATOR.email,
  };

  phoneSchema: FormField = {
    name: "phone",
    label: "Telefone",
    type: FieldTypes.text,
    validator: ZOD_VALIDATOR.cellphoneOptional,
    mask: "(99) 9 9999-9999",
  };

  baseSchema: FormField[] = [
    this.cpfSchema,
    this.nameSchema,
    this.emailSchema,
    this.phoneSchema,
  ];
}
