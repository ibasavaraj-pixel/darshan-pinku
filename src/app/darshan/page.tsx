import { notFound } from "next/navigation";
import LonelyCard from "@/components/LonelyCard";
import { people } from "@/lib/people";

export default function DarshanPage() {
  const person = people.darshan;
  if (!person) notFound();
  return <LonelyCard person={person} />;
}
