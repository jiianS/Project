<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">

<!-- bootstrap -->
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

<!-- CSS style -->
<link rel='shortcut icon' href='resources/img/bike_Icon.png'>
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="resources/css/web.css">
<link rel="stylesheet" href="resources/css/home.css">

<!--script-->
<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
<script type="text/javascript" src="resources/js/home.js"></script>

<title>따릉따릉이</title>

</head>
<body>

	<c:if test="${sessionScope.user.status == 1}">
		<!-- Nav bar -->
		<div class="top">
			<div class="bar white" id="navBar">
				<a href="/" class="left wide button">따릉따릉이</a>
				<div class="right">
					<a href="/main" class="bar-item button"> <i
						class="fa fa-bicycle"></i>HELLO
					</a> <a href="/main#about" class="bar-item button"> <i
						class="fa fa-bicycle"></i>ABOUT
					</a> <a href="/main#mapsection" class="bar-item button"> <i
						class="fa fa-map-marker"></i> 따릉이는 어디에?
					</a> <a href="/main#analSection" class="bar-item button"> <i
						class="fa fa-pie-chart"></i> ANALYSIS
					</a> <a href="/main#contact" class="bar-item button"> <i
						class="fa fa-envelope"></i> CONTACT
					</a> <a href="/" class="bar-item button"> <i
						class="fa fa-user-circle-o" style="font-size: 25px;"></i>
					</a>
				</div>
			</div>
		</div>
	</c:if>
	<!-- Banner -->
	<header class="bgImg bg0">
		<section id="banner">
			<div id=homeTitle>
				<h2>따릉따릉이 </h2>
				<p>서울 공공자전거 대여소 위치를 알려주고, 간단한 분석을 보여주는 페이지입니다</p>
			</div>
			<c:if test="${empty sessionScope || sessionScope.user.status == 0}">
				<div>
					<button type="button" class="btn btn-primary" id="login">SIGN
						IN</button>
					<button type="button" class="btn btn-primary" id="join">SIGN
						UP</button>
				</div>
			</c:if>

			<c:if test="${sessionScope.user.status == 1}">
				<div class="g_home">
					<button type="button" class="btn btn-info" id="mypage" >MYPAGE</button>
					<button type="button" class="btn btn-primary" id="logout"
						onclick="logout()">LOGOUT</button>
				</div>

				<!-- myPage -->
				<div id="profile">
					<ul class="nav nav-tabs">
						<li class="active"><a data-toggle="tab" href="#m_profile">PROFILE</a></li>
						<li><a data-toggle="tab" href="#m_pwd">CHANGE PASSWORD</a></li>
						<li><a data-toggle="tab" href="#m_del">DANGER ZONE</a></li>
					</ul>

					<div class="tab-content">
						<div id="m_profile" class="tab-pane fade in active">
							<div class="tab_div">
								<form id="myForm" class="form-horizontal" method="post"
									action="">
									<div class="form-group">
										<label for="email" class="cols-sm-2 control-label">
											Email(Private)</label>
										<div class="cols-sm-10">
											<div class="input-group">
												<span class="input-group-addon"><i
													class="fa fa-envelope fa"></i></span> <input type="text"
													class="form-control " name="email" id="p_mail" />
											</div>
										</div>
									</div>

									<div class="form-group">
										<label for="name" class="cols-sm-2 control-label">User
											Name</label>
										<div class="cols-sm-10">
											<div class="input-group">
												<span class="input-group-addon"><i
													class="fa fa-user fa"></i></span> <input type="text"
													class="form-control " name="name" id="p_name" />
											</div>
										</div>
									</div>

									<div class="form-group">
										<label for="confirm" class="cols-sm-2 control-label">Address</label>
										<div class="cols-sm-10">
											<div class="input-group">
												<span class="input-group-addon"> <i
													class="fa fa-address-card-o"></i></span> <input type="text"
													id="p_addrno" class="form-control sample6_postcode"
													placeholder="우편번호" required> <input type="button"
													id="p_postbtn" class="btn display_none"
													style="margin-left: 5%; font-size: 12px;" value="우편번호 찾기"><br>
												<input type="text" style="font-size: 13px;" id="p_addr"
													class="form-control sample6_address" placeholder="주소"
													required>
											</div>
										</div>
									</div>
									<!--submit / cancel 실행해줄것 -->
									<div class="form-group ">
										<button id="update_btn" class="btn btn-primary">update</button>
										<button id="update_submit" type="submit"
											class="btn btn-success display_none">success</button>
									</div>
								</form>
							</div>
						</div>

						<div id="m_pwd" class="tab-pane fade">
							<div class="tab_div">
								<form id="pwdForm" class="form-horizontal" method="post"
									action="">
									<div class="form-group">
										<label for="password" class="cols-sm-2 control-label">현재
											비밀번호</label>
										<div class="cols-sm-10">
											<div class="input-group">
												<span class="input-group-addon"><i
													class="fa fa-lock fa-lg"></i></span> <input type="password"
													class="form-control"  id="p_pwd"
													placeholder="Enter your Password" required />
											</div>
										</div>
									</div>

									<div class="form-group">
										<label for="password" class="cols-sm-2 control-label">New
											Password</label>
										<div class="cols-sm-10">
											<div class="input-group">
												<span class="input-group-addon"><i
													class="fa fa-lock fa-lg" aria-hidden="true"></i></span> <input
													type="password" class="form-control " name="password"
													id="n_pwd" onchange="pwdOK()"
													placeholder="특수문자 / 문자 / 숫자 포함 형태의 6~15자리 이내" required />
											</div>
										</div>
									</div>

									<div class="form-group">
										<label for="confirm" class="cols-sm-2 control-label">Confirm
											Password</label>
										<div class="cols-sm-10">
											<div class="input-group">
												<span class="input-group-addon"><i
													class="fa fa-lock fa-lg"></i></span> <input type="password"
													class="form-control " name="repwd" id="n_repwd"
													placeholder="Confirm your Password" oninput="checkPwd()"
													required />
											</div>
										</div>
									</div>

									<!--submit / cancel 실행해줄것 -->
									<div class="form-group ">
										<button type="submit" onclick="pwdUpdate()" class="btn btn-success">Update</button>
									</div>
								</form>
							</div>
						</div>
						
						<!--  회원 정보 삭제 -->
						<div id="m_del" class="tab-pane fade">
							<h2 style="margin-top: 1%;">Danger Zone</h2>
							<div class="tab_div">
								<form id="delForm" class="form-horizontal" method="post"
									action="">
								<div class="form-group">
									<div class="cols-sm-10" style="margin-bottom: 2%">
										<div class="input-group" style="font-size:1em;">
												<span class="left">Delete this repository</span><br> 
												<span class="left">개인정보는 1주일 안에 완벽하게 삭제 됩니다.</span>
										</div>
									</div>

									<div class="form-group">
										<div class="cols-sm-10" >
											<div class="input-group">
												<span class="input-group-addon"><i
													class="fa fa-lock fa-lg" aria-hidden="true"></i></span> <input
													type="password" class="form-control l_input" name="password"
													id="d_pwd" placeholder="Enter your Password" required /> <input
													type="hidden" id="d_email"
													value="${sessionScope.user.userEmail}" /> 
													
													
													<input
													type="hidden" id="check_pwd"
													value="${sessionScope.user.userPwd}" />
											</div>
										</div>
									</div>
								</div>

								<!--submit / cancel 실행해줄것 -->
								<div class="form-group ">
									<button type="button" class="btn btn-danger" onclick="idDelete()" id="del_submit">Delete</button>
								</div>
								</form>
							</div>
						</div>
					</div>
				</div>

			</c:if>
		</section>
	</header>

	<!--layer-->
	<div id="layer" onclick="layerout()"></div>
	<!--sign In -->
	<div id="loginModal">
		<div class="main-login main-center">
			<form id="loginForm" class="form-horizontal" method="post" action="">
				<div class="form-group">
					<label for="email" class="cols-sm-2 control-label"> User
						Email</label>
					<div class="cols-sm-10">
						<div class="input-group">
							<span class="input-group-addon"><i
								class="fa fa-envelope fa" aria-hidden="true"></i></span> <input
								type="text" class="form-control l_input" name="email" id="id"
								placeholder="Enter your Email" onchange="emailOK()" required />
						</div>
					</div>
				</div>

				<div class="form-group">
					<label for="password" class="cols-sm-2 control-label">Password</label>
					<div class="cols-sm-10">
						<div class="input-group">
							<span class="input-group-addon"><i
								class="fa fa-lock fa-lg" aria-hidden="true"></i></span> <input
								type="password" class="form-control l_input" name="pwd" id="pwd"
								placeholder="Enter your Password" required />
						</div>
					</div>
				</div>

				<!--submit / cancel 실행해줄것 -->
				<div class="form-group ">
					<button type="submit" id="login_submit" class="btn btn-primary">LOGIN</button>
					<button type="button" class="btn btn-danger" onclick="layerout()">Cancel</button>
				</div>
			</form>
		</div>
	</div>

	<!--sign up -->
	<div id="joinModal">
		<div class="main-login main-center">
			<form id="joinForm" class="form-horizontal" method="post"
				action="">
				<div class="form-group">
					<label for="email" class="cols-sm-2 control-label"> User
						Email</label>
					<div class="cols-sm-10">
						<div class="input-group">
							<span class="input-group-addon"><i
								class="fa fa-envelope fa" aria-hidden="true"></i></span> <input
								type="text" class="form-control j_input" name="email" id="email"
								placeholder="Enter your Email" onchange="checkId()" required />
						</div>
					</div>
				</div>

				<div class="form-group">
					<label for="name" class="cols-sm-2 control-label">User Name</label>
					<div class="cols-sm-10">
						<div class="input-group">
							<span class="input-group-addon"><i class="fa fa-user fa"></i></span>
							<input type="text" class="form-control j_input" name="name"
								id="name" placeholder="Enter your name" required />
						</div>
					</div>
				</div>
				<div class="form-group">
					<label for="password" class="cols-sm-2 control-label">Password</label>
					<div class="cols-sm-10">
						<div class="input-group">
							<span class="input-group-addon"><i
								class="fa fa-lock fa-lg" aria-hidden="true"></i></span> <input
								type="password" class="form-control j_input" name="password"
								id="password" onchange="pwdOK()"
								placeholder="특수문자 / 문자 / 숫자 포함 형태의 6~15자리 이내" required />
						</div>
					</div>
				</div>
				
				<div class="form-group">
					<label for="confirm" class="cols-sm-2 control-label">Confirm
						Password</label>
					<div class="cols-sm-10">
						<div class="input-group">
							<span class="input-group-addon"><i
								class="fa fa-lock fa-lg" aria-hidden="true"></i></span> <input
								type="password" class="form-control j_input" name="repwd"
								id="repwd" placeholder="Confirm your Password"
								oninput="checkPwd()" required />
						</div>
					</div>
				</div>

				<div class="form-group">
					<label for="confirm" class="cols-sm-2 control-label">Address</label>
					<div class="cols-sm-10">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="fa fa-address-card-o"></i></span> <input type="text"
								id="sample6_postcode" class="form-control j_input"
								style="width: 52%" placeholder="우편번호" required> <input
								type="button" id="postcode_btn" class="btn"
								style="margin-left: 5%; font-size: 12px" value="우편번호 찾기"><br>
							<input type="text" style="font-size: 10px;"
								class="form-control j_input" id="sample6_address"
								placeholder="주소" required>
						</div>
					</div>
				</div>

				<!--submit / cancel 실행해줄것 -->
				<div class="form-group ">
					<button id="join_submit" type="submit" class="btn btn-primary" disabled>Register</button>
					<button type="button" class="btn btn-danger" onclick="layerout()">Cancel</button>
				</div>
			</form>
		</div>
	</div>


</body>

</html>
