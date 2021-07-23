import { response, Router } from 'express';
import { getCustomRepository } from 'typeorm';

import ProductsRepository from '../repositories/ProductsRepository';
import CreateProductsService from '../services/CreateProductsService';

const ProductRoutes = Router();

ProductRoutes.get('/products', async (request, response) => {
  try {
    const productsRepository = getCustomRepository(ProductsRepository);

    const products = await productsRepository.find();
    return response.json(products);
  } catch (err) {
    return response.status(401).json({ message: err });
  }
});
ProductRoutes.post('/products', async (request, response) => {
  const {provider_id, name, UPC, category, price, composition, amount, size } =
    request.body;

  const a = request.body;

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
    console.log(product);
    return response.json(product);
  } catch (err) {
    return response.json({ err });
  }
});
ProductRoutes.patch('/products', (request, response) => {
  return response.json({ patch: 'certo' });
});
ProductRoutes.delete('/products', (request, response) => {
  return response.json({ delete: 'certo' });
});

export default ProductRoutes;
