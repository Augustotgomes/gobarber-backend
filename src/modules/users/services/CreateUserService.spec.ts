import AppError from '@shared/errors/AppErrors';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepositories = new FakeUsersRepository();
    const createUser = new CreateUserService(
      fakeUserRepositories
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456'
    });

    expect(user).toHaveProperty('id');

  });

  // it('should not be able to create a new user with same email from', async () => {
  //   const fakeUserRepositories = new FakeUsersRepository();
  //   const createUser = new CreateUserService(
  //     fakeUserRepositories
  //   );

  //   await createUser.execute({
  //     name: 'John Doe',
  //     email: 'johndoe@test.com',
  //     password: '123456'
  //   });

  //   expect(
  //     createUser.execute({
  //       name: 'John Doe',
  //       email: 'johndoe@test.com',
  //       password: '123456',
  //     })).rejects.toBeInstanceOf(AppError);
  // });
});
