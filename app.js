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
const helperFn = require('./helperFunctions');

function evaluatePokerHand(hand) {
  const handHasDuplicateCards = helperFn.findDuplicateCards(hand);
  const handHasExtraCards = helperFn.checkNumberOfCards(hand);

  const reducedHand = hand.reduce((acc, currentCard) => {
    const cardRankOnly = currentCard.slice(0, currentCard.length - 1);
    const cardSuit = currentCard.slice(-1);
    if (!acc[cardRankOnly]) {
      acc[cardRankOnly] = {
        count: 1,
        suit: cardSuit,
      };
    } else {
      acc[cardRankOnly].count += 1;
      acc[cardRankOnly].suit += cardSuit;
    }
    return acc;
  }, {});

  const handIsPair = helperFn.isAPair(reducedHand);
  const handIsTwoPair = helperFn.isTwoPair(reducedHand);
  const handIsThreeOfAKind = helperFn.isThreeOfAKind(reducedHand);
  const handIsStraight = helperFn.isAStraight(reducedHand)[0];
  const straightHigh = helperFn.isAStraight(reducedHand)[1];
  const handIsFlush = helperFn.isAFlush(reducedHand);
  const handIsFullHouse = helperFn.isFullHouse(handIsPair, handIsThreeOfAKind);
  const handIsFourOfAKind = helperFn.isFourOfAKind(reducedHand);
  const handIsStraightFlush = helperFn.isStraightFlush(handIsStraight, handIsFlush);
  const handIsRoyalFlush = helperFn.isRoyalFlush(handIsStraightFlush, straightHigh);

  const checkForStraightFlush = handIsStraightFlush === true
    && handIsRoyalFlush === false;

  const checkForFourOfAKind = handIsFourOfAKind === true
    && handIsStraightFlush === false
    && handIsRoyalFlush === false;

  const checkForFullHouse = handIsFullHouse === true
    && handIsFourOfAKind === false
    && handIsStraightFlush === false
    && handIsRoyalFlush === false;

  const checkForFlush = handIsFlush === true
    && handIsFullHouse === false
    && handIsFourOfAKind === false
    && handIsStraightFlush === false
    && handIsRoyalFlush === false;

  const checkForStraight = handIsStraight === true
    && handIsFlush === false
    && handIsFullHouse === false
    && handIsFourOfAKind === false
    && handIsStraightFlush === false
    && handIsRoyalFlush === false;

  const checkForThreeOfAKind = handIsThreeOfAKind === true
    && handIsStraight === false
    && handIsFlush === false
    && handIsFullHouse === false
    && handIsFourOfAKind === false
    && handIsStraightFlush === false
    && handIsRoyalFlush === false;

  const checkForTwoPair = handIsTwoPair === true
    && handIsThreeOfAKind === false
    && handIsStraight === false
    && handIsFlush === false
    && handIsFullHouse === false
    && handIsFourOfAKind === false
    && handIsStraightFlush === false
    && handIsRoyalFlush === false;

  const checkForPair = handIsPair === true
    && handIsTwoPair === false
    && handIsThreeOfAKind === false
    && handIsStraight === false
    && handIsFlush === false
    && handIsFullHouse === false
    && handIsFourOfAKind === false
    && handIsStraightFlush === false
    && handIsRoyalFlush === false;

  const highCardHand = handIsPair === false
    && handIsTwoPair === false
    && handIsThreeOfAKind === false
    && handIsStraight === false
    && handIsFlush === false
    && handIsFullHouse === false
    && handIsFourOfAKind === false
    && handIsStraightFlush === false
    && handIsRoyalFlush === false;

  let message = '';

  if (handHasExtraCards && handHasDuplicateCards) {
    message = 'Your deck has too many cards and has at least one duplicate card';
    return message;
  }
  if (handHasExtraCards) {
    message = 'Too many cards, can only have 5';
    return message;
  }
  if (handHasDuplicateCards) {
    message = 'Please remove duplicate card or cards from array';
    return message;
  }
  if (handIsRoyalFlush) {
    message = 'You have a Royal Flush';
    return message;
  }
  if (checkForStraightFlush) {
    message = 'You have a Straight Flush';
    return message;
  }
  if (checkForFourOfAKind && !handHasDuplicateCards) {
    message = 'You have Four of a Kind';
    return message;
  }
  if (checkForFullHouse && !handHasDuplicateCards) {
    message = 'You have a Full House';
    return message;
  }
  if (checkForFlush) {
    message = 'You have a Flush';
    return message;
  }
  if (checkForStraight) {
    message = 'You have a Straight';
    return message;
  }
  if (checkForThreeOfAKind && !handHasDuplicateCards) {
    message = 'You have Three of a Kind';
    return message;
  }
  if (checkForTwoPair && !handHasDuplicateCards) {
    message = 'You have Two Pair';
    return message;
  }
  if (checkForPair && !handHasDuplicateCards) {
    message = 'You have a Pair';
    return message;
  }
  if (highCardHand) {
    message = 'You have a High Card hand';
    return message;
  }
  return message;
}

// commented out evaluatePokerHand invocation to remove
// console.log statement in tests.Uncomment ln 177-180 to
// use`node app.js` to view the hand type in terminal.two
// const hand declarations on ln 177 and ln 178 for ease of
// seeing the results change.

// const hand = ['Qs', 'Js', 'As', '10s', 'Ks', 'As'];
// const hand = ['9s', 'Qs', '8s', '10s', 'Js'];
const hand = ['10s', '10h', '10c', '10d', '2s'];
const displayHand = evaluatePokerHand(hand);
console.log(displayHand);

module.exports = evaluatePokerHand;
