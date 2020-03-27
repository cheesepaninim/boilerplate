// http://postcode.map.daum.net/guide

function searchZipCode(){
    //load함수를 이용하여 core스크립트의 로딩이 완료된 후, 우편번호 서비스를 실행합니다.
    daum.postcode.load(function(){
        new daum.Postcode({
            oncomplete: function(data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.


                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                $('#zip_cd').val(data.zonecode)

                // 주소1 : 지번선택시 지번주소 도로명 선택시 도로명 주소
                if(data.userSelectedType === "J"){
                  $('#addr1_ko').val(data.jibunAddress)
                  $('#addr1_en').val(data.jibunAddressEnglish)
                }
                else{
                  $('#addr1_ko').val(data.roadAddress)
                  $('#addr1_en').val(data.roadAddressEnglish)
                }

                var roadAddr = data.roadAddress; // 도로명 주소 변수
                var extraRoadAddr = ''; // 참고 항목 변수

                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraRoadAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                   extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }

                if(extraRoadAddr) $('#addr2_ko').val(extraRoadAddr)



                var geocoder = new kakao.maps.services.Geocoder();

                var callback = function(result, status) {
                    if (status === kakao.maps.services.Status.OK) {
                        console.log(result);
                    }
                };

                geocoder.addressSearch(data.address, function(results, status) {
                    if (status === kakao.maps.services.Status.OK) {
                    	document.getElementById('latitude').value=results[0].y;
                    	document.getElementById('longitude').value=results[0].x;
                    }
                });
            }
        }).open();
    });
}
