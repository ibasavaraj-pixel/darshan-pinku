import { notFound } from "next/navigation";
import LonelyCard from "@/components/LonelyCard";
import { people } from "@/lib/people";

export default function RajaPage() {
  const person = people.raja;
  if (!person) notFound();
  return <LonelyCard person={person} />;
}
