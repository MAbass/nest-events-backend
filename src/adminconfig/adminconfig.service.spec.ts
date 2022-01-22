import { Test, TestingModule } from '@nestjs/testing';
import { AdminconfigService } from './adminconfig.service';

describe('AdminconfigService', () => {
  let service: AdminconfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminconfigService],
    }).compile();

    service = module.get<AdminconfigService>(AdminconfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
