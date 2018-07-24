function isAPair(obj) {
  let doesExist = false;
  let counter = 0;
  Object.keys(obj).forEach((cardRank) => {
    Object.values(obj[cardRank]).forEach((value) => {
      if (value === 2) {
        counter += 1;
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
  Object.keys(obj).forEach((cardRank) => {
    Object.values(obj[cardRank]).forEach((value) => {
      if (value === 2) {
        counter += 1;
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
  Object.keys(obj).forEach((cardRank) => {
    Object.values(obj[cardRank]).forEach((value) => {
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

  Object.keys(obj).forEach((cardRank) => {
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
  Object.keys(obj).forEach((cardRank) => {
    Object.values(obj[cardRank]).forEach((value) => {
      if (value === 's' || value === 'd' || value === 'c' || value === 'h') {
        handSuit += value;
      }
    });
    if (handSuit === 'sssss' || handSuit === 'ddddd' || handSuit === 'ccccc' || handSuit === 'hhhhh') { doesExist = true; }
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
  Object.keys(obj).forEach((cardRank) => {
    Object.values(obj[cardRank]).forEach((value) => {
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

function findDuplicateCards(hand) {
  let doesExist = false;
  const anyDuplicates = hand.filter((card, index, self) => index !== self.indexOf(card));
  if (anyDuplicates.length !== 0) {
    doesExist = true;
  }
  return doesExist;
}

function checkNumberOfCards(hand) {
  let tooManyCards = false;
  if (hand.length !== 5) {
    tooManyCards = true;
  }
  return tooManyCards;
}

module.exports = {
  isAPair,
  isTwoPair,
  isThreeOfAKind,
  isAStraight,
  isAFlush,
  isFullHouse,
  isFourOfAKind,
  isStraightFlush,
  isRoyalFlush,
  findDuplicateCards,
  checkNumberOfCards,
};
