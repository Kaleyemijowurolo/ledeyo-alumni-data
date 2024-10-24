export async function getCountries() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_COUNTRY_API_URL}/startups/data/countries`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}
