const assert = require('chai').assert;
const application = require('../app.js');

describe('Poker Hand Evaluator', () => {
  it('Checks that the argument passed in is array and has a length of 5', () => {
    const hand = ['Ac', 'Ad', 'Ah', 'As', '5d'];
    assert.isArray(hand, true);
    assert.lengthOf(hand, 5);
  });
  it('displays a message if too many cards in array', () => {
    const hand = ['Qs', 'Js', '10s', 'Ks', '2c', '3h'];
    assert.deepEqual(application(hand), 'Too many cards, can only have 5');
  });
  it('displays a message if there are duplicate cards in array', () => {
    const hand = ['Qs', 'Ks', 'As', '10s', 'Ks'];
    assert.deepEqual(application(hand), 'Please remove duplicate card or cards from array');
  });
  it('displays a message if there are duplicate cards and too many cards in array', () => {
    const hand = ['Qs', '7s', 'As', '10s', 'Qs', '5c'];
    assert.deepEqual(application(hand), 'Your deck has too many cards and as at least one duplicate card');
  });
  it('displays high hand message', () => {
    const hand = ['10c', 'Ad', '2h', '4s', '5d'];
    assert.deepEqual(application(hand), 'You have a High Card hand');
  });
  it('displays pair hand message', () => {
    const hand = ['10c', '10d', '2h', '4s', '5d'];
    assert.deepEqual(application(hand), 'You have a Pair');
  });
  it('displays two pair hand message', () => {
    const hand = ['10c', '10d', '4h', '4s', '5d'];
    assert.deepEqual(application(hand), 'You have Two Pair');
  });
  it('displays three of a kind hand message', () => {
    const hand = ['10c', '10d', '10h', '4s', '5d'];
    assert.deepEqual(application(hand), 'You have Three of a Kind');
  });
  it('displays straight hand message', () => {
    const hand = ['7c', '8d', '10h', 'Js', '9d'];
    assert.deepEqual(application(hand), 'You have a Straight');
  });
  it('displays flush hand message', () => {
    const hand = ['10c', 'Ac', '2c', '4c', '5c'];
    assert.deepEqual(application(hand), 'You have a Flush');
  });
  it('displays full house hand message', () => {
    const hand = ['10c', 'Ac', '10h', '10d', 'As'];
    assert.deepEqual(application(hand), 'You have a Full House');
  });
  it('displays four of a kind hand message', () => {
    const hand = ['10c', '10s', '10h', '10d', 'As'];
    assert.deepEqual(application(hand), 'You have Four of a Kind');
  });
  it('displays straight flush hand message', () => {
    const hand = ['5c', '9c', '7c', '6c', '8c'];
    assert.deepEqual(application(hand), 'You have a Straight Flush');
  });
  it('displays royal flush hand message', () => {
    const hand = ['Qs', 'Js', 'As', '10s', 'Ks'];
    assert.deepEqual(application(hand), 'You have a Royal Flush');
  });
});
