export class State {
  data;
  onUpdate;
  constructor(init) {
    this.data = init;
  }
  setContent() {
    if (this.data <= 0) {
      return (this.data = 0);
    }
    this.data = --this.data;
  }
  getContent() {
    return this.data;
  }
}
