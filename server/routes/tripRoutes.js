const router = require('express').Router()
const tripController = require ('../controllers/tripController')

const { validationCheck } = require('../middlewares/tripCheckMiddleware')
const {tokenMiddleware,checkTripOwner} = require ('../middlewares/tokenMiddleware')



router.get('/alltrips',tripController.getAllTrips)
router.get('/tripCount',tripController.getTripsCount),
router.post('/addtrip',tokenMiddleware,validationCheck,tripController.addTrip)
router.get('/mytrips',tokenMiddleware,tripController.getMyTrip)
router.get('/selectedtrip/:id',tokenMiddleware,tripController.getSelectedTrip)
router.put('/updateSeatingCapacity/:id',tokenMiddleware,tripController.updateSeatingCapacity)
router.put('/updatetrip/:id',tokenMiddleware,checkTripOwner,tripController.updateTrip)
router.delete('/deletetrip/:id',tokenMiddleware,checkTripOwner,tripController.deleteTrip)


router.get('/findtrips',tripController.findTrips)


module.exports=router