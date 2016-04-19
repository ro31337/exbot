class Info {
  constructor(rates) {
    // TODO: generate info based on user preferences:
    // language
    // currencies

    this.rates = rates;
  }

  toString() {
    return `1 USD = ${this.format(this.rates.INR)} INR\n` +
      `1 USD = ${this.format(this.rates.RUB)} RUB\n` +
      `1 USD = ${this.format(this.rates.THB)} THB\n` +
      `===\n` +
      `100 RUB = ${this.format((this.rates.INR / this.rates.RUB) * 100)} INR\n` +
      `100 RUB = ${this.format((this.rates.THB / this.rates.RUB) * 100)} THB\n` +
      `100 RUB = ${this.format((this.rates.USD / this.rates.RUB) * 100)} USD\n` +
      "===\n" +
      `100 INR = ${this.format((this.rates.RUB / this.rates.INR) * 100)} RUB = ${this.format((this.rates.USD / this.rates.INR) * 100)} USD\n` +
      `100 THB = ${this.format((this.rates.RUB / this.rates.THB) * 100)} RUB = ${this.format((this.rates.USD / this.rates.THB) * 100)} USD\n` +
      `(предложения по улучшению бота присылайте на roman.pushkin@gmail.com)`;
  }

  format(value) {
    return Math.floor(value * 100) / 100;
  }
}

export default Info;
