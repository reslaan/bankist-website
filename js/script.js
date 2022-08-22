'use strict';



const account1 = {
    name: 'Ahmed Hasan',
    movements: [400, -422, 525, 38,22,0,-3,8],
    interestRate: 1.2,
    pin: 1111,
}
const account2 = {
    name: 'Reslaan Alobeidi',
    movements: [400, -422, 3925, 38,22],
    interestRate: 1.3,
    pin: 2222,
}
const account3 = {
    name: 'Omar khalid',
    movements: [400, -282, 325, 318,22],
    interestRate: 1.3,
    pin: 3333,
}
const account4 = {
    name: 'Yaser Ali',
    movements: [4030, -422, 325, 38,232],
    interestRate: 1.5,
    pin: 4444,
}

const accounts = [account1, account2, account3, account4];


////////////////

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');
const labelWelcome = document.querySelector('.welcome-text');

const loginForm = document.querySelector('.login-form');
const btnLogin = document.querySelector('.login-btn');
const btnTransfer = document.querySelector('.transfer-btn');
const btnLoan = document.querySelector('.loan-btn');
const btnClose = document.querySelector('.close-btn');
const btnSort = document.querySelector('.sort-btn');

const inputLoginUser = document.querySelector('.login-user');
const inputLoginPin = document.querySelector('.login-pin');

const inputTransferTo = document.querySelector('.transfer-to');
const inputTransferAmount = document.querySelector('.transfer-amount');
const inputLoan = document.querySelector('.loan-amount');
const inputcloseUser = document.querySelector('.close-user');
const inputclosePin = document.querySelector('.close-pin');;

const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance');
const labelSumIn = document.querySelector('.sum-in');
const labelSumOut = document.querySelector('.sum-out');
const labelSumInterest = document.querySelector('.sum-interest');
const labelTimer = document.querySelector('.timer');



alert('username, pin \nah,   1111\nra,   2222\nok,   3333\nya,   4444')

const displayMovements = function(account , sort = false){

    containerMovements.innerHTML = '';

    const today = new Date();

     const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

     labelDate.textContent = date;

     const movs = sort ? account.movements.slice().sort((a,b) => a - b) : account.movements;

    movs.forEach(function(val,index){
        const type = val > 0 ? 'deposit' : 'withdrawal';

        const html = `
        <div class="movment-item row   justify-content-between px-3 pt-2">
        <div class="col">
          <span
            class="${type} rounded-pill px-2 me-2 text-light"
            ><small class=""> ${index +1} ${type}</small>
          </span>
          <small>${date}</small>
        </div>
        <div class="col-3 text-end">
          <span class="h4 ">${val}$</span>
        </div>
      </div>
    <hr>
        `;
        containerMovements.insertAdjacentHTML('afterbegin',html);
});
}

// movements(account1.movements)




const createUserName = function(accs){
    accs.forEach(function(acc){
         acc.username = acc.name
         .toLowerCase()
         .split(' ')
         .map(name => name[0])
         .join('');
    });
}

createUserName(accounts)

 accounts.forEach(account =>console.log( `username ${account.username} , pin ${account.pin}`));

console.log(accounts)

////////

const calcBalance = account => {
    // initial acc is 0 ;
    const balance = account.movements.reduce((acc, move) => acc + move , 0);
    account.balance = balance;
    labelBalance.textContent = `${Math.floor(balance)}$`;
}


//// calc deposit in 
const calcSumIn = movements => {
  const sumIn =   movements.filter(move => move > 0).reduce((acc,move) => acc + move , 0);
  console.log(sumIn);
   labelSumIn.textContent = `${sumIn}$`;
}

//// calc withdrawal 
const calcSumOut = movements => {
  const sumOut =   movements.filter(move => move < 0).reduce((acc,move) => acc + move , 0);
  console.log(sumOut);
   labelSumOut.textContent = `${Math.abs(sumOut)}$`;
}

//// calc withdrawal 
const calcSumInterest = movements => {
  const sumInterest =   movements
  .filter(move => move > 0)
  .map(deposit => (deposit * 1.2) / 100)
  .filter( (int, i , arr) => int >= 1)
  .reduce((acc,move) => acc + move , 0);

   labelSumInterest.textContent = `${Math.round(sumInterest)}$`;
}

const updateUi = account => {
    displayMovements(account)
    calcBalance(account);
    calcSumIn(account.movements);
    calcSumOut(account.movements);
    calcSumInterest(account.movements);
}


//// login 

let currentAccount ;

btnLogin.addEventListener('click', (e) => {
    e.preventDefault();

    currentAccount = accounts.find(acc => acc.username === inputLoginUser.value)

    if (currentAccount?.pin === Number(inputLoginPin.value) ) { 

        containerApp.style.opacity = 1;

        updateUi(currentAccount);
       
    

        labelWelcome.textContent = `Welcome back, ${currentAccount.name.split(' ')[0]}`;

        inputLoginUser.value = inputLoginPin.value = '';
        inputLoginPin.blur();
    }
    console.log(currentAccount);
    console.log('login clicked');
})

btnTransfer.addEventListener('click', function(e) { 
    e.preventDefault();

    const amount = Number(inputTransferAmount.value);
    const reciverAccount = accounts.find(account => 
        account.username === inputTransferTo.value);
         inputTransferAmount.value = inputTransferTo.value = '';
        if (amount > 0
             && reciverAccount 
             && amount <= currentAccount.balance
             && reciverAccount?.username !== currentAccount.username) {

                currentAccount.movements.push(-amount)
                reciverAccount.movements.push(amount);
                updateUi(currentAccount);
}
})


btnLoan.addEventListener('click', function(e) { 
    e.preventDefault();

    const amount = Number(inputLoan.value);

    inputLoan.value = '';
    if (amount > 0) {
    currentAccount.movements.push(amount);

    updateUi(currentAccount);}
});


btnClose.addEventListener('click', function(e) {
    e.preventDefault();

    console.log(inputcloseUser.value);
    console.log(inputclosePin.value);
    if(inputcloseUser.value === currentAccount.username && Number(inputclosePin.value) === currentAccount.pin) {
      const index = accounts.findIndex(account => account.username === currentAccount.username);

      // delete the account
      accounts.splice(index,1)
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Login to start..'
console.log(accounts)      
    }

    inputcloseUser.value = inputclosePin.value = '';

});

let sorted = false;
btnSort.addEventListener('click', function(e) { 
    e.preventDefault();
    displayMovements(currentAccount, !sorted);
    sorted = !sorted;
    
});





























// maximum value
 const max = movements => {
    const max = movements.reduce((acc, move) => acc =  acc > move  ? acc : move, movements[0]);
console.log(max);
}
max(account1.movements)
