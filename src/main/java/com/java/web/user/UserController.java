package com.java.web.user;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.java.web.dao.DAOInterface;
import com.java.web.util.FinalUtil;
import com.java.web.util.HttpUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
public class UserController {

	@Autowired
	DAOInterface di;

	// 가입하기
	@RequestMapping("/userInsert")
	public ModelAndView userInsert(HttpServletRequest req) {
		HashMap<String, Object> param = HttpUtil.getParamMap(req);
		HashMap<String, Object> map = new HashMap<String, Object>();

		try {
			param.put("sqlType", "user.userInsert");
			param.put("sql", "insert");

			int status = (int) di.call(param); // java ver1.7 이상

			if (status == 1) {
				map.put("msg", "가입이 완료 되었습니다. 로그인하세요");
				map.put("status", FinalUtil.OK);
			} else {
				map.put("msg", "가입이 되지 않았습니다");
			}
		}

		catch (Exception e) {
			e.printStackTrace();
			map.put("msg", "빈칸없이 입력 해주세요");
		}
		return HttpUtil.makeJsonView(map);

	}

	// id 중복확인
	@RequestMapping("/checkId")
	public ModelAndView checkId(HttpServletRequest req) {
		String userEmail = req.getParameter("checkId");
		HashMap<String, Object> map = new HashMap<String, Object>();
		HashMap<String, Object> param = HttpUtil.getParamMap(req);

		param.put("userEmail", userEmail);
		param.put("sqlType", "user.checkId");
		param.put("sql", "selectOne");
		HashMap<String, Object> resultmap = (HashMap<String, Object>) di.call(param);

		int status = 0; // 결과 상태 확인하는 값
		if (resultmap != null) {
			map.put("msg", "이미 있는 아이디입니다.");
			map.put("status", FinalUtil.NO);

		} else {
			map.put("msg", "가입 가능합니다.");
			map.put("status", FinalUtil.OK);
		}
		return HttpUtil.makeJsonView(map);
	}

	// 로그인 &
	@RequestMapping("/userSelect")
	public ModelAndView userSelect(HttpServletRequest req, HttpServletResponse res, RedirectAttributes attr,
			HttpSession session) {
		System.out.println("로그인 확인중 ");
		HashMap<String, Object> param = new HashMap<String, Object>();
		String userEmail = req.getParameter("userEmail");
		String userPwd = req.getParameter("userPwd");
		param.put("userEmail", userEmail);
		param.put("userPwd", userPwd);
		
		HashMap<String, Object> resultMap = (HashMap<String, Object>) di.call(param);

		param.put("sqlType", "user.userSelect");
		param.put("sql", "selectOne");

		System.out.println("로그인 확인중 ");
		System.out.println(param );
		
		if (resultMap == null) {
			// 로그인되지 않음
			resultMap = new HashMap<String, Object>();
			resultMap.put("status", FinalUtil.NO);
			resultMap.put("msg", "이메일 또는 비번이 틀립니다");

		} else {
			resultMap.put("status", FinalUtil.OK);
			resultMap.put("msg", "로그인 되었습니다.");
		}
		
		session.setAttribute("user", resultMap);
		System.out.println(resultMap);
		return HttpUtil.makeJsonView(resultMap);
	}

	// 정보수정
	@RequestMapping("/userUpdate")
	public ModelAndView userUpdate(HttpServletRequest req) {
		System.out.println("userUpdate!!!");
		HashMap<String, Object> param = new HashMap<String, Object>();
		String userEmail = req.getParameter("userEmail");
		String addrNo = req.getParameter("addrNo");
		String addr = req.getParameter("addr");
		param.put("userEmail", userEmail);
		param.put("addrNo", addrNo);
		param.put("addr", addr);

		HashMap<String, Object> map = new HashMap<String, Object>();
		param.put("sqlType", "user.userUpdate");
		param.put("sql", "update");

		int status = (int) di.call(param);
		/********************************************************************************************/
		System.out.println(status);

		if (status == 1) {
			map.put("msg", "정보수정이 완료 되었습니다.");
			map.put("status", FinalUtil.OK);
		} else {
			map.put("msg", "정보수정이 실패하였습니다");
		}
		return HttpUtil.makeJsonView(map);
	}

	// 비밀번호 변경
	@RequestMapping("/pwdUpdate")
	public ModelAndView pwdUpdate(HttpServletRequest req, HttpSession session) {
		HashMap<String, Object> param = new HashMap<String, Object>();
		HashMap<String, Object> map = new HashMap<String, Object>();

		try {
			String userEmail = req.getParameter("userEmail");
			String userPwd = req.getParameter("userPwd");
			param.put("userEmail", userEmail);
			param.put("userPwd", userPwd);
			param.put("sqlType", "user.pwdUpdate");
			param.put("sql", "update");

			int status = (int) di.call(param);
			System.out.println("pwdupdate" + param + " ; " + status);
			if (status == 1) {
				map.put("msg", "비밀번호가 변경되었습니다. 다시 로그인해주세요");
				map.put("status", FinalUtil.OK);
				session.invalidate();
			} else {
				map.put("msg", "비밀번호가 변경이 실패하였습니다");
			}
		} catch (Exception e) {
			e.printStackTrace();
			map.put("msg", "빈칸없이 입력바랍니다");
		}
		return HttpUtil.makeJsonView(map);
	}

	// login check (정보 확인하기)
	@RequestMapping("/userCheck")
	public void userCheck(HttpServletResponse res, HttpSession session) {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		if (session == null) {
			resultMap.put("status", FinalUtil.OK);
		} else {
			resultMap = (HashMap<String, Object>) session.getAttribute("user");
			if (resultMap == null) {
				resultMap = new HashMap<String, Object>();
				resultMap.put("status", FinalUtil.NO);
			} else {
				resultMap.put("status", FinalUtil.OK);
			}
		}
		HttpUtil.makeJsonWriter(res, resultMap);
	}

	// logout
	@RequestMapping("/logout")
	public ModelAndView logout(HttpServletResponse res, HttpSession session) {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("status", FinalUtil.NO);
		resultMap.put("msg", "로그아웃 되었습니다");
		session.invalidate();
		return HttpUtil.makeJsonView(resultMap);
	}

	// userDelete (회원탈퇴)
	@RequestMapping("/userDelete")
	public ModelAndView userDelete(HttpServletRequest req, HttpSession session) {
		HashMap<String, Object> param = HttpUtil.getParamMap(req);
		HashMap<String, Object> map = new HashMap<String, Object>();
		try {
			param.put("sqlType", "user.userDel");
			param.put("sql", "update");

			int status = (int) di.call(param);
			if (status == 1) {
				map.put("msg", "정상적으로 탈퇴되었습니다");
				map.put("status", FinalUtil.OK);
				session.invalidate();
			} else {
				map.put("msg", "실패하였습니다. 다시 시도해주세요");
				map.put("status", FinalUtil.NO);
			}

		} catch (Exception e) {
			map.put("msg", "빈칸없이 입력바랍니다");
		}
		return HttpUtil.makeJsonView(map);
	}

}

