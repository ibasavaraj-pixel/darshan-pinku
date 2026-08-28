import { promises as fs } from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "data", "counter.json");

export type Entry = { name: string; person: string; time: string };
type State = { date: string; count: number; entries: Entry[] };

function today() {
  return new Date().toISOString().slice(0, 10);
}

async function read(): Promise<State> {
  try {
    const raw = await fs.readFile(FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { date: today(), count: 0, entries: [] };
  }
}

async function write(state: State) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(state));
}

export async function getCount(): Promise<number> {
  const state = await read();
  return state.date === today() ? state.count : 0;
}

export async function incrementCount(
  name: string,
  person: string
): Promise<number> {
  const state = await read();
  const fresh = state.date === today();
  const entries = fresh ? state.entries : [];
  entries.push({ name, person, time: new Date().toISOString() });

  const next: State = { date: today(), count: entries.length, entries };
  await write(next);
  return next.count;
}
