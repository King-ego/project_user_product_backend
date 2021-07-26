import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import Products from '../models/products';
import AppError from '../Error/AppError';
import uploadConfig from '../config/upload';

interface RequestePropsImagem {
  product_id: string | any;
  filename: string;
}

class UploadImagesProductTwo {
  public async execute({
    product_id,
    filename,
  }: RequestePropsImagem): Promise<Products> {
    const productRepository = getRepository(Products);

    const product = await productRepository.findOne(product_id);

    if (!product) {
      throw new AppError('Only authenticated users can change imagem', 401);
    }

    if (product.imagem_two) {
      const productImagenTwoFilePath = path.join(
        uploadConfig.directory,
        product.imagem_two
      );

      const productImagentwoFileExits = await fs.promises.stat(
        productImagenTwoFilePath
      );

      if (productImagentwoFileExits) {
        await fs.promises.unlink(productImagenTwoFilePath);
      }
    }

    product.imagem_two = `/tmp/${filename}`;

    await productRepository.save(product);

    return product;
  }
}

export default UploadImagesProductTwo;
