$(document).ready(function(){
    /*modal*/
	$("#join").on("click", function() {
		$("#joinModal").css("display","block");
        $("#layer").css("display","block");
	});
    
    $("#login").on("click", function() {
		$("#loginModal").css("display","block");
        $("#layer").css("display","block");
        $("#login_submit").prop("disabled", true);
    
        $(".l_input").on("input", function() {
			if($("#id").val() != "" && $("#pwd").val() != ""){
				$("#login_submit").prop("disabled", false);
			}	        	
		});
    });

    // 우편번호!!
    $("#postcode_btn").click(function() {
    	var postcheck = "join";
    	sample6_execDaumPostcode(postcheck)    		
	});
    $("#p_postbtn").click(function() {
    	var postcheck = "update";
    	sample6_execDaumPostcode(postcheck)    		
	});
    
    // join
	$("#join_submit").submit(function(e) {
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
					"addr" 		: $("#sample6_address").val()
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
			    location.href="/";
             }
		});
	});//form submit

	
    /*myPage & update*/
    $("#mypage").on("click", function() {
    	$(".g_home1").css("display", "none");
    	$("#banner").css("padding" , "8em 0");
    	$("#homeTitle").css("color","#505050")
		$("#profile").css("display","block");
		
        //  정보 받아오기
	   	 $.post("userCheck").done(function(data) {
	 		 var d = JSON.parse(data)
	 		$("#p_mail").val(d['userEmail']),
	 		$("#p_name").val(d['userName']),
	 		$("#p_addrno").val(d['addrNo']),
	 		$("#p_addr").val(d['addr']),
	 		$(".form-control").attr("readonly",true);
	 	});
	   	 
	    // update버튼 받아 왔을 때!
	   	$("#update_btn").on("click", function(e) {
	   		e.preventDefault();
	    		$(".form-control").attr("readonly",false);
	    		$("#p_mail").attr("readonly",true);
	    		$(".form-control").attr("required",true);
	    		$("#p_addrno").css("width", "52%")
	    		$("#p_postbtn").removeClass("display_none");

		         $("#update_btn").addClass("display_none");
		         $("#update_submit").removeClass("display_none");
	  		
	  		alert("[이름과 주소 수정 가능!]");
	 	});
	   	 
	});

    
    $("#myForm").submit(function(e) {
    	e.preventDefault();
    	
 		$.ajax({
			type:"post",
 			url:'userUpdate',
 			data : {
				"userEmail" : $("#p_mail").val(),
				"addrNo" 	: $("#p_addrno").val(),
				"addr" 		: $("#p_addr").val(),
 			}
 		}).done(function(data) {
 			var d = JSON.parse(data)
 			alert(d.msg)

		});
	});
	
});

function layerout(){
   $("#layer").css("display","none");
   $("#joinModal").css("display","none");
   $("#loginModal").css("display","none");
   $("#update_btn").addClass("display_none");
   $("#update_submit").addClass("display_none");
   $(".form-control").css("background-color", "#ffffff");
   $(".form-control").css("color", "#555555");
   
   $("form").each(function() {	
		this.reset(); 
	})
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
	var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
	var checkId = $("#email").val();
	
	// 이메일 체크하기
	if ( !(regExp.test(checkId))) {
	      alert("잘못된 이메일 형식입니다.ex)test@gmail.com");
			$("#email").css("background-color", "#BA2B2B");
			$("#email").css("color", "#ffffff");
	      return false;
	}
	
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
				$("#email").css("color", "#ffffff");
			}		
		}
	});
}

// 6- 15자 영문대소문자, 숫자, 특수문자 혼합 사용
function pwdOK() {
	 var pwd = $("#password").val();	
	 var regex = /^.*(?=^.{6,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

	 // 영문, 숫자, 특수문자 2종 이상 혼용
	 var chk = 0;
	 
	// 글자수 제한
	  if(pwd.length < 6 || pwd.length > 16 ) {
		    alert("비밀번호는 영문(대소문자구분),숫자,특수문자(~!@#$%^&*()-_? 만 허용)를 2개 이상 혼용하여 8~15자를 입력해주세요.");
			$("#password").css("background-color", "#BA2B2B");
			$("#password").css("color", "#ffffff");
			    return false;
	  }
	 
	 if(pwd.search(/[0-9]/g) != -1 ) chk ++;
	 if(pwd.search(/[a-z]/ig)  != -1 ) chk ++;
	 if(pwd.search(/[!@#$%^&*()?_~]/g)  != -1  ) chk ++;
	 if(chk < 2)
	 { 
	  alert("비밀번호는 숫자, 영문, 특수문자를 두가지이상 혼용하여야 합니다."); 
	  return false;
	 }

		$("#password").css("background-color", "#fdffe4");
		$("#password").css("color", "#333333");
	  return true;
}

//재입력 비밀번호 체크하여 가입버튼 비활성화 또는 맞지않음을 알림.
function checkPwd() {
    var checkPwd = $('#password').val();
    var rePwd = $('#repwd').val();

   if (checkPwd == rePwd) {
        $("#repwd").css("background-color", "#fdffe4");
        $("#join_submit").prop("disabled", false);
    } else if (checkPwd != repwd) {            
        $("#repwd").css("background-color", "#BA2B2B");
        $("#join_submit").prop("disabled", true);
    }
}

//id_pwd 확인
function checklogin() {
	if( $("#id").val() == "" || $("#pwd").val() ==""){
		$("#login_submit").prop("disabled", true);
	}else{
		$("#login_submit").prop("disabled", false);
	}
}
//다음주소 api
function sample6_execDaumPostcode(postcheck) {
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
            
            if(postcheck == "join"){
                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById('sample6_postcode').value = data.zonecode; //5자리 새우편번호 사용
                document.getElementById('sample6_address').value = fullAddr;            	
            }else if(postcheck == "update"){
                document.getElementById('p_addrno').value = data.zonecode; //5자리 새우편번호 사용
                document.getElementById('p_addr').value = fullAddr;
            }
        }
    }).open();
}


