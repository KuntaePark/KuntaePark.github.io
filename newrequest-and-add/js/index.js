$('.menu .item')
  .tab()
;

$('.ui.reqad.modal')
  .modal('show')
;

  $('.coupled.modal')
  .modal({
    allowMultiple: false
  })
;

//request error messages
$('.ui.req.form.segment')
  .form({
    fields: {
      reqname: {
        identifier: 'reqname',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please insert the name of your item'
          }
        ]
      },
    
     reqbrand: {
        identifier: 'reqbrand',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please insert the brand of your item'
        
          }
        ]
      },
    }
  });

$('.ui.red.req.cancel.basic.button').click(function(){
console.log('click');
$('.ui.reqad.modal').modal('hide'); 
}),
  
 $('.ui.green.reqadf.approve.basic.button').click(function(){
console.log('click');
$('.ui.reqadf.modal').modal('hide'); 
}),
  

  
$('.ui.green.req.submit.basic.button').click(function(){
 console.log('click');
 if( $('.ui.req.form.segment').form('is valid')) {
 console.log('valid');
 $('.ui.reqadf.modal').modal('show'); 
  
  }
     });


//add error messages
$('.ui.ad.form.segment')
  .form({
    fields: {
     addname: {
        identifier: 'addname',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please insert the name of your item'
          }
        ]
      },
    
     addbrand: {
        identifier: 'addbrand',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please insert the brand of your item'
        
          }
        ]
      },
    }
  });

$('.ui.red.add.cancel.basic.button').click(function(){
console.log('click');
$('.ui.reqad.modal').modal('hide'); 
}),
   
  $('.ui.green.add.submit.basic.button').click(function(){
 console.log('click');
 if( $('.ui.req.form.segment').form('is valid')) {
 console.log('valid');
 $('.ui.requad.modal').modal('hide'); 
 
  }
     });
  
$('.ui.green.req.submit.basic.button').click(function(){
 console.log('click');
 if( $('.ui.ad.form.segment').form('is valid')) {
 console.log('valid');
 $('.ui.reqadf.modal').modal('show'); 
  
  }
     });