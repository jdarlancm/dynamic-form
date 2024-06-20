"use client";
import React from "react";

import {
  Filter,
  PaginatedData,
} from "@/components/EntityBrowser/EntityBrowser.types";
import EntityBrowser from "@/components/EntityBrowser";

import { Participant } from "@/entities/Participant";
import { ParticipantForm } from "@/entitiesForm/ParticipantForm";

import { mockParticipants } from "../mocks/mockparticipant";
import { filterConditionConverter } from "@/utils/filterConditionConverter";

const Home = () => {
  const fetchMockParticpant = async (
    page: number,
    pageSize: number = 10,
    filters?: Filter[]
  ): Promise<PaginatedData<Participant>> => {
    let mockFiltered = mockParticipants;

    if (filters && filters.length > 0) {
      mockFiltered = mockParticipants.filter((event) =>
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
      <EntityBrowser<Participant>
        title="Cadastro de Testes"
        fetchEntities={fetchMockParticpant}
        entityForm={new ParticipantForm({} as Participant)}
      />
    </div>
  );
};

export default Home;
