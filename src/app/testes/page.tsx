"use client";
import React from "react";
import EntityBrowser from "@/components/EntityBrowser/EntityBrowser";
import { Participant } from "@/entities/Participant";
import { ParticipantForm } from "@/entitiesForm/ParticipantForm";
import {
  Filter,
  FilterCondition,
  MainAction,
  PaginatedData,
} from "@/components/EntityBrowser/EntityBrowser.types";

const fetchMockParticpant = async (
  page: number,
  pageSize: number
): Promise<Participant[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "Alice Silva",
          cpf: "62046965051",
          email: "alice.silva@example.com",
          phone: "11912345678",
        },
        {
          id: 2,
          name: "Bruno Souza",
          cpf: "60575093072",
          email: "bruno.souza@example.com",
          phone: "21987654321",
        },
        {
          id: 3,
          name: "Carla Oliveira",
          cpf: "00186246005",
          email: "carla.oliveira@example.com",
          phone: "31998765432",
        },
      ]);
    }, 1000);
  });
};

const Home = () => {
  return (
    <div>
      {/*
      <br />
      <EntityBrowser<Participant>
        title="Cadastro de Testes"
        mainActions={mainActions}
        fetchEntities={fetchMockParticpant}
        entityForm={new ParticipantForm({} as Participant)}
      />
      */}
    </div>
  );
};

export default Home;
