import request from 'request';

class Currency {
  constructor() {
    this.currentHour = 0;
    this.latestRates = {};
  }

  async fetchRates() {
    return new Promise((resolve, reject) => {
      request({url: process.env.CURRENCY_JSON_URL, json: true}, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          if(body && body.rates) {
            resolve(body.rates);
          } else {
            reject('response ok, but body.rates not found');
          }
        } else {
          reject(error);
        } // if not error
      }); // request
    }); // new Promise
  }

  async rates() {
    var h = this.hourOfMonth();

    if (h !== this.currentHour) {
      this.currentHour = h;
      this.latestRates = await this.fetchRates();
    }

    return this.latestRates;
  }

  hourOfMonth() {
    let d = new Date();
    let h = d.getHours();
    return d.getDate() * 24 + d.getHours();
  }
}

export default Currency;
