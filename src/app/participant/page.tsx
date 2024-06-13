"use client";
import React from "react";

import { redirect } from "next/navigation";
import { FormAction } from "@/components/Form/Form.types";
import { Participant } from "@/entities/Participant";
import { ParticipantForm } from "@/entitiesForm/ParticipantForm";
import Form from "@/components/Form";

const Home = () => {
  const onSubmit = (data: Participant) => {
    console.log("Formulário enviado:", data);
  };

  const onCancel = () => {
    console.log("Formulário cancelado!");
    redirect("/");
  };

  const participant: Participant = {
    id: 1,
    cpf: "011.428.324-90",
    name: "Joaozinho",
    email: "asdasdasd",
    phone: "85484",
  };
  const participantForm = new ParticipantForm(participant);

  const actionForm = FormAction.CREATE;
  const schemaForm = participantForm.createFormSchema(actionForm);

  return (
    <div>
      <h1>Novo Participante</h1>
      <Form<Participant>
        schema={schemaForm}
        columns={2}
        action={actionForm}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </div>
  );
};

export default Home;
