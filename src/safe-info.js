class SafeInfo {
  constructor(origin, rates) {
    this.origin = origin;
    this.rates = rates;
  }

  toString() {
    if (!this.rates || !this.rates.INR || !this.rates.THB || !this.rates.RUB || !this.rates.USD) {
      var errFollowUp = 'Сообщите @ro31337 если не пройдет через час.';
      if (!this.rates) {
        return `Ошибка rates undefined. ${errFollowUp}`;
      }
      return `Ошибка INR: ${this.rates.INR}, THB: ${this.rates.THB}, RUB: ${this.rates.RUB}, USD: ${this.rates.USD}. ${errFollowUp}`;
    }
    return this.origin.toString();
  }
}

export default SafeInfo;
