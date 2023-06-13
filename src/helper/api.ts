export const get = async <T>(url: string): Promise<T | undefined> => {
  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  } catch (error) {
    console.error(error);
    return;
  }
};
