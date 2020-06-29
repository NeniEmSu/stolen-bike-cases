const fs = require('fs')
fs.writeFileSync(
  './.env',
  `
BASE_URL=${process.env.BASE_URL}\n
MONGO_DB_CONNECTION=${process.env.MONGO_DB_CONNECTION}\n
PORT=${process.env.PORT}
`
) // Use the bellow command to generate env
// ```bash
// node ./create-env.js
// ```
