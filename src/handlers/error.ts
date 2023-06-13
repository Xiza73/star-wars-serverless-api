import headers from "../config/headers";

export const errorHandler = (error: unknown) => {
  console.error(error);
  return {
    statusCode: 500,
    headers,
    body: JSON.stringify({
      error:
        error && (error as any).message
          ? (error as any).message
          : "Error interno del servidor",
    }),
  };
};
