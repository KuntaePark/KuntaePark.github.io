// show first now
$('.ui.report.modal')
  .modal('show')
;

$('.ui.report.form')
  .form({
    fields: {
      reportinput: {
        identifier: 'reportinput',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please insert the wrong information'
        
          }
        ]
      },
    }
  });

$('.ui.red.report.cancel.basic.button').click(function(){
console.log('click');
$('.ui.report.modal.form').modal('hide'); 
}),

  $('.ui.green.refe.approve.basic.button').click(function(){
console.log('click');
$('.ui.refe.modal').modal('hide'); 
}),
 
 $('.ui.green.report.submit.basic.button').click(function(){
 console.log('click');
 if( $('.ui.report.form').form('is valid')) {
 console.log('valid');
 $('.ui.report.modal').modal('hide'); 
 
  }
     });

$('.ui.green.report.submit.basic.button').click(function(){
 console.log('click');
 if( $('.ui.report.form').form('is valid')) {
 console.log('valid');
 $('.ui.refe.modal').modal('show'); 
  
  }
     });