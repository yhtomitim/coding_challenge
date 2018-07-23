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

const helperFn = require('./helperFunctions');

// commented out evaluatePokerHand invocation to remove console.log statement in tests. Uncomment ln 26-29 to use `node app.js` to view the hand type in terminal. two const hand declarations on ln 26 and 27 for ease of seeing the results change.

// // const hand = ['Qs', 'Js', 'As', '10s', 'Ks', 'As'];
// const hand = ['9s', 'Qs', '8s', '10s', 'Js'];
// const displayHand = evaluatePokerHand(hand);
// console.log(displayHand);

function evaluatePokerHand(hand) {
  const handHasDuplicateCards = helperFn.findDuplicateCards(hand);
  const handHasExtraCards     = helperFn.checkNumberOfCards(hand);

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

  const handIsPair          = helperFn.isAPair(reducedHand);
  const handIsTwoPair       = helperFn.isTwoPair(reducedHand);
  const handIsThreeOfAKind  = helperFn.isThreeOfAKind(reducedHand);
  const handIsStraight      = helperFn.isAStraight(reducedHand)[0];
  const straightHigh        = helperFn.isAStraight(reducedHand)[1];
  const handIsFlush         = helperFn.isAFlush(reducedHand);
  const handIsFullHouse     = helperFn.isFullHouse(handIsPair, handIsThreeOfAKind);
  const handIsFourOfAKind   = helperFn.isFourOfAKind(reducedHand);
  const handIsStraightFlush = helperFn.isStraightFlush(handIsStraight, handIsFlush);
  const handIsRoyalFlush    = helperFn.isRoyalFlush(handIsStraightFlush, straightHigh);

  const checkForStraightFlush =
    handIsStraightFlush === true &&
    handIsRoyalFlush    === false;

  const checkForFourOfAKind =
    handIsFourOfAKind   === true &&
    handIsStraightFlush === false &&
    handIsRoyalFlush    === false;

  const checkForFullHouse =
    handIsFullHouse     === true &&
    handIsFourOfAKind   === false &&
    handIsStraightFlush === false &&
    handIsRoyalFlush    === false;

  const checkForFlush =
    handIsFlush         === true &&
    handIsFullHouse     === false &&
    handIsFourOfAKind   === false &&
    handIsStraightFlush === false &&
    handIsRoyalFlush    === false;

  const checkForStraight =
    handIsStraight      === true &&
    handIsFlush         === false &&
    handIsFullHouse     === false &&
    handIsFourOfAKind   === false &&
    handIsStraightFlush === false &&
    handIsRoyalFlush    === false;

  const checkForThreeOfAKind =
    handIsThreeOfAKind  === true &&
    handIsStraight      === false &&
    handIsFlush         === false &&
    handIsFullHouse     === false &&
    handIsFourOfAKind   === false &&
    handIsStraightFlush === false &&
    handIsRoyalFlush    === false;

  const checkForTwoPair =
    handIsTwoPair       === true &&
    handIsThreeOfAKind  === false &&
    handIsStraight      === false &&
    handIsFlush         === false &&
    handIsFullHouse     === false &&
    handIsFourOfAKind   === false &&
    handIsStraightFlush === false &&
    handIsRoyalFlush    === false;

  const checkForPair =
    handIsPair          === true &&
    handIsTwoPair       === false &&
    handIsThreeOfAKind  === false &&
    handIsStraight      === false &&
    handIsFlush         === false &&
    handIsFullHouse     === false &&
    handIsFourOfAKind   === false &&
    handIsStraightFlush === false &&
    handIsRoyalFlush    === false;

  const highCardHand =
    handIsPair          === false &&
    handIsTwoPair       === false &&
    handIsThreeOfAKind  === false &&
    handIsStraight      === false &&
    handIsFlush         === false &&
    handIsFullHouse     === false &&
    handIsFourOfAKind   === false &&
    handIsStraightFlush === false &&
    handIsRoyalFlush    === false;
  
  let message = '';
  
  if (handHasExtraCards && handHasDuplicateCards) {
    return message = 'Your deck has too many cards and as at least one duplicate card';
  }
  if (handHasExtraCards) {
    return message = 'Too many cards, can only have 5';
  }
  if (handHasDuplicateCards) {
   return message = 'Please remove duplicate card or cards from array';
  } else if (handIsRoyalFlush) {
     return message = 'You have a Royal Flush';
  } else if (checkForStraightFlush) {
    return message = 'You have a Straight Flush';
  } else if (checkForFourOfAKind && !handHasDuplicateCards) {
    return message = 'You have Four of a Kind';
  } else if (checkForFullHouse && !handHasDuplicateCards) {
    return message = 'You have a Full House';
  } else if (checkForFlush) {
    return message = 'You have a Flush';
  } else if (checkForStraight) {
    return message = 'You have a Straight';
  } else if (checkForThreeOfAKind && !handHasDuplicateCards) {
    return message = 'You have Three of a Kind';
  } else if (checkForTwoPair && !handHasDuplicateCards) {
    return message = 'You have Two Pair';
  } else if (checkForPair && !handHasDuplicateCards) {
    return message = 'You have a Pair';
  } else if (highCardHand) {
    return message = 'You have a High Card hand';
  }
}