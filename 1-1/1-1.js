//Random number generator with range 1 to 10(by defult)
function generateRandom(min = 1, max = 10) {
  let difference = max - min;
  let rand = Math.random();
  rand = Math.floor(rand * difference);
  rand = rand + min;
  return rand;
}
//RaceCar constructor
function RaceCar(name, orderInGame = 0) {
  this.name = name;
  this.orderInGame = orderInGame;
  this.position = -1;
}
//Game Rule maker
function MakegameRules() {
  let carCount = +prompt("How many cars do you want?");
  //Validator1
  if (isNaN(carCount) || carCount <= 0) {
    document.getElementById("result").innerHTML +=
      "<p>Invalid input 😐😐😐</p><p>Please enter number :)</p>";
    throw new Error("Invalid input!!!");
  }
  let cars = [];
  //Create random order for cars and assign it to cars
  let orders = [...Array(carCount).keys()].sort((a, b) => 0.5 - Math.random());
  for (let i = 0; i < carCount; i++) {
    let carName = prompt(`Enter car${i + 1} name:`);
    //validator2
    if (carName === "") {
      document.getElementById("result").innerHTML +=
        "<p>Invalid input 😐😐😐</p><p>Please enter Valid name :)</p>";
      throw new Error("Invalid input!!!");
    }
    cars.push(new RaceCar(carName, orders[i] + 1));
  }
  //Sorting cars by their orders
  cars = cars.sort((a, b) => a.orderInGame - b.orderInGame);
  return {
    carCount: carCount,
    cars: cars,
  };
}
//Map simulater
function mapSimulator(cars, carCount) {
  let road = [...Array(300).fill("-"), ...Array(15).fill("x")];
  let ranks = [];
  console.log(cars);
  while (carCount !== 0) {
    //Dice simulate for each car
    let dices = [];
    for (let i = 0; i < carCount; i++) {
      dices.push(generateRandom());
    }
    console.log("Dice:", dices);
    //Moving cars
    let carNumber = 0;
    for (const car of cars) {
      road[car.position] = "-";
      let nextPosition = car.position + dices[carNumber];
      if (nextPosition >= 300) {
        //Removing the car that passed the finish line for more memory performance
        ranks.push(car.name);
        carCount--;
        cars = cars.filter((item) => item.name !== car.name);
        continue;
      }
      //Moving cars based on dice number
      if (road[nextPosition] === "-") {
        car.position = nextPosition;
        road[nextPosition] = car.name;
      } else {
        let unlukyCar = road[nextPosition];
        car.position = nextPosition;
        road[nextPosition] = car.name;
        cars.forEach((car) => {
          if (car.name === unlukyCar) car.position = -1;
        });
      }
      carNumber++;
    }
    //Logging Road after moving
    console.log(road.filter((char) => char != "x").join(""));
  }
  //Mapping Ranks in Friendly look
  ranks = ranks.map(
    (rank, index) =>
      `Rank ${index + 1}: ${rank} ${index === 0 ? "(Winner!!!)" : ""}\n`
  );
  //Displaying new ranks
  for (const rank of ranks) {
    document.getElementById("result").innerHTML += `<p>${rank}</p>`;
  }
}
//Play function
function play() {
  //Clearing result div
  document.getElementById("result").innerHTML = "";
  //Generate random rules
  let rules = MakegameRules();
  //Simulate Game
  mapSimulator(rules.cars, rules.carCount);
}

let btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  play();
});
