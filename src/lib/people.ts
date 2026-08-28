export type PersonSlug = "darshan" | "pinku" | "raja" | "ak";

export type Person = {
  slug: PersonSlug;
  name: string;
  image: string;
  festiveImage: string;
};

export const people: Partial<Record<PersonSlug, Person>> = {
  darshan: {
    slug: "darshan",
    name: "Darshan",
    image: "/darshan.png",
    festiveImage: "/darshan-festive.png",
  },
  pinku: {
    slug: "pinku",
    name: "Akash",
    image: "/pinku.jpg",
    festiveImage: "/pinku-festive.jpg",
  },
  // raja: {
  //   slug: "raja",
  //   name: "Raja",
  //   image: "/raja.jpg",
  //   festiveImage: "/raja-festive.jpg",
  // },
  // ak: {
  //   slug: "ak",
  //   name: "AK the All-Rounder",
  //   image: "/ak.jpg",
  //   festiveImage: "/ak-festive.jpg",
  // },
};
