module.exports = {
  server: {
    port: process.env.PORT || 4000,
  },
  corsSettings: {
    origin: process.env.CORS_DOMAIN || "mes-aides.1jeune1solution.beta.gouv.fr",
  },
}
