const Product = require('../models/product')
const User = require('../models/user')
const cloudinary = require('../middleware/cloudinary')
const { v4: uuidv4 } = require('uuid')

const opening = (req, res, next) => {
    res.send('Welcome to opening page')
}

const getIndex = (req, res, next) => {
    Product.find()
        .then(products => {
            res.json(
                {
                    products
                }
            )
        })
        .catch(error => {
            res.json({
                message: 'An error Occured!'
            })
        })
}

const getProduct = (req, res, next) => {
    prodId = req.params.productId
    Product.findById(prodId)
        .then(result => {
            res.json({
                result
            })
        })
        .catch(error => {
            console.log(error)
            res.json({
                message: 'Something wrong happened'
            })
        })
}

const show = (req, res, next) => {
    let productId = req.body.productId
    Product.findById(productId)
        .then(product => {
            res.json({
                product
            })
        })
        .catch(error => {
            console.log(error)
            res.json({
                message: 'An error Occured'
            })
        })
}

const addProduct = async (req, res, next) => {

    const uploadedImage = await cloudinary.uploader.upload(req.file.path, { public_id: `testing/${uuidv4()}`, tags: `testing` },
        function (err, image) {
            if (err) return res.send(err);
            console.log('Uploaded Cloudinary successfully');
        })



    let product = new Product({
        title: req.body.title,
        category: req.body.category,
        location: req.body.location,
        images: uploadedImage.secure_url,
        price: req.body.price,
        description: req.body.description,
        deliveryType: req.body.deliveryType,
        contact: req.body.contact,
        author: req.body.author
    })


    console.log(product.images)
    product.save()
        .then(result => {
            res.json({
                message: 'Product added successfully'
            })
        })
        .catch(err => {
            res.json({
                message: 'Product add failed'
            })
        })
}

const update = async (req, res, next) => {
    let productId = req.params.productId

    const uploadedImage = await cloudinary.uploader.upload(req.file.path, { public_id: `testing/${uuidv4()}`, tags: `testing` },
        function (err, image) {
            if (err) return res.send(err);
            console.log('Uploaded Cloudinary successfully');
        })

    let updatedData = {
        title: req.body.title,
        category: req.body.category,
        location: req.body.location,
        images: uploadedImage.secure_url,
        price: req.body.price,
        description: req.body.description,
        deliveryType: req.body.deliveryType,
        contact: req.body.contact,
        author: req.body.author
    }


    Product.findByIdAndUpdate(productId, { $set: updatedData })
        .then(() => {
            res.json({
                message: 'Product updated successfully'
            })
        })
        .catch(error => {
            console.log(error)
            res.json({
                message: 'An error occured!'
            })
        })
}

const destroy = (req, res, next) => {
    let productId = req.params.productId
    Product.findByIdAndRemove(productId)
        .then(() => {
            res.json({
                message: 'Product deleted successfully'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error ocurred'
            })
        })
}


module.exports = {
    opening,
    addProduct,
    destroy,
    update,
    getIndex,
    show,
    getProduct
}