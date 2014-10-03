QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

jQuery.sap.require("todo.TodoPersistency");  
sap.ui.controller("todo.Todo", {  
     // Stores todos permanently via HTML5 localStorage  
     store : new todo.TodoPersistency("todos"),  
     // Stores todos for the duration of the session  
     model : null,  
     // Retrieve todos from store and initialize model  
     onInit : function() {  
          this.model = new sap.ui.model.json.JSONModel(  
               this.store.isEmpty() ? this.store.set({  
                    todos : []  
               }).get() : this.store.get());  
          this.getView().setModel(this.model);  
     },  
     // Create a new todo  
     createTodo : function(todo) {  
          this.model.setProperty("/todos/", this.model.getProperty("/todos/")  
               .push({  
                    "id" : Date.now(),  
                    "done" : false,  
                    "text" : todo  
               }));  
          this.store.set(this.model.getData());  
          this.model.updateBindings(true);  
     },  
     // ...  
});  