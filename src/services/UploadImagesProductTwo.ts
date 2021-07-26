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

    // if (product.imagem_one) {
    //   const productImagenOneFilePath = path.join(
    //     uploadConfig.directory,
    //     product.imagem_one
    //   );

    //   const productImagenOneFileExists = await fs.promises.stat(
    //     productImagenOneFilePath
    //   );

    //   if (productImagenOneFileExists) {
    //     await fs.promises.unlink(productImagenOneFilePath);
    //   }
    // }

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

    // if (product.imagem_three) {
    //   const productImagenThreeFilePath = path.join(
    //     uploadConfig.directory,
    //     product.imagem_three
    //   );

    //   const productImagenThreeFileExists = await fs.promises.stat(
    //     productImagenThreeFilePath
    //   );

    //   if (productImagenThreeFileExists) {
    //     await fs.promises.unlink(productImagenThreeFilePath);
    //   }
    // }

    product.imagem_two = `/tmp/${filename}`;
    // product.imagem_three = filename_three;

    await productRepository.save(product);

    return product;
  }
}

export default UploadImagesProductTwo;
