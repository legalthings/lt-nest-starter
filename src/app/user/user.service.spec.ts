import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { userModuleConfig } from './user.module';
import { anything, deepEqual, spy, verify, when } from 'ts-mockito';
import { UserRepositoryService } from './user-repository.service';

describe('UserService', () => {
  let module: TestingModule;
  let service: UserService;
  let repository: UserRepositoryService;

  const spies = () => {
    const userRepository = spy(repository);

    return { userRepository };
  };

  beforeEach(async () => {
    module = await Test.createTestingModule(userModuleConfig).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepositoryService>(UserRepositoryService);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#saveUser', () => {
    it('should store the user model', () => {
      const { userRepository } = spies();

      const user = {
        first_name: 'John',
        last_name: 'Doe',
        password: 'password',
        email: 'johndoe@example.com'
      };
      const userModel = userRepository.new(user);
      when(userRepository.save(deepEqual(userModel))).thenResolve(userModel);
      service.saveUser(userModel);

      verify(userRepository.save(anything())).once();
    });
  });
});
