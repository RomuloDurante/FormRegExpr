(function(global) {
     //=>MAIN CLOSURE___________________________
                
              
                
     //________________________>>EndMainClosure 
//DATA MODULE>>>
  var _dt = (function() {        
                //=>closure___________________________
                
              
                
                //________________________>>EndClosure

                var dataPrototype = {
                    
                }

                var _dt = Object.create(dataPrototype);
      return _dt;
  }());

/*********************************************** */
//UI MODULE>>>
  var _ui = (function() {        
                //=>closure___________________________

                  // shorthands to Dom manipulation 
                  var id$ = function(id){return document.getElementById(id)}
                  var qu$ = function(qu){return document.querySelector(qu)}
                
                
                //________________________>>EndClosure
                
              var uiPrototype = {
                  //get input values
                    getInputValues: function() {
                      return {
                        name: this.Dom.name.name.value,
                        zipCode: this.Dom.zipCode.value,
                        email: this.Dom.email.value,
                        phone: this.Dom.phone.value
                      }
                    },

                    // set the obj to validate input values
                    validadeInputvalues: function(obj){
                      this.validateFunction(obj, 'name'); // validade name
                    },
                    
                    // verify if the values sent through inputs are correct
                    validateFunction: function(obj, prop) {
                      /*Use the regular expression for each value*/
                      if(!this.Dom[prop].reg.test(obj[prop])){
                          //add class                         
                          this.Dom[prop][prop].classList.add('is-invalid');
                      } else {
                        //remove class
                          this.Dom[prop][prop].classList.remove('is-invalid');
                      }
                    }
                }


              var _ui = Object.create(uiPrototype);
                  //_ui object properties
                  _ui.Dom = {// Dom strings
                    name: {
                        name: id$('name'),
                        reg: /^[a-zA-Z]{2,10}$/ // regular expression to validate name
                    },    
                    zipCode: id$('zip'),
                    email:   id$('email'),
                    phone:   id$('phone'),
                    btn:     qu$('.btn')
                  }

              return _ui;

  }());

/************************************************** */
//APP MODULE>>> THE APP MODULE IS THE ONLY OBJECT SEEN IN THE GLOBAL CONTEXT
  global.app = (function(_dt, _ui) {
                  //=>closure___________________________

                      // call the necessary methods to get values from form
                      function getValues(e) {
                        var values = _ui.getInputValues();
                        console.log(values);
                       _ui.validadeInputvalues(values);
                        e.preventDefault();
                       }
                  
                  
                  //________________________>>EndClosure

                  var appSetup = {
                      setupEvents: function() {
                        _ui.Dom.name.name.addEventListener('blur', getValues);
                      }
                  }

                  var app = Object.create(appSetup);
                  app.setupEvents();
    return app;

  }(_dt, _ui));


}(window));