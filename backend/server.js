// backend/server.js
import app from "./app.js";
import { specs, swaggerUi } from "./swagger.js";

const PORT = process.env.PORT || 8080;
// const PORT = process.env.PORT || 5050;

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    customSiteTitle: "누나네 책방 API Docs",
    customCss: `
      .swagger-ui .topbar { background-color: #2c3e50; }
      .swagger-ui .topbar .download-url-wrapper { display: none }
      .swagger-ui .topbar .topbar-wrapper span { color: #fff !important; font-weight: bold; }
      .swagger-ui .info hgroup h2.title { color: #2980b9; }
    `,
    customfavIcon:
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/350/open-book_1f4d6.png",
  })
);

app.listen(PORT, () => {
  console.log(
    `서버 열림! https://nnbook-production-863f.up.railway.app:${PORT}`
  );
});
