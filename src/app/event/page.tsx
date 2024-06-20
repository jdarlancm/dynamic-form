"use client";
import React from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { TbReportAnalytics } from "react-icons/tb";

import {
  Filter,
  FilterCondition,
  MainAction,
  PaginatedData,
} from "@/components/EntityBrowser/EntityBrowser.types";
import EntityBrowser from "@/components/EntityBrowser";

import EventForm from "@/entitiesForm/EventForm";
import { Event } from "@/entities/Event";

import { mockEvents } from "../mocks/mockevents";
import { filterConditionConverter } from "@/utils/filterConditionConverter";

const Home = () => {
  const mainActions: MainAction[] = [
    {
      icon: IoIosNotificationsOutline,
      label: "Notificar",
      onClick: () => console.log("Notificar"),
      className: "bg-gray-500 hover:bg-gray-600 text-white",
    },
    {
      icon: TbReportAnalytics,
      label: "Relatório",
      onClick: () => console.log("Relatório"),
      className: "bg-gray-500 hover:bg-gray-600 text-white",
    },
  ];

  const fetchEvents = async (
    page: number,
    pageSize: number = 10,
    filters?: Filter[]
  ): Promise<PaginatedData<Event>> => {
    let mockFiltered = mockEvents;

    if (filters && filters.length > 0) {
      mockFiltered = mockEvents.filter((event) =>
        filters.every((filter) => filterConditionConverter(filter)(event))
      );
    }

    const totalPages = Math.ceil(mockFiltered.length / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = mockFiltered.slice(startIndex, endIndex);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return { paginatedData, totalPages };
  };

  return (
    <div>
      <EntityBrowser<Event>
        title="Gerenciar Eventos"
        fetchEntities={fetchEvents}
        entityForm={new EventForm({} as Event)}
        mainActions={mainActions}
      />
    </div>
  );
};

export default Home;
