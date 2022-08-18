type valueof<T> = T[keyof T];

export const HANDS = {
  ROCK: 0,
  PAPER: 1,
  SCISSORS: 2,
} as const;

export type HandsType = valueof<typeof HANDS>;

export function parseHand(n: number) {
  n = Math.round(n);
  const isHand = Object.values(HANDS).find((hand) => hand === n);

  if (isHand === undefined) {
    return undefined
  }

  return n as HandsType;
}

export function handName(n: HandsType) {
  for (const [key, value] of Object.entries(HANDS)) {
    if (value === n) {
      return key;
    }
  }

  return undefined;
}

export const JUDGE = {
  WIN: 0,
  DROW: 1,
  LOSE: 2,
} as const;

export type JudgeType = valueof<typeof JUDGE>;

export function judgement(myHand: HandsType, otherHand: HandsType) {
  if (myHand === otherHand) {
    return JUDGE.DROW;
  }

  switch (myHand) {
    case HANDS.ROCK:
      if (otherHand === HANDS.SCISSORS) {
        return JUDGE.WIN;
      } else {
        return JUDGE.LOSE;
      }
    case HANDS.PAPER:
      if (otherHand === HANDS.ROCK) {
        return JUDGE.WIN;
      } else {
        return JUDGE.LOSE;
      }
    case HANDS.SCISSORS:
      if (otherHand === HANDS.PAPER) {
        return JUDGE.WIN;
      } else {
        return JUDGE.LOSE;
      }
    default:
      return undefined
  }
}
