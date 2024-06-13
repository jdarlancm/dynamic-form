"use client";
import React from "react";

import Form from "@/components/Form";
import { FormAction } from "@/components/Form/Form.types";
import { Event } from "@/entities/Event";
import EventForm from "@/entitiesForm/EventForm";
import { SubmitHandler } from "react-hook-form";

const Home = () => {
  const onSubmit: SubmitHandler<any> = (data: Event) => {
    console.log("Formulário enviado:", data);
  };

  const onCancel = () => {
    console.log("Formulário cancelado!");
  };

  const event: Event = {
    id: 1,
    title: "teste 1",
    description: "teste 2",
    eventDate: new Date("2024-06-03"),
    registrationDeadline: new Date("2024-06-04"),
    location: "teste 3",
    price: 123.9,
    simnao: "simplorio",
  };

  const eventForm = new EventForm(event);

  const actionForm = FormAction.UPDATE;
  const schemaForm = eventForm.createFormSchema(actionForm);

  return (
    <div>
      <h1>Novo Participante</h1>
      <Form<Event>
        schema={schemaForm}
        columns={4}
        action={actionForm}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </div>
  );
};

export default Home;
