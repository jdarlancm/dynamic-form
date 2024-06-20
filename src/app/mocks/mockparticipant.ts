import { Participant } from "@/entities/Participant";
import { faker } from "@faker-js/faker";

function generateRandomDigit(): number {
  return Math.floor(Math.random() * 10);
}

function calculateVerifierDigit(digits: number[]): number {
  let sum = 0;

  for (let i = 0; i < digits.length; i++) {
    sum += digits[i] * (digits.length + 1 - i);
  }

  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}

function generateCPF(): string {
  const cpf = [];

  // Generate first 9 random digits
  for (let i = 0; i < 9; i++) {
    cpf.push(generateRandomDigit());
  }

  // Calculate the first verifier digit
  cpf.push(calculateVerifierDigit(cpf));

  // Calculate the second verifier digit
  cpf.push(calculateVerifierDigit(cpf));

  // Join digits and return the CPF as a string without punctuation
  return cpf.join("");
}

const createRandomParticipant = (): Participant => {
  return {
    id: faker.number.int(),
    cpf: generateCPF(),
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
