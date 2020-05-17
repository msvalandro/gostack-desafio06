import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    const income = transactions.reduce((sum, { value, type }) => {
      if (type === 'income') {
        return sum + Number(value);
      }

      return sum;
    }, 0);
    const outcome = transactions.reduce((sum, { value, type }) => {
      if (type === 'outcome') {
        return sum + Number(value);
      }

      return sum;
    }, 0);

    const balance: Balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }
}

export default TransactionsRepository;
