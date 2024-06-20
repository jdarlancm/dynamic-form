import { ActionReturn } from "@/components/EntityBrowser/EntityBrowser.types";
import {
  FormAction,
  FormField,
  FieldTypes,
  EntityForm,
  ZOD_VALIDATOR,
} from "@/components/Form";
import { Event } from "@/entities/Event";

class EventForm implements EntityForm<Event> {
  object: Event;

  newObject = {
    id: 0,
    title: "",
    description: "",
    eventDate: null,
    registrationDeadline: null,
    location: "",
    price: 0.0,
    typeEvent: "",
  };

  constructor(event: Event) {
    this.object = event;
  }

  onCreate(object: Event): ActionReturn {
    console.log("Create: ", object);
    return {
      success: true,
      message: "Evento criado com sucesso!",
    };
  }

  onUpdate(object: Event): ActionReturn {
    console.log("Update:", object);
    return {
      success: false,
      message: "Evento atualizado com sucesso!",
    };
  }

  onDelete(object: Event): ActionReturn {
    console.log("Delete:", object);
    return {
      success: true,
      message: "Evento apagado com sucesso!",
    };
  }

  createFormSchema(action: FormAction): FormField[] {
    return this.baseSchema.map((field) => ({
      ...field,
      value: this.object ? this.object[field.name as keyof Event] : "",
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

  titleSchema: FormField = {
    name: "title",
    label: "Titulo",
    type: FieldTypes.text,
    required: true,
    validator: ZOD_VALIDATOR.lettersRequired,
    widthInList: "30%",
    filtrableInList: true,
  };

  descriptionSchema: FormField = {
    name: "description",
    label: "Descrição",
    type: FieldTypes.textarea,
    required: true,
    validator: ZOD_VALIDATOR.lettersRequired,
    customClassName: "md:col-span-2 lg:col-span-3",
    visibleInList: false,
    filtrableInList: true,
  };

  eventDateSchema: FormField = {
    name: "eventDate",
    label: "Data do evento",
    type: FieldTypes.date,
    required: true,
    validator: ZOD_VALIDATOR.dateNotPastRequired,
    filtrableInList: true,
  };

  registrationDeadlineSchema: FormField = {
    name: "registrationDeadline",
    label: "Prazo para inscrição",
    type: FieldTypes.date,
    required: true,
    validator: ZOD_VALIDATOR.dateNotPastRequired,
  };

  locationSchema: FormField = {
    name: "location",
    label: "Local",
    type: FieldTypes.text,
    required: false,
    validator: ZOD_VALIDATOR.anyStringOptional,
  };

  priceSchema: FormField = {
    name: "price",
    label: "Valor do evento",
    type: FieldTypes.currency,
    required: false,
    validator: ZOD_VALIDATOR.currency,
  };

  testeSchema: FormField = {
    name: "typeEvent",
    label: "Tipo do evento",
    type: FieldTypes.select,
    required: true,
    options: [
      { value: "palestra", label: "Palestra" },
      { value: "minicurso", label: "Mini Curso" },
      { value: "congresso", label: "Congresso" },
      { value: "workshop", label: "Workshop" },
    ],
    validator: ZOD_VALIDATOR.selectOptionOptional,
    visibleInList: false,
  };

  baseSchema: FormField[] = [
    this.idSchema,
    this.titleSchema,
    this.descriptionSchema,
    this.eventDateSchema,
    this.registrationDeadlineSchema,
    this.locationSchema,
    this.priceSchema,
    this.testeSchema,
  ];
}

export default EventForm;
