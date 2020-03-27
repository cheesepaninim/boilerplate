$(document).ready(function(){

  var today = new Date()
  var y = today.getFullYear()
  var m = today.getMonth() + 1
  var d = today.getDate()
  //$('.start_date, .end_date').val(''+y+m+d)
  if(Number(m)<10) m = '0' + m
  if(Number(d)<10) d = '0' + d
  var date = ""+y+m+d

  $('#excelDownload').on('click', function(){
    if($('.r-table tbody').children().length === 0) return alert('조회된 데이터가 없습니다.')
    if(!confirm('엑셀 파일 다운로드 하시겠습니까?')) return
    
    var rows = $(this).data('rowData')
    if(!rows) alert('조회 결과가 없습니다.')
    else exportExcel(rows)
  })



  // 엑셀 다운로드
  function exportExcel(rows){
    // workbook 생성
    var wb = XLSX.utils.book_new();
    // 시트 만들기
    var newWorksheet = excelHandler.getWorksheet(rows);
    // workbook에 새로만든 워크시트에 이름을 주고 붙인다.
    XLSX.utils.book_append_sheet(wb, newWorksheet, excelHandler.getSheetName());
    // 엑셀 파일 만들기
    var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
    // 엑셀 파일 내보내기
    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), excelHandler.getExcelFileName());
  }
  var excelHandler = {
    getExcelFileName : function(){
      return location.pathname+'_'+date+'.xlsx'; // 파일명
    },
    getSheetName : function(){
      return 'Sheet1';
    },
    getExcelData : function(rows){
      // return [['이름' , '나이', '부서'],['도사원' , '21', '인사팀'],['김부장' , '27', '비서실'],['엄전무' , '45', '기획실']];
      return rows
    },
    getWorksheet : function(rows){
      // return XLSX.utils.aoa_to_sheet(this.getExcelData()); // array object
      return XLSX.utils.json_to_sheet(this.getExcelData(rows));
    }
  }
  function s2ab(s) {
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;
  }


})
