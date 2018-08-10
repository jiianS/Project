package com.java.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebController {

	@RequestMapping("/")
	public String main() {
		return "main";
	}
	
	@RequestMapping("/map")
	public String map() {
		return "map";
	}
	@RequestMapping("/analysis")
	public String analysis() {
		return "analysis";
	}

}
