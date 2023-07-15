import { Test } from '@nestjs/testing';
import { SignupService } from './signup.service';

describe('SignupService', () => {
  let service;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [SignupService],
    }).compile();

    service = module.get(SignupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
