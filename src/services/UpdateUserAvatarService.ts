import { getRepository } from 'typeorm';
import User from '../models/User';

import AppError from '../errors/AppErrors';

import uploadConfig from '../config/upload';
import fs from 'fs';

import path from 'path';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUseAvatarService {
  public async execute({user_id, avatarFilename}: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if(!user){
      throw new AppError('Somente usuários autenticados podem alterar o avatar', 401);
    }

    if(user.avatar){

      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if(userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;

  }
}

export default UpdateUseAvatarService;
