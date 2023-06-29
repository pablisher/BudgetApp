//левая часть 
let salaryAmount = document.querySelector('.salary-amount'),//месячный доход
IncomeTitle = document.querySelectorAll('.income-title1'),//наименование доп.дохода
incomeAmount = document.querySelectorAll('.income-amount1'),//сумма доп.дохода

incomeAdd = document.querySelector('.income_add'),

additionalcomeItem = document.querySelectorAll('.additional_income-item'),//возмоджный доход
expensesTitle =document.querySelectorAll('.expenses-title1'),//наименнование обязательной оасхода
expensesAmount = document.querySelectorAll('.expenses-amount1'),//сумма обязательный расход 

expensesAdd = document.querySelector('.expenses_add'),

additionallExpensesItem = document.querySelector('.additional_expenses-item'),//возможные расходы наименование
targetAmount = document.querySelector('.target-amount'),//цель
periodSelect = document.querySelector('.period-select'),//перод асчета
periodAmount = document.querySelector('.period-amount')
// console.log(periodSelect.value);

let btnStart = document.getElementById('start'),
btnCancel = document.getElementById('cancel')

//правая часть
let budgetMonthValue = document.querySelector('.budget_month-value')
let budgetDayValue = document.querySelector('.budget_day-value')
let expensesMonthValue = document.querySelector('.expenses_month-value')
let additionalIncomeValue = document.querySelector('.additional_income-value')
let additionalExpensesValue = document.querySelector('.additional_expenses-value')
let incomePeriodValue = document.querySelector('.income_period-value')
let targetMonthValue = document.querySelector('.target_month-value')

let isNum = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
}

const AppData = function(){
this.budget = 0;// доход от зп
this.income = {};// доп доход
this.additIncome = [];
this.expenses = {};// обяз расходы
this.additExpens = [];
this.target = 0;
this.period = 0;
this.month_budget = 0;//общий доход за месяц
this.budget_day = 0;
this.exspenses_month = 0;
};

AppData.prototype.start = function(){
    btnStart.style.display = 'none'
    btnCancel.style.display = 'block'
    if(isNum(salaryAmount.value)){
        this.budget = +salaryAmount.value
        this.income1()
        this.expenses1()
        this.monthBudget()
        this.additIncome1()
        this.dayBudget()
        this.expensesMonth()
        this.VosmosnieRasxodi()
        this.targetMonth()
        this.showResult()
        }else {
                alert('Введите число')
            }
},

 AppData.prototype.getStart = function(){
    if (!salaryAmount.value) {
        alert('Заполните поле')
        btnStart.style.backgroundColor = "red"
       
    }else{
        btnStart.style.backgroundColor = "green"
        console.log('приложение запущено');
        this.start()
    }
 },
AppData.prototype.addIncome = function(){
let input = document.createElement('div')
input.classList.add('income-items')

input.innerHTML = `<input type="text" class="income-title1" placeholder="Наименование">
<input type="text" class="income-amount1" placeholder="Сумма">`

// incomeAdd.before(input)

let incomeItems = document.querySelectorAll('.income-items').length
if(incomeItems < 3){
    incomeAdd.before(input)
}        
},
AppData.prototype.addExpenses = function(){
    let rasxodi = document.createElement('div')
rasxodi.classList.add('expenses-items')

rasxodi.innerHTML = `<input type="text" class="expenses-title1" placeholder="Наименование">
<input type="text" class="expenses-amount1" placeholder="Сумма">`

// expensesAdd.before(rasxodi)

let expensesItems = document.querySelectorAll('.expenses-items').length

if(expensesItems < 3){
  expensesAdd.before(rasxodi)
}
},
AppData.prototype.income1 = function(){
let incomeItems = document.querySelectorAll('.income-items')
incomeItems.forEach((item)=> {
    let title = item.querySelector('.income-title1').value
    let amount = item.querySelector('.income-amount1').value
    if(title !== '' && amount !== ''){
        this.income[title] = amount
    }
})
},
AppData.prototype.expenses1 = function(){
    let expensesItems = document.querySelectorAll('.expenses-items')
   expensesItems.forEach((item)=> {
        let title1 = item.querySelector('.expenses-title1').value
        let amount1 = item.querySelector('.expenses-amount1').value
        if(title1 !== '' && amount1 !== ''){
            this.expenses[title1] = amount1
        }
    })
},
AppData.prototype.monthBudget = function(){
let Allsum = 0
let sum = 0  
let min = 0
for(let i in this.income){
    sum += + parseInt(this.income[i])
}

for(let i in this.expenses){
    min += + parseInt(this.expenses[i])
}

Allsum = sum + this.budget - min

this.month_budget = Allsum

},
AppData.prototype.additIncome1 = function(){
    additionalcomeItem.forEach( item => this.additIncome.push(item.value))
},
AppData.prototype.dayBudget = function(){
// let day = new Date()
this.budget_day =Math.ceil(this.month_budget/30)
},
AppData.prototype.expensesMonth = function(){
    let min1 = 0
    for(let i in this.expenses){
        min1 += + parseInt(this.expenses[i])
    }
    this.exspenses_month = min1
},
AppData.prototype.VosmosnieRasxodi = function(){
 this.additExpens.push(additionallExpensesItem.value)
},
AppData.prototype.targetMonth = function(){
return  this.month_budget * periodSelect.value - (this.exspenses_month * periodSelect.value)
},
AppData.prototype.targetPeriod = function(){
return Math.ceil(targetAmount.value/this.month_budget) 
},
AppData.prototype.showResult = function(){
budgetMonthValue.value = this.month_budget;
additionalIncomeValue.value = this.additIncome.join(', ');
budgetDayValue.value = this.budget_day;
expensesMonthValue.value = this.exspenses_month;
additionalExpensesValue.value = this.additExpens.join(', ');
incomePeriodValue.value = this.targetMonth();
targetMonthValue.value = this.targetPeriod()
},
AppData.prototype.reset = function(){
let AllInput = document.querySelectorAll('input')
AllInput.forEach(item => item.value = '')  
btnStart.style.display = 'block'
btnCancel.style.display = 'none'
this.budget = '';// доход от зп
this.income = {};// доп доход
this.additIncome = [];
this.expenses = {};// обяз расходы
this.additExpens = [];
this.target = '';
this.period ='';
this.month_budget = '';//общий доход за месяц
this.budget_day = '';
this.exspenses_month = '';
}

let appData = new AppData()

// class AppData1{
//     constructor(){
// this.budget = 0;// доход от зп
// this.income = {};// доп доход
// this.additIncome = [];
// this.expenses = {};// обяз расходы
// this.additExpens = [];
// this.target = 0;
// this.period = 0;
// this.month_budget = 0;//общий доход за месяц
// this.budget_day = 0;
// this.exspenses_month = 0;
// }
// start(){
//     btnStart.style.display = 'none'
//     btnCancel.style.display = 'block'
//     if(isNum(salaryAmount.value)){
//         this.budget = +salaryAmount.value
//         this.income1()
//         this.expenses1()
//         this.monthBudget()
//         this.additIncome1()
//         this.dayBudget()
//         this.expensesMonth()
//         this.VosmosnieRasxodi()
//         this.targetMonth()
//         this.showResult()
//         this.listener()
//         }else {
//                 alert('Введите число')
//             }
// }
// getStart(){
//     if (!salaryAmount.value) {
//         alert('Заполните поле')
//         btnStart.style.backgroundColor = "red"
       
//     }else{
//         btnStart.style.backgroundColor = "green"
//         console.log('приложение запущено');
//         this.start()
//     }
//  }
// addIncome(){
//     let input = document.createElement('div')
//     input.classList.add('income-items')
    
//     input.innerHTML = `<input type="text" class="income-title1" placeholder="Наименование">
//     <input type="text" class="income-amount1" placeholder="Сумма">`
    
//     // incomeAdd.before(input)
    
//     let incomeItems = document.querySelectorAll('.income-items').length
//     if(incomeItems < 3){
//         incomeAdd.before(input)
//     }        
//  }
//  addExpenses(){
// let rasxodi = document.createElement('div')
// rasxodi.classList.add('expenses-items')

// rasxodi.innerHTML = `<input type="text" class="expenses-title1" placeholder="Наименование">
// <input type="text" class="expenses-amount1" placeholder="Сумма">`

// // expensesAdd.before(rasxodi)

// let expensesItems = document.querySelectorAll('.expenses-items').length

// if(expensesItems < 3){
//   expensesAdd.before(rasxodi)
// }
// }
//  income1(){
//      let incomeItems = document.querySelectorAll('.income-items')
//      incomeItems.forEach((item)=> {
//          let title = item.querySelector('.income-title1').value
//          let amount = item.querySelector('.income-amount1').value
//          if(title !== '' && amount !== ''){
//              this.income[title] = amount
// }})}
// expenses1(){
//                 let expensesItems = document.querySelectorAll('.expenses-items')
//                expensesItems.forEach((item)=> {
//                     let title1 = item.querySelector('.expenses-title1').value
//                     let amount1 = item.querySelector('.expenses-amount1').value
//                     if(title1 !== '' && amount1 !== ''){
//                         this.expenses[title1] = amount1
//                     }
//                 })
// }
// dayBudget(){
//     // let day = new Date()
//     this.budget_day =Math.ceil(this.month_budget/30)
// }
// expensesMonth(){
//                 let min1 = 0
//                 for(let i in this.expenses){
//                     min1 += + parseInt(this.expenses[i])
//                 }
//                 this.exspenses_month = min1
// }
// VosmosnieRasxodi(){
//     this.additExpens.push(additionallExpensesItem.value)
// }
// targetMonth(){
//     return  this.month_budget * periodSelect.value - (this.exspenses_month * periodSelect.value)
// }
//  targetPeriod(){
//     return Math.ceil(targetAmount.value/this.month_budget) 
// }
// showResult(){
//     budgetMonthValue.value = this.month_budget;
//     additionalIncomeValue.value = this.additIncome.join(', ');
//     budgetDayValue.value = this.budget_day;
//     expensesMonthValue.value = this.exspenses_month;
//     additionalExpensesValue.value = this.additExpens.join(', ');
//     incomePeriodValue.value = this.targetMonth();
//     targetMonthValue.value = this.targetPeriod()
// }
// reset(){
//     let AllInput = document.querySelectorAll('input')
//     AllInput.forEach(item => item.value = '')  
//     btnStart.style.display = 'block'
//     btnCancel.style.display = 'none'
//     this.budget = '';// доход от зп
//     this.income = {};// доп доход
//     this.additIncome = [];
//     this.expenses = {};// обяз расходы
//     this.additExpens = [];
//     this.target = '';
//     this.period ='';
//     this.month_budget = '';//общий доход за месяц
//     this.budget_day = '';
//     this.exspenses_month = '';
// }
// begin(){
//     btnStart.addEventListener('click', this.getStart)
// }
// close(){
//     addEventListener('click', app.reset) 
// }
// listener(){
//     btnStart.addEventListener('click',this.getStart.bind(this))
//     btnCancel.addEventListener('click', this.reset.bind(this))
//     incomeAdd.addEventListener('click',  this.addIncome)
//     expensesAdd.addEventListener('click', this.addExpenses) 
// }
// }

periodSelect.oninput = function(){
    periodAmount.innerHTML = periodSelect.value
}

// let app = new AppData1()

btnStart.addEventListener('click', AppData.prototype.getStart.bind(appData))
btnCancel.addEventListener('click', AppData.prototype.reset.bind(appData))
incomeAdd.addEventListener('click', AppData.prototype.addIncome)
expensesAdd.addEventListener('click', AppData.prototype.addExpenses)


// app.money(233232)

// class User{
// constructor(name, lastname, age){
//      this.name = name
//      this.age= age 
// this.lastname = lastname
//     }
//  render(){
//         return `${this.lastname}  ${this.name} `
//     }
// static step(){}

// }

// class Warior extends User {
// constructor( name, lastname, age,skill, strange){
// super(name, lastname, age)
// this.skill = skill
// this.strange = strange
// }
// }



// let dima = new  User('Dima', 'Bondarenko', 16)
// let kALYS = new User('Kalys', 'Sabirliev', 25)

// console.log(kALYS.render());


// let DimaArcher = new Warior('Dima', 'Bondarenko', 16, 'archer', 70)

// console.log(DimaArcher.render());

// btnStart.addEventListener('click', app.getStart)
// btnCancel.addEventListener('click', app.reset)
// incomeAdd.addEventListener('click', app.addIncome)
// expensesAdd.addEventListener('click', app.addExpenses)
        
// function Auto(price, gas, scill) {
//    this.price = price 
//    this.gas = gas
//    this.scill = scill
// }
// Auto.prototype.colorFun = function(color){
//     return `ваш цвет машины $(color)`
// }
// Auto.prototype.scill = 'run'
// let bmv = new Auto('20',100, 'speed')

// let mers = new Auto('50',80, 'comfort')

// mers.age = 40
// mers.colorFun('red')

// console.log(bmv);
// console.log(mers);