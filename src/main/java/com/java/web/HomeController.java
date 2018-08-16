package com.java.web;



import java.net.URI;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.input.TextInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.mapreduce.lib.output.TextOutputFormat;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;



import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	static int check=0;
	static String rentalDate;

	@RequestMapping("/")
	public String main() {return "main";}
	
	@RequestMapping("/map")
	public String map() {return "map";}
	
	@RequestMapping("/analysis")
	public String analysis() {	return "analysis";	}
	
	/***********************************************************/
	@Resource(name="hdConf")
	Configuration conf;
	String inputFile = "input/csv";
	HashMap<String, Object> resultMap;
	List<HashMap<String, Object>> resultList;
	
	
//	@RequestMapping(value="/mrCall", method=RequestMethod.POST)
	@RequestMapping(value="/mrCall")
	public void mrCall(HttpServletRequest request,HttpServletResponse response) throws Exception{
		rentalDate = request.getParameter("path");
		check = Integer.parseInt(request.getParameter("check"));
		
		System.out.println(rentalDate);
		System.out.println(check);
		

		long time = System.currentTimeMillis(); 
		SimpleDateFormat dayTime = new SimpleDateFormat("yyyyMMdd_hhmmss");
		String strTime = dayTime.format(new Date(time));
		
		/********************************************************/
		String inputPath = rentalDate.substring(0, 4);
		System.out.println(inputPath);
		
		

		
		Job job = Job.getInstance(conf,"test");
		URI inputUri = URI.create("/input/csv/"+rentalDate);
		System.out.println(strTime);
		URI outputUri = URI.create("/result/"+strTime);

		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		String name = "/result/"+strTime;
		resultMap.put("name", name);
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/json;charset=utf-8");
		JSONObject json = JSONObject.fromObject(JSONSerializer.toJSON(resultMap));
		response.getWriter().write(json.toString());

		FileInputFormat.addInputPath(job, new Path(inputUri));
		job.setInputFormatClass(TextInputFormat.class);
		FileOutputFormat.setOutputPath(job, new Path(outputUri));
		job.setOutputFormatClass(TextOutputFormat.class);
		job.setOutputKeyClass(Text.class);
		job.setOutputValueClass(IntWritable.class);
		job.setJarByClass(this.getClass());
	
//		if(arrdep.equals("1")) {
//			job.setMapperClass(Mapperarr.class);
//		}else {
//			job.setMapperClass(Mapperdep.class);
//		}
//		job.setReducerClass(Reducer.class);
//		job.waitForCompletion(true);
//		
//		System.out.println("끝");

	}
	

	
}
