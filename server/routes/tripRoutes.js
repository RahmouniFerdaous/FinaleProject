const router = require('express').Router()
const tripController = require ('../controllers/tripController')
const {tokenMiddleware,checkTripOwner} = require ('../middlewares/tokenMiddleware')



router.get('/alltrips',tripController.getAllTrips)
router.post('/addtrip',tokenMiddleware,tripController.addTrip)
router.get('/mytrips',tokenMiddleware,tripController.getMyTrip)
router.put('/updatetrip/:id',tokenMiddleware,checkTripOwner,tripController.updateTrip)
router.delete('/deletetrip/:id',tokenMiddleware,checkTripOwner,tripController.deleteTrip)


module.exports=router