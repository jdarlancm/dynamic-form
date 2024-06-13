"use client";
import React from "react";
import { FaEllipsisV } from "react-icons/fa";
import EntityBrowser from "@/components/EntityBrowser/EntityBrowser";
import { MainAction } from "@/components/EntityBrowser/MainAction";
import { Event } from "@/entities/Event";
import EventForm from "@/entitiesForm/EventForm";
import { Participant } from "@/entities/Participant";
import { ParticipantForm } from "@/entitiesForm/ParticipantForm";

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

const fetchMockEvents = async (): Promise<Event[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Event 1",
          description: "Description 1",
          eventDate: new Date("2024-06-01"),
          registrationDeadline: new Date("2024-05-25"),
          location: "Location 1",
          price: 100,
          simnao: "simplorio",
        },
        {
          id: 2,
          title: "Event 2",
          description: "Description 2",
          eventDate: new Date("2024-07-01"),
          registrationDeadline: new Date("2024-06-25"),
          location: "Location 2",
          price: 150,
          simnao: "nao",
        },
        {
          id: 3,
          title: "Event 3",
          description: "Description 3",
          eventDate: new Date("2024-08-01"),
          registrationDeadline: new Date("2024-07-25"),
          location: "Location 3",
          price: 200,
          simnao: "sim",
        },
      ]);
    }, 1000);
  });
};

const fetchMockParticpant = async (): Promise<Participant[]> => {
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
        mainActions={mainActions}
        fetchEntities={fetchMockEvents}
        entityForm={new EventForm({} as Event)}
      />

      <br />
      <EntityBrowser<Participant>
        title="Cadastro de Testes"
        mainActions={mainActions}
        fetchEntities={fetchMockParticpant}
        entityForm={new ParticipantForm({} as Participant)}
      />
      {/*
      <div className="bg-gray-200 dark:bg-gray-800 w-11/12 m-auto mt-4 text-gray-700 dark:text-gray-200 rounded-md p-2">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-1">
            <div className="p-2 grid col-span-1 border">1</div>
            <div className="p-2 grid col-span-1 md:col-span-2 lg:col-span-3 border">
              2
            </div>
            <div className="p-2 grid col-span-1 border">3</div>
            <div className="p-2 grid col-span-1 border">4</div>
            <div className="p-2 grid col-span-1 border">5</div>
            <div className="p-2 grid col-span-1 border">6</div>
            <div className="p-2 grid col-span-1 border">7</div>
            <div className="p-2 grid col-span-1 border">8</div>
            <div className="p-2 grid col-span-1 border">9</div>
            <div className="p-2 grid col-span-1 border">10</div>
            <div className="p-2 grid col-span-1 border">11</div>
            <div className="p-2 grid col-span-1 border">12</div>
          </div>
        </form>
      </div>
      */}
    </div>
  );
};

export default Home;
