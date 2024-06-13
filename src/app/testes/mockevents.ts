import { Event } from "@/entities/Event";
import { addDays, format, isAfter } from "date-fns";

const generateRandomString = (length: number): string => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const generateRandomDate = (): Date => {
  const currentDate = new Date();
  const futureDate = addDays(currentDate, Math.floor(Math.random() * 365) + 1); // Adiciona até 1 ano (365 dias)
  return futureDate;
};

const generateMockEvents = (count: number): Event[] => {
  const events: Event[] = [];

  for (let i = 1; i <= count; i++) {
    const title = generateRandomString(10);
    const description = generateRandomString(20);
    const registrationDate = generateRandomDate();
    const eventDate = addDays(
      registrationDate,
      Math.floor(Math.random() * 30) + 1
    );

    const event: Event = {
      id: i,
      title,
      description,
      eventDate,
      registrationDeadline: registrationDate, // Data limite de inscrição (simulação)
      location: `Location ${i}`, // Localização (simulação)
      price: Math.floor(Math.random() * 1000) / 10, // Preço (simulação)
      simnao: Math.random() > 0.5 ? "sim" : "nao", // Sim ou Não (simulação)
    };

    events.push(event);
  }

  return events;
};

// Gerar 50 eventos para simular 5 páginas de 10 eventos cada
export const mockEvents: Event[] = generateMockEvents(50);
