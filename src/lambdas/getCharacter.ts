import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { get } from "../helper/api";
import config from "../config";
import headers from "../config/headers";
import { errorHandler } from "../handlers/error";
import { ApiCharacter, Character } from "../interfaces/starWars";
import { getLocalCharacter, toEsCharacter } from "../helper/character";

const getCharacter = async (id: string) => {
  const apiCharacter = await get<ApiCharacter>(
    `${config.API_URL}/people/${id}/`
  );

  if (!apiCharacter) throw new Error("No se encontró el personaje");

  const character: Character = await getLocalCharacter({
    id,
    ...apiCharacter,
  });

  const personaje = await toEsCharacter(character);

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(personaje),
  };
};

export const handler = async (
  event: APIGatewayProxyEvent,
  _context: Context
): Promise<APIGatewayProxyResult> => {
  _context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { id } = event?.pathParameters!;

    if (!id) throw new Error("El id es requerido");

    return await getCharacter(id);
  } catch (error) {
    return errorHandler(error);
  }
};
