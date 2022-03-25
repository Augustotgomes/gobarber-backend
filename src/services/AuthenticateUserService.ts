import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';

interface Request {
  email: string,
  password: string,
}

interface Response {
  user : User,
  token: string,
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { email }
    });

    if(!user){
      throw new Error('Email ou senha está incorreto');
    }

    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched){
      throw new Error('Email ou senha está incorreto');
    }

    const token = sign({}, '80869575fdddeff3e94c594c5e19a968', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };


  }
}

export default AuthenticateUserService;