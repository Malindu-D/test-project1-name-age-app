module.exports = async function (context, req) {
  context.log("Config API called");

  const apiEndpoint = process.env.API_ENDPOINT || "";

  context.log("API Endpoint:", apiEndpoint || "NOT SET");

  context.res = {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      apiEndpoint: apiEndpoint,
      configured: !!apiEndpoint
    },
  };
};
