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

$('.ui.reqadf.modal')
  .modal('attach events', '.ui.reqad.modal .ui.green.reqad.approve.basic.button')
;