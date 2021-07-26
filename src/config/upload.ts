import multer from 'multer';
import path from 'path';
import cripto from 'crypto';

const tmpFoulder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tmpFoulder,
  storage: multer.diskStorage({
    destination: tmpFoulder,
    filename(request, filer, calback) {
      const filehash = cripto.randomBytes(10).toString('hex');

      const filename = `${filehash}-${filer.originalname}`;

      return calback(null, filename);
    },
  }),
};
