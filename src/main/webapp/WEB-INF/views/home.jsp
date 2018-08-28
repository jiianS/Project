<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">

    <!-- CSS style -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="resources/css/web.css">
    <link rel="stylesheet" href="resources/css/home.css">
   
    <!--script-->
    <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
	<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
    <script type="text/javascript" src = "resources/js/home.js"></script>
	
	<title>따릉따릉이</title>
	
</head>
<body>
<!-- Banner -->
<header class="bgImg bg0" >
   <section id="banner">
    <h2>따릉따릉이</h2>
    <p>서울 공공자전거 대여소 위치를 알려주고, 간단한 분석을 보여주는 페이지입니다</p>
     <div>
      <button type="button" class="btn btn-primary" id="login">SIGN IN</button>
      <button type="button" class="btn btn-primary" id="join" >SIGN UP</button>
      </div>
    </section>
</header> 

<!--layer-->
<div id ="layer"></div>


<!--sign In-->
<div id="loginModal">    
	<div class="main-login main-center">
		<form id="loginForm" class="form-horizontal" method="post" action="">
	        <div class="form-group">
				<label for="email" class="cols-sm-2 control-label"> User Email</label>
					<div class="cols-sm-10">
	                <div class="input-group">
			          	<span class="input-group-addon"><i class="fa fa-envelope fa" aria-hidden="true"></i></span>
						<input type="text" class="form-control" name="id" id="id"  placeholder="Enter your Email"/>
					</div>
			    </div>
	        </div>
							
	    	<div class="form-group">
					<label for="password" class="cols-sm-2 control-label">Password</label>
					<div class="cols-sm-10">
					<div class="input-group">
					<span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
					<input type="password" class="form-control" name="pwd" id="pwd"  placeholder="Enter your Password"/>
					</div>
				</div>
			</div>
	
	        <!--submit / cancel 실행해줄것 -->
			<div class="form-group ">
				<button type="button" class="btn btn-primary" >LOGIN</button>
	            <button type="button" class="btn btn-danger">Cancel</button>
			</div>
		</form>
		</div>
	</div>



<!--sign up-->
<div id="joinModal">
      <div class="main-login main-center">
           <form id="joinForm" class="form-horizontal" method="post" action="">
               <div class="form-group">
               <label for="email" class="cols-sm-2 control-label"> User Email</label>
                   <div class="cols-sm-10">
                       <div class="input-group">
                           <span class="input-group-addon"><i class="fa fa-envelope fa" aria-hidden="true"></i></span>
                           <input type="text" class="form-control" name="email" id="email"  placeholder="Enter your Email"/>
                       </div>
                   </div>
               </div>

               <div class="form-group">
                <label for="name" class="cols-sm-2 control-label">User Name</label>
                   <div class="cols-sm-10">
                       <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-user fa"></i></span>
                        <input type="text" class="form-control" name="name" id="name"  placeholder="Enter your name"/>
                       </div>
                   </div>
               </div>

               <div class="form-group">
                <label for="password" class="cols-sm-2 control-label">Password</label>
                   <div class="cols-sm-10">
                    <div class="input-group">
                       <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                       <input type="password" class="form-control" name="password" id="password"  placeholder="Enter your Password"/>
                    </div>
                   </div>
               </div>

               <div class="form-group">
                   <label for="confirm" class="cols-sm-2 control-label">Confirm Password</label>
                   <div class="cols-sm-10">
                       <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                       <input type="password" class="form-control" name="confirm" id="confirm"  placeholder="Confirm your Password"/>
                       </div>
                   </div>
               </div>

               <div class="form-group">
                <label for="confirm" class="cols-sm-2 control-label">Address</label>
                <div class="cols-sm-10">
                   <div class="input-group">
                       <span class="input-group-addon">
                           <i class="fa fa-address-card-o"></i></span>
                       <input type="text" id="sample6_postcode" class="form-control" style="width:52%" placeholder="우편번호">
                     <input type="button" class="btn" style="margin-left:  5%; font-size: 13px"onclick="sample6_execDaumPostcode()" value="우편번호 찾기"><br>
                     <input type="text" style="font-size: 10px;" class="form-control" id="sample6_address" placeholder="주소">
                 </div>
              </div>
             </div>

             <!--submit / cancel 실행해줄것 -->
             <div class="form-group ">
                 <button type="submit" class="btn btn-primary" >Register</button>
                 <button type="button" class="btn btn-danger" >Cancel</button>
             </div>
         </form>
       </div>
      </div>

</body>

</html>
