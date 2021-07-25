import { EntityRepository, Repository } from 'typeorm';

import Products from '../models/products';

@EntityRepository(Products)
class ProductsRepository extends Repository<Products> {
  public async getProducts(name: string): Promise<Products | null> {
    const findProducts = await this.findOne({
      where: { name },
    });

    return findProducts || null;
  }
}

export default ProductsRepository;
