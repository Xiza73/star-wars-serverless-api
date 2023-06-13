import AWS from "aws-sdk";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import headers from "../config/headers";
import { errorHandler } from "../handlers/error";
import * as characterService from "../dao/character";

const getCharacters = async (dBConn: AWS.DynamoDB.DocumentClient) => {
  const characters = await characterService.getCharacters(dBConn);

  if (!characters || characters.length === 0)
    throw new Error("No se encontró ningún personaje");

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(characters),
  };
};

export const handler = async (
  _: APIGatewayProxyEvent,
  _context: Context
): Promise<APIGatewayProxyResult> => {
  _context.callbackWaitsForEmptyEventLoop = false;

  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    return await getCharacters(dynamodb);
  } catch (error) {
    return errorHandler(error);
  }
};
