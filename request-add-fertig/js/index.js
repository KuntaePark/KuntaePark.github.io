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

    
// requesterror
$('.ui.req.form.segment')
  .form({
    fields: {
     reqname: {
        identifier: 'reqname',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter the name of your item'
          }
        ]
      },
      reqbrand: {
        identifier: 'reqbrand',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter the brand of your item'
          }
        ]
      },
    }
  });
$('.ui.red.req.cancel.basic.button').click(function(){
console.log('click');
$('.ui.reqad.modal').modal('hide'); 
})

 $('.ui.green.req.submit.basic.button').click(function(){
 console.log('click');
 if( $('.ui.req.form.segment').form('is valid')) {
 console.log('valid');
$('.ui.reqadf.modal').modal('show'); 
 
  }
     });