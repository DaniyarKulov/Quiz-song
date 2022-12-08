export class Model {
  data;

  constructor(init) {
    this.data = init;
  }

  setData() {
    return this.data <= 5 ? this.data++ : (this.data = 0);
  }
  getData() {
    return this.data;
  }
}
