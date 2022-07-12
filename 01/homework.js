let fruit_list = [
  "사과",
  "감",
  "감",
  "배",
  "포도",
  "포도",
  "딸기",
  "포도",
  "감",
  "수박",
  "딸기",
];

const getFruitCount = (fruit) => {
  let count = 0;
  fruit_list.map((el) => {
    if (el === fruit) count += 1;
  });

  return count;
};
// const result = getFruitCount("딸기");

const getFruitList = (fruit) => {
  return fruit_list.filter((el) => el === fruit);
};
const result = getFruitList("포도");
console.log(result);
