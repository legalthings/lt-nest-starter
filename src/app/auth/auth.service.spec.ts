import { UserService } from './../user/user.service';
import { UserDocumentType } from './../user/models/user.model';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthModuleConfig } from './auth.module';
import { instance, when, spy, reset, verify, capture, anyString } from 'ts-mockito';
import { betterMock } from '../common/utils/testing/better.mock';

describe('AuthService', () => {
  let module: TestingModule;
  let auth: AuthService;
  let userService: UserService;

  const mockUserInstance = () => {
    const mockUserModel: UserDocumentType = betterMock<UserDocumentType>();
    const user: UserDocumentType = instance(mockUserModel);

    return { mockUserModel, user };
  };

  beforeEach(async () => {
    module = await Test.createTestingModule(AuthModuleConfig).compile();

    auth = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(auth).toBeDefined();
  });

  describe('#createHashIds', () => {
    it('should return the correct hashIds', () => {
      const salt = 'testSalt';
      const hashIds = auth.createHashIds(salt);

      const testString = 'test';
      const buffer = Buffer.from(testString, 'utf8');
      const hex = buffer.toString('hex');

      expect(hashIds.encodeHex(hex)).toBe('RzDlEQl');
    });
  });

  describe('#createConfirmationToken', () => {
    it('should create a correct confirmation token without data', async () => {
      const { mockUserModel, user } = mockUserInstance();
      when(mockUserModel._id).thenReturn('1');
      when(mockUserModel.password).thenReturn('password');

      const token = await auth.createConfirmationToken(user, 'set-password');
      expect(token).toBe('V66XZo0Revu5p3ykKyl4S8ye9qyyApSoalg44janfGQeX7rO8kT9d7El3M11i3r9l5');
      verify(mockUserModel.password).once();
      reset(mockUserModel);
    });

    it('should create a correct confirmation token with data', async () => {
      const { mockUserModel, user } = mockUserInstance();
      when(mockUserModel._id).thenReturn('1');
      when(mockUserModel.password).thenReturn('password');

      const email = 'johndoe@example.com';
      const token = await auth.createConfirmationToken(user, 'verify', email);
      // tslint:disable-next-line:max-line-length
      expect(token).toBe('7DDgp4oG98FaRPzrdzkYT1MDJYMMKbsmZrdggJZXs65MPDrO1yfOrjagpDZZc0QD8Vna8nT6XbqRVA2YuMP3Vq85MacLKXN9ZpGrtVZ0pGXQ6kirdN');
      verify(mockUserModel.password).once();
      reset(mockUserModel);
    });
  });

  describe('#verifyConfirmationToken', () => {
    it('should return nothing with an incorrect token', async () => {
      const token = 'V66XZo0Revu5p3ykKyl4S8ye9qyyApSoalg44janfGQeX7rO8kT9d7El3M11i3r9l6';
      const mockUserModel: UserDocumentType = betterMock<UserDocumentType>();
      when(mockUserModel.password).thenReturn('password');
      const userInstance: UserDocumentType = instance(mockUserModel);

      const mockedUserService = spy(userService);

      when(mockedUserService.getUserByIdOrEmail(anyString())).thenResolve(userInstance);
      const result = await auth.verifyConfirmationToken(token, 'set-password');
      expect(result.json).toBeUndefined();
      expect(result.user).toBeUndefined();

      verify(mockedUserService.getUserByIdOrEmail('1')).never();
      verify(mockUserModel.password).never();
    });

    it('should return nothing with an incorrect user id', async () => {
      const token = 'V66XZo0Revu5p3ykKyl4S8ye9qyyApSoalg44janfGQeX7rO8kT9d7El3M11i3r9l5';
      const mockUserModel: UserDocumentType = betterMock<UserDocumentType>();
      when(mockUserModel.password).thenReturn('password');
      const userInstance: UserDocumentType = instance(mockUserModel);

      const mockedUserService = spy(userService);

      when(mockedUserService.getUserByIdOrEmail(anyString())).thenResolve(null);
      const result = await auth.verifyConfirmationToken(token, 'set-password');
      expect(result.json).toBeUndefined();
      expect(result.user).toBeUndefined();

      verify(mockedUserService.getUserByIdOrEmail('1')).once();
      const arg = capture(mockedUserService.getUserByIdOrEmail).last();
      expect(arg[0]).toEqual('1');

      verify(mockUserModel.password).never();
    });

    it('should return user data with a correct token', async () => {
      const token = 'V66XZo0Revu5p3ykKyl4S8ye9qyyApSoalg44janfGQeX7rO8kT9d7El3M11i3r9l5';
      const mockUserModel: UserDocumentType = betterMock<UserDocumentType>();
      when(mockUserModel.password).thenReturn('password');
      const userInstance: UserDocumentType = instance(mockUserModel);

      const mockedUserService = spy(userService);

      when(mockedUserService.getUserByIdOrEmail(anyString())).thenResolve(userInstance);
      const result = await auth.verifyConfirmationToken(token, 'set-password');
      expect(result.json.confirm).toEqual('d58fc8daf00e9bc3');

      verify(mockedUserService.getUserByIdOrEmail('1')).once();
      const arg = capture(mockedUserService.getUserByIdOrEmail).last();
      expect(arg[0]).toEqual('1');

      verify(mockUserModel.password).once();
    });

    it('should return user data and json with a correct token', async () => {
      // tslint:disable-next-line:max-line-length
      const token = '7DDgp4oG98FaRPzrdzkYT1MDJYMMKbsmZrdggJZXs65MPDrO1yfOrjagpDZZc0QD8Vna8nT6XbqRVA2YuMP3Vq85MacLKXN9ZpGrtVZ0pGXQ6kirdN';

      const mockUserModel: UserDocumentType = betterMock<UserDocumentType>();
      when(mockUserModel.password).thenReturn('password');
      const userInstance: UserDocumentType = instance(mockUserModel);

      const mockedUserService = spy(userService);

      when(mockedUserService.getUserByIdOrEmail(anyString())).thenResolve(userInstance);
      const result = await auth.verifyConfirmationToken(token, 'verify');
      expect(result.json.data).toEqual('johndoe@example.com');
      expect(result.json.confirm).toEqual('d58fc8daf00e9bc3');

      verify(mockedUserService.getUserByIdOrEmail('1')).once();
      const arg = capture(mockedUserService.getUserByIdOrEmail).last();
      expect(arg[0]).toEqual('1');

      verify(mockUserModel.password).once();
    });
  });
});
