import { notFound } from "next/navigation";
import LonelyCard from "@/components/LonelyCard";
import { people } from "@/lib/people";

export default function PinkuPage() {
  const person = people.pinku;
  if (!person) notFound();
  return <LonelyCard person={person} />;
}
