import { notFound } from "next/navigation";
import LonelyCard from "@/components/LonelyCard";
import { people } from "@/lib/people";

export default function AkPage() {
  const person = people.ak;
  if (!person) notFound();
  return <LonelyCard person={person} />;
}
