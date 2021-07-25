import { getRepository, getCustomRepository } from 'typeorm';
import { validate } from 'uuid';

import AppError from '../Error/AppError';

import Products from '../models/products';

class DeleteProductService {
  public async execute(id: string): Promise<void> {
    const productRepository = getRepository(Products);
    
    if (!validate(id)) {
      throw new AppError('Id is invalid');
    }

    const findProductInSameId = await productRepository.findOne({
      where: { id },
    });

    if (!findProductInSameId) {
      throw new AppError('PRODUCT NOT FOUND', 404);
    }
    await productRepository.remove(findProductInSameId);

    return;
  }
}
export default DeleteProductService;
