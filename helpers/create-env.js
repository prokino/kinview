const fs = require('fs');
fs.writeFileSync('./.env', `REACT_APP_NAME=${process.env.REACT_APP_NAME}\n`)
