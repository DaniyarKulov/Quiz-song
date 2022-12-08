export class StateId {
  id;

  constructor(init) {
    this.id = init;
  }

  setData(data) {
    this.id = data;
  }
  getData() {
    return this.id;
  }
}
