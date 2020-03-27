/* popups */
$(document).ready(function(){

/* popup control start 팝업 */

  $('.backdrop').on('click', function(){closePop()})
  $('.popWindow').on('click', '.popClose', function(){closePop()})

  var popValuesCheck = function(){
  	var popValuesChecked = true
  	$('#container .popSearch').each(function(i){
  		if(!popValuesChecked) return
  		if(!$(this).data('checked')){
  			alert(`${$(this).siblings('label').text()} 입력값을 먼저 검색해주세요.`)
  			popValuesChecked = false
  			return
      }
  		// console.log(`index: ${i} checked`)
  	})
    return popValuesChecked
  }

  // popup 검색기능 있는 input에서 입력시 checked = false
  $('#container .popSearch').each(function(){
  	var $popTarget = $(this).siblings('input[disabled!=disabled]')
  	$popTarget.on('keyup', function(){
      if($popTarget.val().trim() !== '') $(this).siblings('button.popSearch').data('checked', false)
      else $(this).siblings('button.popSearch').data('checked', true)
    })
  })



  // open & close popups
  function openPop(content, searchData){
    $('.backdrop').show()
    $('.popWindow').show()

    if(!content) return console.error('no content to open')
    else{
      $.ajax({
        url     : "/"+content+".html",
        dataType: "html",
        success : function(data){
          $(".popWindow").html(data)

          if(content.split('/')[1] === 'updateAdminPwd'){
            $('#updateAdmin_user_nm').val($('#nav_user_nm').text())
          }

          if(searchData){
            var objKeys = Object.keys(searchData)
            for(var val of objKeys) $('#pop_'+val).val(searchData[val])
            var path = location.pathname + '/select'
                      + val.split('_')[0][0].toUpperCase()
                      + val.split('_')[0].substr(1)

            if(path.split('/').length > 3){
              path = '/' + path.split('/')[1] + '/' + path.split('/')[3]
            }

            // path = '/00_****/select****'

            $.get(path, searchData, function(data){selectFromPop(data)})
          }
        }
      })
    }
  } // end of opening popup

  function closePop(save){
    if(save){
      var fLen = $('.p-t-selected').children().length
      var dataKey
      for(var i=0; i<fLen; i++){
        dataKey = $('.p-t-selected>.selected_'+Number(i+1)).children('input').attr('id').substr(4)
        $('#'+dataKey).val($('#pop_'+dataKey).val())
      }

      // input data-checked = true
      $('input[id^='+dataKey.split('_')[0]+']').siblings('.popSearch').data('checked', true)
    }

    $('.backdrop').hide()
    $('.popWindow').hide().children().remove()
  } // end of closing popup

/* popup control end 팝업 */





})
