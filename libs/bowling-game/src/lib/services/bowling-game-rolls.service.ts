import { Injectable } from '@angular/core';

@Injectable()
export class BowlingGameRollsService {
  buildScore(score: number[]): number {
    let total = 0;
    let count = 0;
    for (let i = 0; i < 10; i++) {
      if (this.isStrike(score[count])) {
        total += this.getBonus(score, count);
        count++;
      } else if (this.isSpare(score[count], score[count + 1])) {
        total += this.getBonus(score, count);
        count += 2;
      } else {
        total += score[count] + score[count + 1];
        count += 2;
      }
    }
    return total;
  }

  private isStrike(value: number): boolean {
    return value === 10;
  }

  private isSpare(value1: number, value2: number): boolean {
    return value1 + value2 === 10;
  }

  private getBonus(score: number[], count: number): number {
    return score[count] + score[count + 1] + score[count + 2];
  }
}
