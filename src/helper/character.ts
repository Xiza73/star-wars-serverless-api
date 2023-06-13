import { ApiCharacter, Character, Personaje } from "../interfaces/starWars";
import { get } from "./api";
import { translate } from "./translate";

export const getLocalCharacter = async (
  apiCharacter: ApiCharacter
): Promise<Character> => {
  const homeworldName =
    (await get<{ name: string }>(apiCharacter?.homeworld))?.name || "";

  const vehicles: string[] = [];
  await Promise.all(
    apiCharacter?.vehicles.map(async (vehicle) => {
      const res = await get<{ name: string; model: string }>(vehicle);
      if (!res) return;
      vehicles.push(`${res.name} (${res.model})`);
    })
  );

  const starships: string[] = [];
  await Promise.all(
    apiCharacter?.starships.map(async (starship) => {
      const res = await get<{ name: string; model: string }>(starship);
      if (!res) return;
      starships.push(`${res.name} (${res.model})`);
    })
  );

  const species: string[] = [];
  await Promise.all(
    apiCharacter?.species.map(async (specie) => {
      const res = await get<{ name: string }>(specie);
      if (!res) return;
      species.push(res.name);
    })
  );

  return {
    id: apiCharacter.id || "",
    name: apiCharacter.name,
    height: parseInt(apiCharacter.height),
    gender: apiCharacter.gender,
    homeworld: homeworldName || "",
    vehicles,
    starships,
    createdAt: new Date().toISOString(),
  };
};

export const toEsCharacter = async (
  character: Character
): Promise<Personaje> => {
  const personaje: any = {};

  for await (const [key, value] of Object.entries(character)) {
    const newKey = await translate(key, "es");

    personaje[newKey] = value;
  }

  return personaje;
};
