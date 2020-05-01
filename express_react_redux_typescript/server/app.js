const express = require('express')
const app = express()

// parse application/json, basically parse incoming Request Object as a JSON Object
app.use(express.json())
// false: querystring module;
// parse application/x-www-form-urlencoded, basically can only parse incoming Request Object if strings or arrays
// true: qs module;
// combines the 2 above, then you can parse incoming Request Object if object, with nested objects, or generally any type.
app.use(express.urlencoded({ extended: false }))

const api = require('./routes/index')(express)
app.use('/api', api)

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`server is running on port ${port}`))
