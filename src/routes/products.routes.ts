import { response, Router } from 'express';
import { getCustomRepository } from 'typeorm';

import ProductsRepository from '../repositories/ProductsRepository';
import CreateProductsService from '../services/CreateProductsService';
import DeleteProductService from '../services/DeleteProductService';
import UpdateProductService from '../services/UpdateProductService';

const ProductRoutes = Router();

ProductRoutes.get('/products', async (request, response) => {
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

ProductRoutes.post('/products', async (request, response) => {
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
    return response.json({
      error: {
        severity: err.severity,
        message: err.message,
      },
    });
  }
});

ProductRoutes.patch('/products', async (request, response) => {
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
    return response.status(400).json({
      error: {
        severity: err.severity,
        message: err.message,
      },
    });
  }
});
ProductRoutes.delete('/products', async (request, response) => {
  const { id } = request.body;
  try {
    const productDelete = new DeleteProductService();

    const deleteProduct = await productDelete.execute(id);

    return response.status(200).json({ message: 'Product Delete Sucess!' });
  } catch (err) {
    return response.json({
      error: {
        severity: err.severity,
        message: err.message,
      },
    });
  }
});

export default ProductRoutes;
