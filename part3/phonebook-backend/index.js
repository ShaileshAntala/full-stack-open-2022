const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

// Server listening to requests on port 3001
app.listen(config.PORT, () => logger.info(`Server running on port ${config.PORT}`))
