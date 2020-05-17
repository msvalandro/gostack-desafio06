import { getCustomRepository } from 'typeorm';
import { isUuid } from 'uuidv4';

import TransactionsRepository from '../repositories/TransactionsRepository';
import AppError from '../errors/AppError';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    if (!isUuid(id)) {
      throw new AppError('Invalid parameter.');
    }

    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const checkTransactionExists = await transactionsRepository.findOne(id);

    if (!checkTransactionExists) {
      throw new AppError('Transaction not found.');
    }

    await transactionsRepository.delete(id);
  }
}

export default DeleteTransactionService;
