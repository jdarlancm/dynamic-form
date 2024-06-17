import { Participant } from "@/entities/Participant";
import { faker } from "@faker-js/faker";

const createRandomParticipant = (): Participant => {
  return {
    id: faker.number.int(),
    cpf: "string",
    name: faker.person.firstName() + " " + faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
  };
};

const generateMockParticipants = (count: number): Participant[] => {
  const participants: Participant[] = [];

  for (let i = 1; i <= count; i++) {
    const participant: Participant = createRandomParticipant();
    participants.push(participant);
  }

  return participants;
};

export const mockParticipants: Participant[] = generateMockParticipants(50);
