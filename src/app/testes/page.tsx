"use client";
import React from "react";
import { FaEllipsisV } from "react-icons/fa";
import EntityBrowser from "@/components/EntityBrowser/EntityBrowser";
import { Event } from "@/entities/Event";
import EventForm from "@/entitiesForm/EventForm";
import { Participant } from "@/entities/Participant";
import { ParticipantForm } from "@/entitiesForm/ParticipantForm";
import {
  MainAction,
  PaginatedData,
} from "@/components/EntityBrowser/EntityBrowser.types";
import { mockEvents } from "./mockevents";

const mainActions: MainAction[] = [
  {
    icon: FaEllipsisV,
    label: "More",
    onClick: () => console.log("Perform other action"),
    className: "bg-gray-500 hover:bg-gray-600 text-white",
  },
  {
    icon: FaEllipsisV,
    label: "More",
    onClick: () => console.log("Perform other action"),
    className: "bg-gray-500 hover:bg-gray-600 text-white",
  },
  {
    icon: FaEllipsisV,
    label: "More",
    onClick: () => console.log("Perform other action"),
    className: "bg-gray-500 hover:bg-gray-600 text-white",
  },
];

const fetchEvents = async (
  page: number,
  pageSize: number = 10
): Promise<PaginatedData<Event>> => {
  const totalPages = Math.ceil(mockEvents.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = mockEvents.slice(startIndex, endIndex);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { paginatedData, totalPages };
};

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
      <EntityBrowser<Event>
        title="Cadastro de Testes"
        fetchEntities={fetchEvents}
        entityForm={new EventForm({} as Event)}
      />

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
