function calculateFibonacci(num) {
  if (num <= 0) {
    return 0;
  } else if (num === 1) {
    return 1;
  } else {
    return calculateFibonacci(num - 1) + calculateFibonacci(num - 2);
  }
}

module.exports = calculateFibonacci;
