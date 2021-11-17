class Person {
  constructor(name) {
    this.name = name
  }
  printName() {}
}
class Student extends Person {
  constructor(source) {
    this.source = source
    super(source)
  }
  printScore() {}
}
