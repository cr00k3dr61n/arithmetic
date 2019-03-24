/* eslint-disable */
// Reduce terms to float
function reduceTerms () {
  for (let i = 0; i < this.numberTerms; i++) {
    if (this.hasCoefficient && !this.hasFraction && !this.hascoExponent) {
      termVals[this.terms[i].index] = this.terms[i].coefficient;
    }
    if (this.hasCoefficient && this.hascoExponent && !this.hasFraction) {
      termVals[this.terms[i].index] = math.pow(this.terms[i].coefficient, this.terms[i].coExponent);
    }
    if (this.hasFraction && !this.hasCoefficient && !this.hasCoExponent) {
      termVals[this.terms[i].index] = this.terms[i].numerator / this.terms[i].denominator;
    }
    if (this.hasFraction && this.coefficient && this.hascoExponent) {
      termVals[this.terms[i].index] = math.pow(this.terms[i].coefficient, this.terms[i].coExponent) +
      this.terms[i].numerator / this.terms[i].denominator;
    }
  }
}
// Append sign to term float
function signValue () {
  for (let i = 0; i < this.numberTerms; i++) { // Symbols[0] before terms[0]; computed operations, left to right (no parentheses)

    switch (this.terms[i].symbol) {
      case '+':
        computedSum[this.terms[i].index] = termVals[this.terms[i].index];
      break;
      case '-':
        computedSum[this.terms[i].index] = termVals[this.terms[i].index] * -1;
      break;
      case '×':
        computedSum[this.terms[i].index] = computedSum[this.terms[i].index - 1] * termVals[this.terms[i].index]; // Without parentheses, operations ordered from left to right
        computedSum[this.terms[i].index - 1] = 0; // Clear previous entry because combined
      break
      case '÷':
        computedSum[this.terms[i].index] = computedSum[this.terms[i].index - 1] / termVals[this.terms[i].index];
        computedSum[this.terms[i].index - 1] = 0; // Clear previous entry because combined
      break    
    }        
  }
}
