import { getCustomRepository } from 'typeorm';
import { validate } from 'uuid';

import AppError from '../Error/AppError';

import ProductsRepository from '../repositories/ProductsRepository';
import Products from '../models/products';

interface RequestProps {
  provider_id: string;
  name: string;
  UPC: number;
  category: string;
  price: number;
  composition: string;
  amount: number;
  size: number;
}

class CreateProductsService {
  public async execute({
    provider_id,
    name,
    UPC,
    category,
    price,
    composition,
    amount,
    size,
  }: RequestProps): Promise<Products> {
    const productsRepository = getCustomRepository(ProductsRepository);

    if (!validate(provider_id)) {
      throw new AppError('Id is invalid');
    }

    const findProductInSameName = await productsRepository.getProducts(name);

    if (findProductInSameName) {
      throw new AppError('This products is already booked', 403);
    }

    const product = productsRepository.create({
      provider_id,
      name,
      UPC,
      category,
      price,
      composition,
      size,
      amount,
    });
    console.log(product);
    await productsRepository.save(product);

    return product;
  }
}
export default CreateProductsService;
