describe("About Objects", function () {

  describe("Properties", function () {
    var megalomaniac;

    beforeEach(function () {
       megalomaniac = {  mastermind: "Joker", henchwoman: "Harley" };
    });

    it("should confirm objects are collections of properties", function () {
      expect(megalomaniac.mastermind).toBe('Joker');
    });

    it("should confirm that properties are case sensitive", function () {
      expect(megalomaniac.henchwoman).toBe('Harley');
      expect(megalomaniac.henchWoman).toBe(undefined);
    });
  });


  it("should know properties that are functions act like methods", function () {
    var megalomaniac = {
      mastermind : "Brain",
      henchman: "Pinky",
      battleCry: function (noOfBrains) {
        return "They are " + this.henchman + " and the" +
          Array(noOfBrains + 1).join(" " + this.mastermind);                        // 5개의 빈 Array가 생기고, " Brain"이 합쳐진다. 왜?
      }
    };

    var battleCry = megalomaniac.battleCry(4);
    expect('They are Pinky and the Brain Brain Brain Brain Brain').toMatch(battleCry);                      // 올 ㅋ 이거 트릭키 했다.
  });

  it("should confirm that when a function is attached to an object, 'this' refers to the object", function () {
    var currentDate = new Date();
    var currentYear = (currentDate.getFullYear());
    var megalomaniac = {
      mastermind: "James Wood",
      henchman: "Adam West",
      birthYear: 1970,
      calculateAge: function () {
        return currentYear - this.birthYear;
      }
    };

    expect(currentYear).toBe(2015);
    expect(megalomaniac.calculateAge()).toBe(45);
  });

  describe("'in' keyword", function () {
    var megalomaniac;
    beforeEach(function () {
      megalomaniac = {
        mastermind: "The Monarch",
        henchwoman: "Dr Girlfriend",
        theBomb: true
      };
    });

    it("should have the bomb", function () {

      var hasBomb = "theBomb" in megalomaniac;                       // 이런 접근 방법이 있었나? - 기억하자.

      expect(hasBomb).toBe(true);
    });

    it("should not have the detonator however", function () {

      var hasDetonator = "theDetonator" in megalomaniac;

      expect(hasDetonator).toBe(false);
    });
  });

  it("should know that properties can be added and deleted", function () {
    var megalomaniac = { mastermind : "Agent Smith", henchman: "Agent Smith" };

    expect("secretary" in megalomaniac).toBe(false);

    megalomaniac.secretary = "Agent Smith";
    expect("secretary" in megalomaniac).toBe(true);                  // Property in object 를 하면 true/false 가 나온다...값이 안나온다.

    delete megalomaniac.henchman;                                    // delete obj.property 기억하자.
    expect("henchman" in megalomaniac).toBe(false);
  });


  it("should use prototype to add to all objects", function () {
      function Circle(radius)                                        // function 이름이 대문자로 시작하니까 Class 다.
      {
        this.radius = radius;
      }

      var simpleCircle = new Circle(10);                             // new 와 클래스를 이용해서 Object를 만든다.
      var colouredCircle = new Circle(5);
      colouredCircle.colour = "red";

      expect(simpleCircle.colour).toBe(undefined);
      expect(colouredCircle.colour).toBe('red');

      Circle.prototype.describe = function () {
        return "This circle has a radius of: " + this.radius;
      };

      expect(simpleCircle.describe()).toBe('This circle has a radius of: 10');  // IIFE 의 활용법. - Object의 Property인 Function을 실행시켜버린다.
      expect(colouredCircle.describe()).toBe('This circle has a radius of: 5');
  });
});
