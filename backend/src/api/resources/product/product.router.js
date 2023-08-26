import express from 'express';
import productController from './product.controller';
// import { sanitize } from '../../../middleware/sanitizer';
// import { jwtStrategy } from '../../../middleware/strategy';
import upload from '../../../awsbucket';
import { db } from '../../../models';

import JWT from 'jsonwebtoken';

export const productRouter = express.Router();
productRouter.route("/login").post(async(req, res, next)=> {
    const {email, password }= req.body
    console.log(email)
    // var date = new Date();
    const findUser= await db.customer.findOne({where: {email}})
    if(findUser) {
        const token= JWT.sign({uid: findUser.dataValues.id, id: findUser.dataValues.id}, process.env.JWT_SECRET)
        return res.status(200).json({ success: true, token, findUser });
    }
    else {
        return res.status(200).json({ success: false });
    }
},)

productRouter.route("/photo").get(productController.getPhotoProduct)
productRouter.route('/add').post(upload.single('photo'), productController.addProduct);
productRouter.route('/getAllproduct').get( productController.index);
productRouter.route('/getAllproductList').get( productController.getAllProductList);
productRouter.route('/update').post( upload.single('photo'), productController.update);
productRouter.route('/getProductByCategory').get( productController.getProductListByCategory);
productRouter.route('/getProductById').get( productController.getProductListById);
productRouter.route('/getWebProductById').get( productController.getWebProductListById);
productRouter.route('/product-offer').post( productController.addProductOffer);
productRouter.route('/getAllProductOffer').get( productController.getProductOffer);
productRouter.route('/delete').delete( productController.productDelete);
productRouter.route('/deleteOfferById/:id').get( productController.productOfferDelete);
productRouter.route('/upload-img').post(upload.array('file', 10), productController.multiplePhotoUpload);
productRouter.route('/getAllPhoto').get( productController.getAllPhoto);
productRouter.route('/slider-photo/delete').delete( productController.deleteSliderPhoto);
productRouter.route("/size").get(productController.getSizeProduct)

//Category by product
productRouter.route('/getAllGroceryStaple').get( productController.getAllGrocerryStaples);
productRouter.route('/suggest').get( productController.getProductSuggest);
productRouter.route('/list/:slug').get( productController.getAllProductBySlug);
productRouter.route('/getAllByCategory').post( productController.GetAllByCategory);
productRouter.route('/getallProductbySubChildCat').post( productController.getProductSubChildCat);

// Filter product
productRouter.route('/gcatalogsearch/result').get( productController.getFilterbyProduct);

//new api
productRouter.route('/search_product').post( productController.searchProductBySubCat);


//aws image delete
productRouter.route('/aws/delete/photo').post( productController.awsProductPhotoDelete);










