import { Test, TestingModule } from '@nestjs/testing';
import { AdminconfigController } from './adminconfig.controller';
import { AdminconfigService } from './adminconfig.service';

describe('AdminconfigController', () => {
  let controller: AdminconfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminconfigController],
      providers: [AdminconfigService],
    }).compile();

    controller = module.get<AdminconfigController>(AdminconfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
