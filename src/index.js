const express = require('express');
const app = express();
const healthRouter = require('./routes/health');
const usersRouter = require('./routes/users');
const versionRouter = require('./routes/version');

app.use(express.json());
app.use('/health', healthRouter);
app.use('/users', usersRouter);
app.use('/version', versionRouter);

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
