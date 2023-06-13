import AWS from "aws-sdk";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { get } from "../helper/api";
import config from "../config";
import headers from "../config/headers";
import { v4 } from "uuid";
import { errorHandler } from "../handlers/error";
import { ApiCharacter, Character, Personaje } from "../interfaces/starWars";
import { getLocalCharacter, toEsCharacter } from "../helper/character";
import { postCharacter } from "../dao/character";

const getCharacter = async (id: string): Promise<Personaje> => {
  const apiCharacter = await get<ApiCharacter>(
    `${config.API_URL}/people/${id}/`
  );

  if (!apiCharacter) throw new Error("No se encontró el personaje");

  const character: Character = await getLocalCharacter({
    id: v4(),
    ...apiCharacter,
  });

  return toEsCharacter(character);
};

export const handler = async (
  event: APIGatewayProxyEvent,
  _context: Context
): Promise<APIGatewayProxyResult> => {
  _context.callbackWaitsForEmptyEventLoop = false;

  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const { id } = JSON.parse(event.body!);

    if (!id) throw new Error("El id es requerido");

    const character = await getCharacter(id);

    await postCharacter(character, dynamodb);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(character),
    };
  } catch (error) {
    return errorHandler(error);
  }
};
