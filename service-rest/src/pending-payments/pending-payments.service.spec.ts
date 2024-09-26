import { Test, TestingModule } from '@nestjs/testing';
import { PendingPaymentsService } from './pending-payments.service';

describe('PendingPaymentsService', () => {
  let service: PendingPaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PendingPaymentsService],
    }).compile();

    service = module.get<PendingPaymentsService>(PendingPaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
