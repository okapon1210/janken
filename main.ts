import {
  getRandomInt,
  handName,
  HANDS,
  JUDGE,
  judgement,
  parseHand,
  readLines,
  writeAllSync,
} from "./deps.ts";

console.log("じゃんけんしよう!\n");

const YOUR = new TextEncoder().encode("あなたの");

let matchCount = 0;
let winCount = 0;
let loseCount = 0;

Deno.addSignalListener("SIGINT", () => {
  console.log();
  console.log(`勝負回数: ${matchCount}`);
  console.log(`勝ち: ${winCount}`);
  console.log(`負け: ${loseCount}`);
  console.log(`あいこ: ${matchCount - (winCount + loseCount)}`);
  Deno.exit();
});

console.log(
  `何を出す？\nグー:${HANDS.ROCK}\tパー:${HANDS.PAPER}\tチョキ:${HANDS.SCISSORS}`,
);

for await (const line of readLines(Deno.stdin)) {
  const myHandString = line;

  const computerHand = parseHand(getRandomInt(0, 2));
  if (computerHand === undefined) {
    continue;
  }

  const myHand = parseHand(parseInt(myHandString));
  if (myHand === undefined) {
    console.log("そんな手はないよ!\n");
    console.log(
      `何を出す？\nグー:${HANDS.ROCK}\tパー:${HANDS.PAPER}\tチョキ:${HANDS.SCISSORS}`,
    );
    continue;
  }

  console.log(`相手の手: ${handName(computerHand)}(${computerHand})`);

  const judge = judgement(myHand, computerHand);

  writeAllSync(Deno.stdout, YOUR);

  matchCount++;

  switch (judge) {
    case JUDGE.DROW:
      console.log("引き分け");
      break;
    case JUDGE.WIN:
      winCount++;
      console.log("勝ち");
      break;
    case JUDGE.LOSE:
      loseCount++;
      console.log("負け");
  }

  console.log();
  console.log(
    `何を出す？\nグー:${HANDS.ROCK}\tパー:${HANDS.PAPER}\tチョキ:${HANDS.SCISSORS}`,
  );
}
