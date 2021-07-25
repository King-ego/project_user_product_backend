import { getCustomRepository, getRepository } from 'typeorm';
import { validate } from 'uuid';

import AppError from '../Error/AppError';

import Products from '../models/products';
import ProductsRepository from '../repositories/ProductsRepository';

interface RequestProps {
  id: string;
  name: string;
  UPC: number;
  category: string;
  price: number;
  composition: string;
  amount: number;
  size: number;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    UPC,
    category,
    price,
    composition,
    amount,
    size,
  }: RequestProps): Promise<Products> {
    const productRepository = getRepository(Products);

    const nameProducts = getCustomRepository(ProductsRepository);

    if (!validate(id)) {
      throw new AppError('Id is invalid', 400);
    }

    const findProductInSameName = await productRepository.findOne({
      where: { id },
    });

    const findProductsRepeteInSameName = await productRepository.findOne({
      where: { id, name },
    });

    if (!findProductInSameName) {
      throw new AppError('Not Product Found', 404);
    }

    if (
      (await nameProducts.getProducts(name)) &&
      !findProductsRepeteInSameName
    ) {
      throw new AppError('Product Name Exist1', 409);
    }

    findProductInSameName.name = name;
    findProductInSameName.UPC = UPC;
    findProductInSameName.category = category;
    findProductInSameName.price = price;
    findProductInSameName.composition = composition;
    findProductInSameName.amount = amount;
    findProductInSameName.size = size;

    await productRepository.save(findProductInSameName);

    return findProductInSameName;
  }
}

export default UpdateProductService;
