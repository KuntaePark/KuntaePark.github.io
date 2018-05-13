$('.reqad .item')
  .tab()
;

$('#reqAdModal')
  .modal('show')
;

  $('.coupled.modal')
  .modal({
    allowMultiple: true
  })
;

    
// requesterror
$('#reqForm')
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
$('#reqCancel').click(function(){
console.log('click');
$('#reqAdModal').modal('hide'); 
})

 $('#reqSend').click(function(){
 console.log('click');
 if( $('#reqForm').form('is valid')) {
 console.log('valid');
$('reqAdfModal').modal('show'); 
 
  }
     });