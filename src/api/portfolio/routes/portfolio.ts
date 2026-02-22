export default {
  type: "content-api",
  routes: [
    {
      method: "GET",
      path: "/portfolio",
      handler: "portfolio.find",
    },
  ],
};