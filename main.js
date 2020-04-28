const screen = document.querySelector('.screen>span');
const digits = Array.from(document.querySelectorAll('.digit'));
const operators = Array.from(document.querySelectorAll('.operator'));
const AllClear = document.querySelector('.clear');

let temp = '';

const nums = {
  num1: 0,
  num2: 0,
  operator: null
}

let fontSize = 20;
screen.style.fontSize = "20px";

digits.map(digit => {
  digit.addEventListener('click', saveDigit);
})

operators.map(operator => {
  operator.addEventListener('click', operation);
})

AllClear.addEventListener('click', function () {
  clear();
  screen.innerText = '0.00';

})

function clear() {
  temp = 0;
  nums.num1 = 0;
  nums.num2 = 0;
  nums.operator = null
}

function operation() {

  const operator = this.getAttribute('data-key');

  if (operator === '=') {
    result(nums);
  }

  if (!nums.num2) {
    nums.num2 = nums.num1;
    nums.num1 = 0;
    temp = 0;
  } else if (!nums.num1) {
    nums.operator = operator
  } else {
    result(nums);
  }

  nums.operator = operator;
}

function result({ num1, num2, operator }) {

  let total = 0;

  if (operator === '+') {
    total = num1 + num2;
  } else if (operator === '-') {
    total = num2 - num1;
  } else if (operator === '*') {
    total = num1 * num2;
  } else if (operator === '/') {
    total = num2 / num1;
  }

  nums.num1 = 0;
  nums.num2 = total;
  temp = 0;
  write(total);
}

function saveDigit() {

  const digit = this.getAttribute('data-key');

  if (digit == '.' && temp.includes('.')) return

  temp += digit;

  nums.num1 = parseFloat(temp);

  write(temp);
}

function write(num) {
  screen.innerText = formatNum(num);
}

function formatNum(num) {

  if (screen.clientWidth > window.innerWidth * 0.7) {

    fontSize *= 0.7;
    screen.style.fontSize = `${fontSize}px`;
  }

  return parseFloat(num)
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1 ');
}