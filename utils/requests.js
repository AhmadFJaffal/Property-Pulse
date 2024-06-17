const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export const fetchProperties = async () => {
  try {
    if (!apiDomain) {
      return [];
    }
    const res = await fetch(`${apiDomain}/properties`);
    if (!res.ok) {
      throw new Error("failed to fetch properties", res.statusText);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
