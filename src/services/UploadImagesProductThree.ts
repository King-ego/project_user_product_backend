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

class UploadImagesProductThree {
  public async execute({
    product_id,
    filename,
  }: RequestePropsImagem): Promise<Products> {
    const productRepository = getRepository(Products);

    const product = await productRepository.findOne(product_id);

    if (!product) {
      throw new AppError('Only authenticated users can change imagem', 401);
    }

    if (product.imagem_three) {
      const productImagenThreeFilePath = path.join(
        uploadConfig.directory,
        product.imagem_three
      );

      const productImagenThreeFileExists = await fs.promises.stat(
        productImagenThreeFilePath
      );

      if (productImagenThreeFileExists) {
        await fs.promises.unlink(productImagenThreeFilePath);
      }
    }

    product.imagem_three = `/tmp/${filename}`;

    await productRepository.save(product);

    return product;
  }
}

export default UploadImagesProductThree;
