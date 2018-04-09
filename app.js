(function(global) {

//DATA MODULE>>>
  var _dt = (function() {        

                var dataPrototype = {
                   setData: function(obj) {
                      this.Data = obj;
                   } 
                }

                var _dt = Object.create(dataPrototype);
                    _dt.Data = null
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
                        zipCode: this.Dom.zipCode.zipCode.value,
                        email: this.Dom.email.email.value,
                        phone: this.Dom.phone.phone.value
                      }
                    },

                    // set the obj to validate input values
                    validadeInputvalues: function(obj){
                      // if the whole validate verification is rightreturn true else return false
                    if( this.validateFunction(obj, 'name') === true &&   // validade name
                      this.validateFunction(obj, 'zipCode') === true &&  // validade zipCode
                      this.validateFunction(obj, 'email') === true &&    // validade zipCode
                      this.validateFunction(obj, 'phone') === true) {    // validade phone

                        return true;
                      } else {
                        return false;
                      }
                    },
                    
                    // verify if the values sent through inputs are correct
                    validateFunction: function(obj, prop) {
                      /*Use the regular expression for each value*/
                      if(!this.Dom[prop].reg.test(obj[prop])){
                          //add class                         
                          this.Dom[prop][prop].classList.add('is-invalid');
                          return false;
                      } else {
                          //remove class
                          this.Dom[prop][prop].classList.remove('is-invalid');
                          return true;
                      }
                    }
                }


              var _ui = Object.create(uiPrototype);
                  //_ui object properties
                  _ui.Dom = {// Dom strings
                    name: {
                        name: id$('name'),
                        reg: /^[a-zA-Z]{2,10}$/ //regular expression to validate name
                    },    
                    zipCode: {
                      zipCode: id$('zip'),
                      reg:/^[0-9]{5}(-[0-9]{3})$/ //regular expression to validate zipCode
                      /* I'm from Brazil, so I use the brazil zip code, if you wanna use the USA zip code use = /^[0-9]{5}(-[0-9]{4})?$/ */
                    },
                    email: {
                      email: id$('email'),
                      reg: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/ //regular expression to validate email
                    },
                    phone: {
                      phone: id$('phone'),
                      reg: /^\(?\d{1,3}\)?[-. ]?(\d{1})?[-. ]?\d{4}[-. ]?\d{4}$/
                       /* I'm from Brazil, so I use the brazil phone number configuration, if you wanna use the USA phone number use = /^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/ */
                    },  
                    btn: qu$('.btn')
                  }

              return _ui;

  }());

/***************************************************/
//APP MODULE>>> THE APP MODULE IS THE ONLY OBJECT SEEN IN THE GLOBAL CONTEXT
  global.app = (function(_dt, _ui) {
                  //=>closure___________________________

                      // call the necessary methods to get values from form
                      function getValues(e) {
                        var values = _ui.getInputValues();

                       if(_ui.validadeInputvalues(values)){ // if the validation is right send data to DATA module
                         _dt.setData(values);
                         _ui.Dom.btn.style.display = 'block';
                       } 
                        e.preventDefault();
                       }
                  
                       function useData(e){
                        /**This is am example
                         * use the _dt.Data object when your click on submit
                         * use whatever backend language with submit
                         */
                        if(_dt.Data === null){
                          console.log('Error');
                        } else {
                          console.log(_dt.Data);
  
                        }
  
                        e.preventDefault();
                       }
                  //________________________>>EndClosure

                  var appSetup = {
                      setupEvents: function() {
                        _ui.Dom.name.name.addEventListener('blur', getValues);
                        _ui.Dom.zipCode.zipCode.addEventListener('blur', getValues);
                        _ui.Dom.email.email.addEventListener('blur', getValues);
                        _ui.Dom.phone.phone.addEventListener('blur', getValues);
                        _ui.Dom.btn.addEventListener('click', useData);
                      }
                  }

                  var app = Object.create(appSetup);
                  app.setupEvents();
     return app;
  }(_dt, _ui));
}(window));