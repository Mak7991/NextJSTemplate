export const GET = async (request) => {
  try {
    const products = await fetch(`${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}`);

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all Product", { status: 500 });
  }
};
