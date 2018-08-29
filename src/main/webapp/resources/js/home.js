$(document).ready(function(){
    /*modal*/
	$("#join").on("click", function() {
		$("#joinModal").css("display","block");
        $("#layer").css("display","block");
	});
    
    $("#login").on("click", function() {
		$("#loginModal").css("display","block");
        $("#layer").css("display","block");
	});

	 /* button 취소 & layer 선택시 display-none */
	$("#layer").on("click", function() {
		layerout();
		$("form").each(function() {	this.reset(); })
	});
	$(".btn-danger").on("click", function() {
		layerout();
		$("form").each(function() {	this.reset();})
	});
    
    // join
	$("#join_submit").on('click', function(e) {
		e.preventDefault();	
			$.ajax({
				type:"post",
				url :"userInsert",
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				data : {
					"userEmail" : $("#email").val(),
					"userName" 	: $("#name").val(),
					"userPwd" 	: $("#password").val(),
					"addrNo" 	: $("#sample6_postcode").val(),
					"addr" 		: $("#sample6_address").val(),
				}
			}).done(function(data) {
				var d = JSON.parse(data);
				console.log("insert Join : " + d);
				alert(d.msg);
				if(d.status == 1) {
	                location.href="/";
	             }
			});
	});//form submit
    
    
	//login
	$("#loginForm").submit(function(e) {
		e.preventDefault();
		
		$.ajax({
			type:"post",
			url :"userSelect",
			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			data : {
				"userEmail" :$("#id").val(),
				"userPwd" 	: $("#pwd").val()
			}
		}).done(function(data) {
			 var d = JSON.parse(data);
			alert(d.msg);
			
			if(d.status == 1) {
			    location.href="/main";
             }
		});
	});//form submit
	
	// logout
	$("#logout").on("click",function(){ logout();});
	
    /*myPage & update*/
    $("#mypage").on("click", function() {
		$("#joinModal").css("display","block");
        $("#layer").css("display","block");
        $("#join_submit").addClass("display_none");
        $("#update_submit").removeClass("display_none");
 	
	   	 $.post("userCheck").done(function(data) {
	 		 var d = JSON.parse(data)
	 		 console.log(d['userEmail'])
	 		$("#email").val(d['userEmail']),
	 		$("#name").val(d['userName']),
	 		$("#sample6_postcode").val(d['addrNo']),
	 		$("#sample6_address").val(d['addr'])
	 		$(".form-control").attr("readonly",true);
	 	});
	   	 
	  	$("#update_submit").on("click", function(e) {
	  		e.preventDefault();
	   		$(".form-control").attr("readonly",false);
	   		$("#email").attr("readonly",true);
	 		$("#name").attr("readonly",true);
	 		 
	 		$.ajax({
//	 			type:post,
	 			url:'userUpdate',
	 			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
	 			data : {
					"userEmail" : $("#email").val(),
					"userPwd" 	: $("#password").val(),
					"addrNo" 	: $("#sample6_postcode").val(),
					"addr" 		: $("#sample6_address").val(),
	 			}
	 		}).done(function(data) {
	 			var d = JSON.parse(data)
	 			alert(d.msg);
	 			console.log("update" + data)
			});
	 		
		});
	});
        
	
	
});

function layerout(){
   $("#layer").css("display","none");
   $("#joinModal").css("display","none");
   $("#loginModal").css("display","none");
}

function logout() {
	$.ajax({
		url:"logout"
	}).done(function(data) {
		console.log(data)
		var d = JSON.parse(data)
		alert(d.msg)
		location.href="/";
	});
}

//아이디 비번 체크 함수
function checkId() {
	var checkId = $("#email").val();
	
	$.ajax({
		url : "checkId",
		data:{ checkId : checkId },
		success : function(data) {
			var d = JSON.parse(data)
		if(d.status == '1'){		
				$("#email").css("background-color", "#fdffe4");
				$("#email").css("color", "#555555");
			}else if(d.status == '0'){		
				//아이디 확인 -> 가입 불가
				alert(d.msg);
				$("#email").css("background-color", "#BA2B2B");
			}		
		}
	});
}

//재입력 비밀번호 체크하여 가입버튼 비활성화 또는 맞지않음을 알림.
function checkPwd() {
    var checkPwd = $('#password').val();
    var rePwd = $('#repwd').val();

   if (checkPwd == rePwd) {
        $("#repwd").css("background-color", "#fdffe4");
        $("#join_submit").prop("disabled", false );
    } else if (checkPwd != repwd) {            
        $("#repwd").css("background-color", "#BA2B2B");
        $("#join_submit").prop("disabled", true);
        
    }
}


//다음주소 api
function sample6_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var fullAddr = ''; // 최종 주소 변수
            var extraAddr = ''; // 조합형 주소 변수

            // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                fullAddr = data.roadAddress;

            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                fullAddr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
            if(data.userSelectedType === 'R'){
                //법정동명이 있을 경우 추가한다.
                if(data.bname !== ''){
                    extraAddr += data.bname;
                }
                // 건물명이 있을 경우 추가한다.
                if(data.buildingName !== ''){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
                fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('sample6_postcode').value = data.zonecode; //5자리 새우편번호 사용
            document.getElementById('sample6_address').value = fullAddr;
        }
    }).open();
}




