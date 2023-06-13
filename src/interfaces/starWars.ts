export interface ApiCharacter {
  id?: string;
  name: string;
  height: string;
  gender: string;
  homeworld: string;
  vehicles: string[];
  starships: string[];
  species: string[];
}

export interface Character {
  id: string;
  name: string;
  height: number;
  gender: string;
  homeworld: string;
  vehicles: string[];
  starships: string[];
  createdAt: string;
}

export interface Personaje {
  id: string;
  nombre: string;
  altura: number;
  genero: string;
  planetaNatal: string;
  vehiculos: string[];
  navesEstelares: string[];
  createdAt: string;
}

export interface PersonajeInput {
  nombre: string;
  altura: number;
  genero: string;
  planetaNatal: string;
  vehiculos: string[];
  navesEstelares: string[];
}
