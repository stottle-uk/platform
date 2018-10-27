import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'stottle-bowling-game',
  template: `
  <ul class="list-group">
    <li class="list-group-item" *ngFor="let result of scoreCardResults">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">{{scoreCard}}</h5>
        <span>{{calculateScore(scoreCard).score}}</span>
      </div>
      <small class="text-muted">{{calculateScore(scoreCard).rolls}}</small>
    </li>
  </ul>
  `,
  styles: []
})
export class BowlingGameComponent implements OnInit {
  name = 'Bowling Score Card';
  scoreCardResults = [];
  scoreCards = [
    'X|7/|9-|X|-8|8/|-6|X|X|X||81',
    'X|7/|9-|--|--|--|--|--|--|--||',
    '--|--|--|--|--|--|--|--|--|X||81',
    'X|X|X|X|X|X|X|X|X|X||XX',
    '5/|5/|5/|5/|5/|5/|5/|5/|5/|5/||5',
    '9-|9-|9-|9-|9-|9-|9-|9-|9-|9-||'
  ];

  constructor(private bowlingGameRollsService: BowlingGameRollsService) {}

  ngOnInit(): void {
    this.scoreCards.map(card => this.calculateScore(card));
  }

  calculateScore(scoreCard: string): IBowlingGameScore {
    const scoreCardRolls = this.getScoreCardRolls(scoreCard); //this should be a service
    const score = this.bowlingGameRollsService.buildScore(scoreCardRolls);
    return {
      rolls: scoreCardRolls,
      score: score
    };
  }

  getScoreCardRolls(scoreCard: string): number[] {
    return scoreCard
      .split('|')
      .filter((e, i) => i !== 10) //remove empty element created by double pipe
      .map(s => this.mapScoreCardItemToRolls(s))
      .reduce((a, v) => a.concat(...v), []);
  }

  mapScoreCardItemToRolls(s: string): number[] {
    if (s === '') {
      return [0];
    }

    if (s.length === 2) {
      const roll1 = this.getScore(s[0]);
      const roll2 = this.getScore(s[1]);
      return [roll1, this.getScoreIfSpare(roll1, roll2)];
    }

    return [this.getScore(s)];
  }

  private getScoreIfSpare(roll1: number, roll2: number): number {
    return roll2 === -1 ? 10 - roll1 : roll2;
  }

  private getScore(score: string): number {
    if (score === 'X') {
      return 10;
    }
    if (score === '/') {
      return -1;
    }
    if (score === '-') {
      return 0;
    }
    if (this.isNumeric(score)) {
      return +score;
    }
    return 0;
  }

  private isNumeric(n): boolean {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
}
