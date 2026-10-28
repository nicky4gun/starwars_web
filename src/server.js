const characterRoutes = require('./routes/characterRoutes');
const express = require('express');
const httpLogger = require('./middleware/httpLogger');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const path = require('node:path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use(httpLogger);

app.use('/characters', characterRoutes);

// Test url for checking errorhandler is reached
app.get('/test', (req, res) => {
    throw new Error();
})

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});