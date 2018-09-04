$(document).ready(function(){
	
    /*회원가입 모달*/
	$("#join").on("click", function() {
		$("#joinModal").css("display","block");
        $("#layer").css("display","block");
        
    	if($("#email").val() == ""){	$("#email").focus(); return false;}
    	else if($("#name").val()== ""){ $("#name").focus() ; return false;}
    	else if($("#password").val()== ""){ $("#password").focus() ; return false;}
    	else if($("#repwd").val()== ""){ $("#repwd").focus() ; return false;}
	});
	
    /*로그인 모달*/
    $("#login").on("click", function() {
		$("#loginModal").css("display","block");
        $("#layer").css("display","block");
        $("#login_submit").prop("disabled", true);

    	if($("#id").val() == ""){
    		$("#id").focus();
    	}
    
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
	$("#join_submit").on("click",function(e) {
		e.preventDefault();	
		
		if($("#password").val() != $("#repwd").val()){
			alert("비밀번호가 서로 다릅니다")
		}else{
		
			$.ajax({
				type:"post",
				url :"userInsert",
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
		}
	});//form submit
    
	$("#loginForm").submit(function(e) {
    	e.preventDefault();
    	
    	$.ajax({
			type:"post",
			url :"userSelect",
			data : {
				"userEmail" : $("#id").val(),
				"userPwd" 	: $("#pwd").val()
			}
		}).done(function(data) {
			 var d = JSON.parse(data);
			alert(d.msg);
			
			if(d.status == 1) {
			    location.href="/";
	         }
		});
	});
    
	
    /*myPage & update*/
    $("#mypage").on("click", function() {
    	$("#banner").css("padding" , "8em 0");
    	$("#homeTitle").css("color","#505050")
		$("#profile").css("display","block");
    	
    	// 정보 받아오기
	   	 $.post("userCheck").done(function(data) {
	 		 var d = JSON.parse(data)
	 		$("#p_mail").val(d['userEmail']),
	 		$("#p_name").val(d['userName']),
	 		$("#p_addrno").val(d['addrNo']),
	 		$("#p_addr").val(d['addr']),
	 		$("#myForm .form-control").attr("readonly",true);
	 	});
    	
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

   	
    // mypage_profile 수정
    $("#myForm").submit(function(e) {
    	e.preventDefault();
    	
 		$.ajax({
			type:"post",
 			url:'userUpdate',
 			data : {
				"userEmail" : $("#p_mail").val(),
				"userName"	: $("#p_name").val(),
				"addrNo" 	: $("#p_addrno").val(),
				"addr" 		: $("#p_addr").val(),
 			}
 		}).done(function(data) {
 			var d = JSON.parse(data)
 			console.log("data" + data)
 			alert(d.msg)
	         $("#update_btn").removeClass("display_none");
	         $("#update_submit").addClass("display_none");
	         $("#p_addrno").css("width", "100%")
	         $("#p_postbtn").addClass("display_none");
	         $("#myForm .form-control").attr("readonly",true);
	         
		});
	});
    
});

// 모달
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

// 로그아웃
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

// 아이디 비번 체크 함수
function checkId() {
	var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
	var checkId = $("#email").val();

	// 이메일 체크하기
	if (!(regExp.test(checkId))) {
		
		alert("잘못된 이메일 형식입니다.ex)test@gmail.com");
		$("#email").css("background-color", "#BA2B2B");
		$("#email").css("color", "#ffffff");
    	$("#email").focus();
		return false;
	} 
		$.ajax({
			url : "checkId",
			data : { checkId : checkId },
			success : function(data) {
				var d = JSON.parse(data)
				alert(d.msg);
				if (d.status == '1') {
					$("#email").css("background-color", "#fdffe4");
					$("#email").css("color", "#555555");
				} else if (d.status == '0') {
					// 아이디 확인 -> 가입 불가
					$("#email").css("background-color", "#BA2B2B");
					$("#email").css("color", "#ffffff");

					return false;
				}
			}
		});
	
}

// 로그인시 이메일 체크
function emailOK() {
	var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
	var checkId = $("#id").val();
	
	// 이메일 체크하기
	if (!(regExp.test(checkId))) {
		alert("잘못된 이메일 형식입니다.ex)test@gmail.com");
		$("#id").css("background-color", "#BA2B2B");
		$("#id").css("color", "#ffffff");
		$("#id").focus();
		return false;
	}else{
		 $('#id').css("background-color", "#fdffe4");
		 $('#id').css("color", "#333333");
	}
	
	if($("#pwd").val() == ""){
		$("#pwd").focus();
		return false;
	}
	
}

// 6- 15자 영문대소문자, 숫자, 특수문자 혼합 사용
function pwdOK() {
	 var pwd =  $('input[name="password"]').val();
	 var regex = /^.*(?=^.{6,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

	 // 영문, 숫자, 특수문자 2종 이상 혼용
	 var chk = 0;
	 
	// 글자수 제한
	  if(pwd.length < 6 || pwd.length > 16 ) {
		    alert("비밀번호는 영문(대소문자구분),숫자,특수문자(~!@#$%^&*()-_? 만 허용)를 2개 이상 혼용하여 8~15자를 입력해주세요.");
			 $('input[name="password"]').css("background-color", "#BA2B2B");
			 $('input[name="password"]').css("color", "#ffffff");
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

	 $('input[name="password"]').css("background-color", "#fdffe4");
	 $('input[name="password"]').css("color", "#333333");
	  return true;
}

//재입력 비밀번호 체크하여 가입버튼 비활성화 또는 맞지않음을 알림.
function checkPwd() {
    var checkPwd = $('input[name="password"]').val();
    var rePwd	 = $('input[name="repwd"]').val();

   if (checkPwd == rePwd) {
	    $('input[name="repwd"]').css("background-color", "#fdffe4");
	    $("button[type=submit]").prop("disabled", false);
    } else if (checkPwd != repwd) {            
        $('input[name="repwd"]').css("background-color", "#BA2B2B");
        $('input[name="repwd"]').focus()
        return false;
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

// 비밀번호 update
function pwdUpdate() {
	if ($("#p_pwd").val() != $("#check_pwd").val()) {
		alert("현재 비밀번호를 확인하세요")
		return false;
	} else if ($("#n_pwd").val() != $("#n_repwd").val()) {
		alert("변경되는 비밀번호 값이 달라요!")
	} else {
		$.ajax({
			type : "post",
			url  : "pwdUpdate",
			data : {
				"userEmail" : $("#d_email").val(),
				"userPwd"	: $("#n_pwd").val()
			}
		}).done(function(data) {
			var d = JSON.parse(data)
			alert(d.msg)
			if(d.status ==1){
				location.href="/"
			}
			return false;
		});
	}
}

// 아이디 삭제
function idDelete() {
		if(confirm("정말 삭제 하시겠습니까?") == false){
			return;
		}else{
			$.ajax({
				type : "post",
				url : 'userDelete',
				data : { 
					"userEmail" : $("#d_email").val(),
					"userPwd" : $("#d_pwd").val()
				}
			}).done(function(data) {
				var d = JSON.parse(data)
				alert(d.msg)
				if(d.status ==1){
					location.href="/"
				}
			});
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





