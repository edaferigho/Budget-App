//We will use Immidiately Invoked Function Expressions to create Modules which will help to keep our data private
//This Module takes care of all that have to do with the UI
let UIController = (function(){
  //Since the function will need to be assesd from outside the UIController(from the AppController) we add the function to the return
  //This object stores the DOM strings 
  let DOMStrings = {
      inputType:'.add__type',
      inputDescription:'.add__description',
      inputValue:'.add__value',
      inputButton:'.add__btn'
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
      }
  }
})();

// Budeget Controller
let budgetController = (function(){
   
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
        
        console.log(UI)
        //2. Add the item to the budget Calculator
        //3. Add the item to the UI
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

