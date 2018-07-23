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
module.exports = evaluatePokerHand;

// const hand = ['Qs', 'Js', 'As', 'Ks', 'Ks'];
// // const hand = ['9s', 'Qs', '8s', '10s', 'Js'];
// evaluatePokerHand(hand);

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
}

function isAStraight(obj) {
  let doesExist = false;
  let rankString = '';
  let straightHighRank = '';

  Object.keys(obj).forEach(cardRank => {
    rankString += cardRank;
  });
  if (rankString.length === 5 || rankString.length === 6) {
    const sixHigh = /23456/;
    const sevenHigh = /34567/;
    const eightHigh = /45678/;
    const nineHigh = /56789/;
    const tenHigh = /678910/;
    const jackHigh = /78910J/;
    const queenHigh = /8910[JQ][QJ]/;
    const kingHigh = /910[JQK][JQK][JQK]/;
    const aceHigh = /10[QJKA][JQKA][JKQA][JQKA]/;

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
  //check for duplicates in array
  let anyDuplicates = hand.filter((card, index, self) => {
    return index == self.indexOf(card);
  });
  if (anyDuplicates.length > 0) {
    return console.log('Please remove duplicate card or cards from array');
  }
  // check for extra cards in array
  if (hand.length !== 5) {
    return console.log('Too many cards, can only have 5');
  }

  const reducedHand = hand.reduce((object, currentCard) => {
    const cardRankOnly = currentCard.slice(0, currentCard.length - 1);
    const cardSuit = currentCard.slice(-1);
    if (!object[cardRankOnly]) {
      object[cardRankOnly] = {
        count: 1,
        suit: cardSuit
      };
    } else {
      object[cardRankOnly].count++;
      object[cardRankOnly].suit += cardSuit;
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
  
  let message = '';

  if (handIsRoyalFlush === true) {
    message = 'You have a Royal Flush';
  }
  if (checkForStraightFlush === true) {
    message = 'You have a Straight Flush';
  }
  if (checkForFourOfAKind === true) {
    message = 'You have Four of a Kind';
  }
  if (checkForFullHouse === true) {
    message = 'You have a Full House';
  }
  if (checkForFlush === true) {
    message = 'You have a Flush';
  }
  if (checkForStraight === true) {
    message = 'You have a Straight';
  }
  if (checkForThreeOfAKind === true) {
    message = 'You have Three of a Kind';
  }
  if (checkForTwoPair === true) {
    message = 'You have Two Pair';
  }
  if (checkForPair === true) {
    message = 'You have a Pair';
  }
  if (highCardHand === true) {
    message = 'You have a High Card hand';
  }
  return message;
}