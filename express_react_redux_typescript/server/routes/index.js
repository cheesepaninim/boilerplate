module.exports = express => {

  const router = express.Router()

  router.get('/', (req, res) => res.json({ data: 'this is index' }))

  return router
}
