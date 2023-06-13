import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import AWS from "aws-sdk";
import { v4 } from "uuid";
import headers from "../config/headers";
import { Personaje, PersonajeInput } from "../interfaces/starWars";
import { postCharacter } from "../dao/character";
import { errorHandler } from "../handlers/error";

export const validateCharacter = ({
  nombre,
  altura,
  genero,
  navesEstelares,
  planetaNatal,
  vehiculos,
}: PersonajeInput) => {
  if (
    !nombre ||
    !altura ||
    !genero ||
    !Array.isArray(navesEstelares) ||
    !planetaNatal ||
    !Array.isArray(vehiculos)
  )
    return false;
  return true;
};

export const createCharacter = async (
  body: PersonajeInput,
  dbConn: AWS.DynamoDB.DocumentClient
) => {
  const createdAt = new Date().toISOString();
  const id = v4();

  const character: Personaje = {
    id,
    ...body,
    createdAt,
  };

  await postCharacter(character, dbConn);

  return {
    statusCode: 201,
    headers,
    body: JSON.stringify(character),
  };
};

export const handler = async (
  event: APIGatewayProxyEvent,
  _context: Context
): Promise<APIGatewayProxyResult> => {
  _context.callbackWaitsForEmptyEventLoop = false;

  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const { nombre, altura, genero, planetaNatal, vehiculos, navesEstelares } =
      JSON.parse(event.body!);

    if (
      !validateCharacter({
        nombre,
        altura,
        genero,
        planetaNatal,
        vehiculos,
        navesEstelares,
      })
    )
      throw new Error("Datos incompletos o incorrectos");

    return await createCharacter(
      {
        nombre,
        altura,
        genero,
        planetaNatal,
        vehiculos,
        navesEstelares,
      },
      dynamodb
    );
  } catch (error) {
    return errorHandler(error);
  }
};
