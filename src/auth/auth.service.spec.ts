import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UserModule } from '../user';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
          useFactory: (configService: ConfigService) => {
            return {
              secret: configService.get<string>('SYMMETRIC_KEY'),
              signOptions: { expiresIn: '60s' },
            };
          },
          inject: [ConfigService],
        }),
      ],
      providers: [AuthService, LocalStrategy, JwtStrategy],
    }).compile();

    service = moduleRef.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('validateUser', () => {
  let service: AuthService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
          useFactory: (configService: ConfigService) => {
            return {
              secret: configService.get<string>('SYMMETRIC_KEY'),
              signOptions: { expiresIn: '60s' },
            };
          },
          inject: [ConfigService],
        }),
      ],
      providers: [AuthService, LocalStrategy, JwtStrategy],
    }).compile();

    service = moduleRef.get<AuthService>(AuthService);
  });

  it('should return a user object when credentials are valid', async () => {
    const res = await service.validateUser({
      username: 'maria',
      password: 'guess',
    });
    expect(res.username).toEqual('maria');
  });

  it('should return null when credentials are invalid', async () => {
    const res = await service.validateUser({
      username: 'xxx',
      password: 'xxx',
    });
    expect(res).toBeNull();
  });
});

describe('validateLogin', () => {
  let service: AuthService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
          useFactory: (configService: ConfigService) => {
            return {
              secret: configService.get<string>('SYMMETRIC_KEY'),
              signOptions: { expiresIn: '60s' },
            };
          },
          inject: [ConfigService],
        }),
      ],
      providers: [AuthService, LocalStrategy, JwtStrategy],
    }).compile();

    service = moduleRef.get<AuthService>(AuthService);
  });

  it('should return JWT object when credentials are valid', async () => {
    const res = await service.login({ username: 'maria', password: 'guess' });
    expect(res.access_token).toBeDefined();
  });
});
