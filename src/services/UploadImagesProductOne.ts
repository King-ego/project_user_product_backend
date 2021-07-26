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

class UploadImagesProductOne {
  public async execute({
    product_id,
    filename,
  }: RequestePropsImagem): Promise<Products> {
    const productRepository = getRepository(Products);

    const product = await productRepository.findOne(product_id);

    if (!product) {
      throw new AppError('Only authenticated users can change imagem', 401);
    }

    if (product.imagem_one) {
      const productImagenOneFilePath = path.join(
        uploadConfig.directory,
        product.imagem_one
      );

      const productImagenOneFileExists = await fs.promises.stat(
        productImagenOneFilePath
      );

      if (productImagenOneFileExists) {
        await fs.promises.unlink(productImagenOneFilePath);
      }
    }

    product.imagem_one = `/tmp/${filename}`;

    await productRepository.save(product);

    return product;
  }
}

export default UploadImagesProductOne;
