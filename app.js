/*
* i3logix Code Challenge
* 
* Please refer to the README.md for challenge questions and complete your challenge below.

Ranking Poker Hands

Write code that will evaluate a poker hand and determine its
rank.

Example:

Hand: Ah As 10 c 7 d 6 s(Pair of Aces)

Hand: Kh Kc 3 s 3 h 2 d(2 Pair)

Hand: Kh Qh 6 h 2 h 9 h(Flush)

*/
evaluatePokerHand(['10c', 'Ad', '2h', '4s', '5d']);

function isAPair(obj) {
  let doesExist = false;
  let counter = 0;
  Object.keys(obj).forEach(cardRank => {
    Object.values(obj[cardRank]).forEach(value => {
      if (value === 2) {
        counter++;
      }
    });
    if (counter === 1) {
      doesExist = true;
    }
  });
  return doesExist;
}

function isTwoPair(obj) {
  let doesExist = false;
  let counter = 0;
  Object.keys(obj).forEach(cardRank => {
    Object.values(obj[cardRank]).forEach(value => {
      if (value === 2) {
        counter++;
      }
    });
    if (counter === 2) {
      doesExist = true;
    }
  });
  return doesExist;
}

function isThreeOfAKind(obj) {
  let doesExist = false;
  Object.keys(obj).forEach(cardRank => {
    Object.values(obj[cardRank]).forEach(value => {
      if (value === 3) {
        doesExist = true;
      }
    });
  });
  return doesExist;
  // console.log(`three of a kind: ${handIsThreeOfAKind}`);
}

function isAStraight(obj) {
  let doesExist = false;
  let rankString = '';
  let straightHighRank = '';

  Object.keys(obj).forEach(cardRank => {
    rankString += cardRank;
  });
  if (rankString.length === 5 || rankString.length === 6) {

    // need to fix regex when dealing with 10
    const sixHigh = /23456/;
    const sevenHigh = /34567/;
    const eightHigh = /45678/;
    const nineHigh = /56789/;
    const tenHigh = /678910/;
    const jackHigh = /78910J/;
    const queenHigh = /8910JQ/;
    const kingHigh = /910JQK/;
    const aceHigh = /10JAQK/;

    if (sixHigh.test(rankString)) {
      doesExist = true;
      straightHighRank = '6';
    }
    if (sevenHigh.test(rankString)) {
      doesExist = true;
      straightHighRank = '7';
    }
    if (eightHigh.test(rankString)) {
      doesExist = true;
      straightHighRank = '8';
    }
    if (nineHigh.test(rankString)) {
      doesExist = true;
      straightHighRank = '9';
    }
    if (tenHigh.test(rankString)) {
      doesExist = true;
      straightHighRank = '10';
    }
    if (jackHigh.test(rankString)) {
      doesExist = true;
      straightHighRank = 'J';
    }
    if (queenHigh.test(rankString)) {
      doesExist = true;
      straightHighRank = 'Q';
    }
    if (kingHigh.test(rankString)) {
      doesExist = true;
      straightHighRank = 'K';
    }
    if (aceHigh.test(rankString)) {
      doesExist = true;
      straightHighRank = 'A';
    }
  }
  return [doesExist, straightHighRank];
}

function isAFlush(obj) {
  let doesExist = false;
  let handSuit = '';
  Object.keys(obj).forEach(cardRank => {
    Object.values(obj[cardRank]).forEach(value => {
      if (value === 's' || value === 'd' || value === 'c' || value === 'h') {
        handSuit += value;
      }
    });
    if (handSuit === 'sssss' || handSuit === 'ddddd' || handSuit === 'ccccc' || handSuit === 'hhhhh')
      doesExist = true;
  });
  return doesExist;
}

function isFullHouse(pair, threeKind) {
  let doesExist = false;
  // console.log(`initial value of doesExist: ${doesExist}`);
  // console.log(`pair in funct: ${pair}`);
  // console.log(`three in funct: ${threeKind}`);
  if (pair === true && threeKind === true) {
    doesExist = true;
  }
  return doesExist;
}

function isFourOfAKind(obj) {
  let doesExist = false;
  Object.keys(obj).forEach(cardRank => {
    Object.values(obj[cardRank]).forEach(value => {
      if (value === 4) {
        doesExist = true;
      }
    });
  });
  return doesExist;
}

function isStraightFlush(straight, flush) {
  let doesExist = false;
  if (straight === true && flush === true) {
    doesExist = true;
  }
  return doesExist;
}

function isRoyalFlush(straightFlush, straightKind) {
  let doesExist = false;
  if (straightFlush === true && straightKind === 'A') {
    doesExist = true;
  }
  return doesExist;
}

function evaluatePokerHand(hand) {
  const reducedHand = hand.reduce((object, currentCard) => {
    if (!object[currentCard.slice(0, currentCard.length - 1)]) {
      object[currentCard.slice(0, currentCard.length - 1)] = {
        count: 1,
        suit: currentCard.slice(-1)
      };
    } else {
      object[currentCard.slice(0, currentCard.length - 1)].count++;
      object[currentCard.slice(0, currentCard.length - 1)].suit += currentCard.slice(-1);
    }
    return object;
  }, {});

  const handIsPair = isAPair(reducedHand);
  const handIsTwoPair = isTwoPair(reducedHand);
  const handIsThreeOfAKind = isThreeOfAKind(reducedHand);
  const handIsStraight = isAStraight(reducedHand)[0];
  const straightHigh = isAStraight(reducedHand)[1];
  const handIsFlush = isAFlush(reducedHand);
  const handIsFullHouse = isFullHouse(handIsPair, handIsThreeOfAKind);
  const handIsFourOfAKind = isFourOfAKind(reducedHand);
  const handIsStraightFlush = isStraightFlush(handIsStraight, handIsFlush);
  const handIsRoyalFlush = isRoyalFlush(handIsStraightFlush, straightHigh);

  const checkForStraightFlush =
    handIsStraightFlush === true &&
    handIsRoyalFlush === false;

  const checkForFourOfAKind =
    handIsFourOfAKind === true &&
    handIsStraightFlush === false &&
    handIsRoyalFlush === false;

  const checkForFullHouse =
    handIsFullHouse === true &&
    handIsFourOfAKind === false &&
    handIsStraightFlush === false &&
    handIsRoyalFlush === false;

  const checkForFlush =
    handIsFlush === true &&
    handIsFullHouse === false &&
    handIsFourOfAKind === false &&
    handIsStraightFlush === false &&
    handIsRoyalFlush === false;

  const checkForStraight =
    handIsStraight === true &&
    handIsFlush === false &&
    handIsFullHouse === false &&
    handIsFourOfAKind === false &&
    handIsStraightFlush === false &&
    handIsRoyalFlush === false;

  const checkForThreeOfAKind =
    handIsThreeOfAKind === true &&
    handIsStraight === false &&
    handIsFlush === false &&
    handIsFullHouse === false &&
    handIsFourOfAKind === false &&
    handIsStraightFlush === false &&
    handIsRoyalFlush === false;

  const checkForTwoPair =
    handIsTwoPair === true &&
    handIsThreeOfAKind === false &&
    handIsStraight === false &&
    handIsFlush === false &&
    handIsFullHouse === false &&
    handIsFourOfAKind === false &&
    handIsStraightFlush === false &&
    handIsRoyalFlush === false;

  const checkForPair =
    handIsPair === true &&
    handIsTwoPair === false &&
    handIsThreeOfAKind === false &&
    handIsStraight === false &&
    handIsFlush === false &&
    handIsFullHouse === false &&
    handIsFourOfAKind === false &&
    handIsStraightFlush === false &&
    handIsRoyalFlush === false;

  const highCardHand =
    handIsPair === false &&
    handIsTwoPair === false &&
    handIsThreeOfAKind === false &&
    handIsStraight === false &&
    handIsFlush === false &&
    handIsFullHouse === false &&
    handIsFourOfAKind === false &&
    handIsStraightFlush === false &&
    handIsRoyalFlush === false;

  if (handIsRoyalFlush === true) {
    console.log('You have a Royal Flush');
  }
  if (checkForStraightFlush === true) {
    console.log('You have a Straight Flush');
  }
  if (checkForFourOfAKind === true) {
    console.log('You have Four Of A Kind');
  }
  if (checkForFullHouse === true) {
    console.log('You have a Full House');
  }
  if (checkForFlush === true) {
    console.log('You have a Flush');
  }
  if (checkForStraight === true) {
    console.log('You have a Straight');
  }
  if (checkForThreeOfAKind === true) {
    console.log('You have Three of a Kind');
  }
  if (checkForTwoPair === true) {
    console.log('You have Two Pair');
  }
  if (checkForPair === true) {
    console.log('You have a Pair');
  }
  if (highCardHand === true) {
    console.log('You have a high card hand');
  }
}