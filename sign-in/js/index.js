
// show first now
$('.ui.sigin.modal')
  .modal('show')
;

$('.ui.sigin.form')
  .form({
    fields: {
     
      susername: {
        identifier: 'susername',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter a Username'
          }
        ]
      },
      spassword: {
        identifier: 'spassword',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter a Password'
        
          }
        ]
      },
        smailadress: {
        identifier: 'smailadress',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your E-Mail Adress'
          }
        ]
      },
      scountry: {
        identifier: 'scountry',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your Country'
        
          }
        ]
      },
       smadhhab: {
        identifier: 'smadhhab',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your Madhhab'
          }
        ]
      },
    }
  });

$('.ui.red.sigin.cancel.basic.button').click(function(){
console.log('click');
$('.ui.sigin.modal.form').modal('hide'); 
}),
                                             
 
 $('.ui.green.sigin.submit.basic.button').click(function(){
 console.log('click');
 if( $('.ui.sigin.form').form('is valid')) {
 console.log('valid');
 $('.ui.sigin.modal').modal('hide'); 
  
  }
     });