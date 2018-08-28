package com.java.web;

import java.net.URI;
import java.util.HashMap;

import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.input.TextInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.mapreduce.lib.output.TextOutputFormat;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.java.web.anaylsis.MapperAge;
import com.java.web.anaylsis.MapperGender;

import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;

/**
 * Project!
 */
@Controller
public class HomeController {
	
	@RequestMapping("/home")
	public String home() {
		return "home";
	}
	
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
