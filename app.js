//We will use Immidiately Invoked Function Expressions to create Modules which will help to keep our data private
//This Module takes care of all that have to do with the UI
let UIController = (function(){
  //Since the function will need to be assesd from outside the UIController(from the AppController) we add the function to the return
  //This object stores the DOM strings 
  let DOMStrings = {
      inputType:'.add__type',
      inputDescription:'.add__description',
      inputValue:'.add__value',
      inputButton:'.add__btn',
      incomeContainer: ".income__list",
      expenseContainer: ".expenses__list"
  }
  return {
      getInput: function(){
          return{
              type: document.querySelector(DOMStrings.inputType).value,
              description:document.querySelector(DOMStrings.inputDescription).value,
              value: document.querySelector(DOMStrings.inputValue).value

          }
      },
      getDOMStrings: function(){
          return DOMStrings
      },
      addListItem: function(obj, type){
        // Create HTML str'ings with placeholders text
        let html, newHtml, element
        if(type==='incomes'){
            element=DOMStrings.incomeContainer
       html=' <div class="item" id="income-%id%"><div class="item__description">%description%</div><div class="right"><div class="item__value">%value%</div><div class="item__delete"> <button class="item__delete--btn"><i class="fas fa-times fa-sm"></i></button></div> </div>  </div>'
        }
        else if(type==='expenses'){
            element =DOMStrings.expenseContainer
        html='<div class="item" id="expense-%id"><div class="item__description">%description%</div><div class="right"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="fas fa-times fa-sm"></i></button></div> </div> </div>'
        }
        // Replace the placeholder text with some actual 
        newHtml=html.replace('%id%',obj.id)
        newHtml = newHtml.replace('%description%',obj.description)
        newHtml = newHtml.replace('%value%',obj.value,)
        //Insert the HTML into the DOM
        document.querySelector(element).insertAdjacentHTML('beforeend',newHtml)
      },
      // Clear the input fields
      clearFields:function(){
        //   DOMStrings.description.value=""
        // DOMStrings.value.value=""
        let fields, fieldsArr
        fields= document.querySelectorAll(DOMStrings.inputDescription+','+DOMStrings.inputValue)
        fieldsArr = Array.prototype.slice.call(fields)
        fieldsArr.forEach((current,index,array) => {
            current.value=""
        });
        
      }
  }
})();

// Budeget Controller
let budgetController = (function(){
    //We create function constructors to create income and expense objects
    let Income = function(id, description,value){
        this.id=id;
        this.description=description;
        this.value=value;

    }
    let Expense = function(id, description,value){
        this.id=id;
        this.description=description;
        this.value=value;

    }
    //This array will store all Income objects created
    let data = {
        allItems: {
            incomes:[],
            expenses:[]
        },
        totals:{
            income:0,
            expenses:0
        }
    }
    return {
        addItem: function(type,des, value){
            let newItem, ID
            // [1,2,3,4,5] the next number will be 6 right?
            // to get the next Id, we simply add 1 to the last ID irrespective of its value

            // Create new ID
            if(data.allItems.length>0){
            ID = data.allItems[type][data.allItems[type].length-1].id+1
            }
            else ID =0
            //Create new Item based on Income or expenses
            if(type==='expenses'){
                newItem =new Expense(ID,des,value)
            }
            else{
                newItem = new Income(ID,des,value)
            }
            //PUsh the new Item into the Array
            data.allItems[type].push(newItem)
            return newItem
        },
        testing: function(){
            console.log(data)
        }
        
    }
   
})();



// This Module helps the UI module and the budget Module to Interract
intEventListener = function(){
    
}
let appController = (function(UICtrl,budgetCtrl){
    let setEventListeners =function(){
        let DOM = UIController.getDOMStrings()
        let selector = document.querySelector(DOM.inputButton)
        selector.addEventListener('click',addItem)

 // Also add the function to a keypress event so that it can also run when you press enter
        document.addEventListener('keypress',function(event){
            //1. Get input values
            if(event.key=='Enter'){
                addItem()
            }
                
                
        })
    }
    

    function addItem(){
        //1. Get input values
        let UI = UIController.getInput()
        //2. Add the item to the budget Calculator
        let newItem = budgetController.addItem(UI.type,UI.description,UI.value);
        
        //3. Add the item to the UI
        UIController.addListItem(newItem,UI.type)
        // Clear the inputs fields
        UIController.clearFields()
        //4. Calculate the budget
        //5. Display the Budget on the UI
        //console.log('Get Input function')
    }

    return{
        init: function(){
            setEventListeners()
            console.log('Application is Starting...')
        }
    }
    

})(UIController,budgetController)
appController.init()

