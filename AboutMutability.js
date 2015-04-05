describe("About Mutability", function() {

  it("should expect object properties to be public and mutable", function () {      // Mutability 값을 바꿀 수 있는 것.
    var aPerson = {firstname: "John", lastname: "Smith" };
    aPerson.firstname = "Alan";

    expect(aPerson.firstname).toBe('Alan');
  });

  it("should understand that constructed properties are public and mutable", function () {
    function Person(firstname, lastname)                                            // 클래스 constructor의 생성
    {
      this.firstname = firstname;
      this.lastname = lastname;
    }
    var aPerson = new Person ("John", "Smith");                                     // 클래스의 instantiation
    aPerson.firstname = "Alan";

    expect(aPerson.firstname).toBe('Alan');
  });

  it("should expect prototype properties to be public and mutable", function () {
    function Person(firstname, lastname)
    {
      this.firstname = firstname;
      this.lastname = lastname;
    }
    Person.prototype.getFullName = function () {                                     // prototype으로 새 property에 function을 저장
      return this.firstname + " " + this.lastname;
    };

    var aPerson = new Person ("John", "Smith");
    expect(aPerson.getFullName()).toBe('John Smith');

    aPerson.getFullName = function () {                                              // 생성된 object에 딸려온 property의 값을 변경 - 가능? - 가능!
      return this.lastname + ", " + this.firstname;
    };

    expect(aPerson.getFullName()).toBe('Smith, John');
  });

  it("should know that variables inside a constructor and constructor args are private", function () {
    function Person(firstname, lastname)                                              // constructor
    {
      var fullName = firstname + " " + lastname;

      this.getFirstName = function () { return firstname; };
      this.getLastName = function () { return lastname; };
      this.getFullName = function () { return fullName; };
    }
    var aPerson = new Person ("John", "Smith");

    aPerson.firstname = "Penny";
    aPerson.lastname = "Andrews";
    aPerson.fullName = "Penny Andrews";                                               // aPerson object에 property로 저장.

    expect(aPerson.getFirstName()).toBe('John');
    expect(aPerson.getLastName()).toBe('Smith');
    expect(aPerson.getFullName()).toBe('John Smith');

    aPerson.getFullName = function () {
      return aPerson.lastname + ", " + aPerson.firstname;
    };

    expect(aPerson.getFullName()).toBe('Andrews, Penny');                             // 이거 헷갈린다. 맞나? - 맞는것같네..;
  });

});
