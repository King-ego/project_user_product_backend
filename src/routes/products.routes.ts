import { response, Router } from 'express';
import multer from 'multer';
import { getCustomRepository } from 'typeorm';

import ProductsRepository from '../repositories/ProductsRepository';
import CreateProductsService from '../services/CreateProductsService';
import DeleteProductService from '../services/DeleteProductService';
import UpdateProductService from '../services/UpdateProductService';
import UploadImagesProductOne from '../services/UploadImagesProductOne';
import uploadConfig from '../config/upload';
import UploadImagesProductTwo from '../services/UploadImagesProductTwo';
import UploadImagesProductThree from '../services/UploadImagesProductThree';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const ProductRoutes = Router();

const upload = multer(uploadConfig);

ProductRoutes.use(ensureAuthenticated);

ProductRoutes.get('/', async (request, response) => {
  try {
    const productsRepository = getCustomRepository(ProductsRepository);

    const products = await productsRepository.find();
    return response.json(products);
  } catch (err) {
    return response.status(401).json({
      error: {
        severity: err.severity,
        message: err.message,
      },
    });
  }
});

ProductRoutes.post('/', async (request, response) => {
  const { provider_id, name, UPC, category, price, composition, amount, size } =
    request.body;

  try {
    const createProduct = new CreateProductsService();
    const product = await createProduct.execute({
      provider_id,
      name,
      UPC,
      category,
      price,
      composition,
      amount,
      size,
    });
    return response.json(product);
  } catch (err) {
    return response.json({ err });
  }
});

ProductRoutes.patch('/', async (request, response) => {
  const { id, name, UPC, amount, category, composition, price, size } =
    request.body;

  try {
    const productsUpdate = new UpdateProductService();
    const product = await productsUpdate.execute({
      id: id,
      name: name,
      UPC: UPC,
      amount: amount,
      category: category,
      composition: composition,
      price: price,
      size: size,
    });
    return response.json(product);
  } catch (err) {
    return response.status(400).json({ err });
  }
});

ProductRoutes.delete('/', async (request, response) => {
  const { id } = request.body;
  try {
    const productDelete = new DeleteProductService();

    const deleteProduct = await productDelete.execute(id);

    return response.status(200).json({ message: 'Product Delete Sucess!' });
  } catch (err) {
    return response.json({ err });
  }
});

ProductRoutes.patch(
  '/image_one/:id',
  upload.single('imagem'),
  async (request, response) => {
    const id = request.params;
    const filename = request.file?.filename as string;
    const UploadProductImage = new UploadImagesProductOne();

    try {
      const product = await UploadProductImage.execute({
        product_id: id,
        filename: filename,
      });
      return response.json({ product });
    } catch (err) {
      return response.json({ err });
    }
  }
);
ProductRoutes.patch(
  '/image_two/:id',
  upload.single('imagem'),
  async (request, response) => {
    const id = request.params;
    const filename = request.file?.filename as string;
    const UploadProductImage = new UploadImagesProductTwo();

    try {
      const product = await UploadProductImage.execute({
        product_id: id,
        filename: filename,
      });
      return response.json({ product });
    } catch (err) {
      return response.json({ err });
    }
  }
);
ProductRoutes.patch(
  '/image_three/:id',
  upload.single('imagem'),
  async (request, response) => {
    const id = request.params;
    const filename = request.file?.filename as string;
    const UploadProductImage = new UploadImagesProductThree();

    try {
      const product = await UploadProductImage.execute({
        product_id: id,
        filename: filename,
      });
      return response.json({ product });
    } catch (err) {
      return response.json({ err });
    }
  }
);

export default ProductRoutes;
