import { faker } from "@faker-js/faker";

import { Event } from "@/entities/Event";

const createRandomEvent = (): Event => {
  const registrationDeadline = faker.date.future();
  return {
    id: faker.number.int(),
    title: faker.company.name(),
    description: faker.lorem.sentence(),
    registrationDeadline: registrationDeadline,
    eventDate: faker.date.soon({ days: 20, refDate: registrationDeadline }),
    location: faker.location.city(),
    price: faker.number.float(),
    typeEvent: faker.helpers.arrayElement([
      "palestra",
      "minicurso",
      "congresso",
      "workshop",
    ]),
  };
};
const generateMockEvents = (count: number): Event[] => {
  const events: Event[] = [];

  for (let i = 1; i <= count; i++) {
    const event: Event = createRandomEvent();
    events.push(event);
  }

  return events;
};

export const mockEvents: Event[] = generateMockEvents(50);
