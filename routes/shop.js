const express = require('express')
const router = express.Router()
const shopController = require('../controllers/shop')
const auth = require('../middleware/authenticate')
const upload = require('../middleware/upload')


router.get('/', shopController.opening)

router.get('/products' ,shopController.getIndex)

router.get('/products/:productId',  shopController.getProduct)

router.get('/product', shopController.show)

router.post('/add-product',auth, upload.single('images'), shopController.addProduct)

router.put('/update-product/:productId', auth, upload.single('images'), shopController.update)

router.delete('/delete-product/:productId',auth, shopController.destroy)




module.exports = router