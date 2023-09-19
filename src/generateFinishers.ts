const multipliersWithPrefixes = [
  { multiplier: 3, prefix: 'T' },
  { multiplier: 2, prefix: 'D' },
  { multiplier: 1, prefix: '' },
];

function isBullseye(dart: number | string) {
  return dart === '50' || dart === 50;
}

export function generateFinishers(
  remainingScore: number,
): Array<Array<string>> {
  const possibleDarts = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25,
    50,
  ].reverse();
  const doubles = possibleDarts
    .filter((dart) => dart !== 50 && dart !== 25)
    .map((d) => d * 2);

  const finishers: Array<Array<string>> = [];

  function findFinishers(remainingScore: number, dartsUsed: Array<string>) {
    if (
      remainingScore === 0 &&
      (dartsUsed[0].startsWith('D') || isBullseye(dartsUsed[0]))
    ) {
      finishers.push(dartsUsed);
      return;
    }

    if (isBullseye(remainingScore)) {
      finishers.push([...dartsUsed, `${remainingScore}`]);
      return;
    }

    if (doubles.includes(remainingScore)) {
      finishers.push([...dartsUsed, `D${remainingScore / 2}`]);
      return;
    }

    for (const dart of possibleDarts) {
      multipliersWithPrefixes.forEach(({ multiplier, prefix }) => {
        if ([2, 3].includes(multiplier) && (isBullseye(dart) || dart === 25))
          return;

        if (
          doubles.includes(remainingScore - dart * multiplier) ||
          remainingScore - dart * multiplier === 50
        ) {
          findFinishers(remainingScore - dart * multiplier, [
            ...dartsUsed,
            `${prefix}${dart}`,
          ]);
        }
      });
    }
  }

  for (const dart of possibleDarts) {
    multipliersWithPrefixes.forEach(({ multiplier, prefix }) => {
      if ([2, 3].includes(multiplier) && (isBullseye(dart) || dart === 25))
        return;

      findFinishers(remainingScore - dart * multiplier, [`${prefix}${dart}`]);
    });
  }

  return finishers;
}
