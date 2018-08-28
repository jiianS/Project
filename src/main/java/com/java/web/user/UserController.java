package com.java.web.user;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.java.web.dao.DAOInterface;
import com.java.web.util.FinalUtil;
import com.java.web.util.HttpUtil;

public class UserController {

	@RequestMapping("/join")
	public String join() {
		return "admin/join";
	}

	@RequestMapping("/logout")
	public String logout(HttpSession session) {
		session.invalidate();
		return "redirect:/main";
	}

	@Autowired
	DAOInterface di;

	@RequestMapping("/userInsert")
	public ModelAndView userInsert(HttpServletRequest req) {
		HashMap<String, Object> param = HttpUtil.getParamMap(req);
		HashMap<String, Object> map = new HashMap<String, Object>();
		System.out.println("test  __  " + param);
		param.put("sqlType", "user.userInsert");
		param.put("sql", "insert");

		int status = Integer.parseInt( (String) di.call(param));
		


		if (status == 1) {
			map.put("msg", "가입이 완료 되었습니다. 로그인하세요");
			map.put("status", FinalUtil.OK);
		} else {
			map.put("msg", "가입이 되지 않았습니다");
		}
		return HttpUtil.makeJsonView(map);
	}

	@RequestMapping("/checkId")
	public ModelAndView cId(HttpServletRequest req) {
		String userId = req.getParameter("checkId");
		HashMap<String, Object> map = new HashMap<String, Object>();
		HashMap<String, Object> param = HttpUtil.getParamMap(req);
		param.put("userId", userId);
		param.put("sqlType", "user.checkId");
		param.put("sql", "selectOne");
		System.out.println("check!!!!!!!!! " + param);

		 HashMap<String, Object> resultmap =(HashMap<String, Object>) di.call(param);

		 System.out.println("resultMap " + resultmap);

		int status = 0;

		 if(resultmap != null) {
		 System.out.println("!!!!!!강가입안대ㅗ");
		 map.put("msg", "이미 있는 아이디입니다.");
		 map.put("status", FinalUtil.NO);
		
		 }else {
		 System.out.println("가입가능합니다");
		 map.put("msg", "가입 가능합니다.");
		 map.put("status", FinalUtil.OK);
		 }
		return HttpUtil.makeJsonView(map);
	}

	// 로그인 후
	@RequestMapping("/userSelect")
	public String userSelect(HttpServletRequest req, RedirectAttributes attr, HttpSession session) {
		HashMap<String, Object> param = HttpUtil.getParamMap(req);

		param.put("sqlType", "user.userSelect");
		param.put("sql", "selectOne");

		// HashMap<String, Object> resultMap = (HashMap<String, Object>) di.call(param);
		//
		// if(resultMap == null) {
		// resultMap = new HashMap<String, Object>();
		// resultMap.put("status",FinalUtil.NO);
		// resultMap.put("msg",FinalUtil.NO);
		// }else {
		// resultMap.put("status", FinalUtil.OK);
		// resultMap.put("msg",FinalUtil.NO);
		// }

		// session.setAttribute("user", resultMap);

		// attr.addFlashAttribute("data", resultMap);

		return "redirect:/main";
	}

}
