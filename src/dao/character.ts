import AWS from "aws-sdk";
import config from "../config";
import { Personaje } from "../interfaces/starWars";

export const postCharacter = async (
  character: Personaje,
  dbConn: AWS.DynamoDB.DocumentClient
) => {
  await dbConn
    .put({
      TableName: config.CHARACTER_TABLE,
      Item: character,
    })
    .promise();
};

export const getCharacter = async (
  id: string,
  dbConn: AWS.DynamoDB.DocumentClient
) => {
  const res = await dbConn
    .get({
      TableName: config.CHARACTER_TABLE,
      Key: {
        id,
      },
    })
    .promise();

  return res.Item as Personaje;
};

export const getCharacters = async (dbConn: AWS.DynamoDB.DocumentClient) => {
  const res = await dbConn
    .scan({
      TableName: config.CHARACTER_TABLE,
    })
    .promise();

  return res.Items as Personaje[];
};
