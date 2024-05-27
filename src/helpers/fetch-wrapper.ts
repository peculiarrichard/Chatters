async function handleResponse(response: any) {
  const data = await response.json();

  if (!response.ok) {
    if ([401, 403].includes(response.status)) {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    const error = new Error(response.statusText);
    console.error(error);
    throw error;
  }

  return {
    status: response.status,
    data: data,
  };
}

export const fetchWrapper = async (
  url: string,
  method: string,
  data?: null | any
) => {
  const headers = {
    "Content-Type": "application/json",
  };

  const options = {
    method: method,
    body: data ? JSON.stringify(data) : null,
    headers: headers,
    next: { revalidate: 3600 },
  };

  try {
    const response = await fetch(url, options);
    const result = await handleResponse(response);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
