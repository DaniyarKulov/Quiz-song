export class CounterScore {
  data;

  constructor(data) {
    this.data = data;
  }

  setData() {
    this.data++;
  }
  getData() {
    return this.data;
  }
}
