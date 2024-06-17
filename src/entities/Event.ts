export interface Event {
  id: number;
  title: string;
  description: string;
  eventDate: Date | null;
  registrationDeadline: Date | null;
  location: string;
  price: number;
  typeEvent: string;
}
