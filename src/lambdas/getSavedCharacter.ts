import AWS from "aws-sdk";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import headers from "../config/headers";
import { errorHandler } from "../handlers/error";
import * as characterService from "../dao/character";

const getCharacter = async (
  id: string,
  dBConn: AWS.DynamoDB.DocumentClient
) => {
  const character = await characterService.getCharacter(id, dBConn);

  if (!character) throw new Error("No se encontró el personaje");

  return {
    statusCode: 200,
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

    const { id } = event?.pathParameters!;

    if (!id) throw new Error("El id es requerido");

    return await getCharacter(id, dynamodb);
  } catch (error) {
    return errorHandler(error);
  }
};
