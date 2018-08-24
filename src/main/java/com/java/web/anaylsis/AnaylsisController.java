package com.java.web.anaylsis;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URI;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FSDataInputStream;
import org.apache.hadoop.fs.FileStatus;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.input.TextInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.mapreduce.lib.output.TextOutputFormat;
import org.springframework.stereotype.Controller;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;

@Controller
public class AnaylsisController {
	/*********************************************************/
	public static int check = 0;
	public static String rentalDate;
	public static String rentID;

	@Resource(name = "hdConf")
	Configuration conf;
	String inputFile = "input/csv";
	HashMap<String, Object> resultMap;
	List<HashMap<String, Object>> resultList;

	/*** MapReduce하는 영역 ******************************************/
	@RequestMapping(value = "/mrCall", method = RequestMethod.POST)
	public void mrCall(HttpServletRequest req,  HttpServletResponse res) throws Exception {
		rentalDate = req.getParameter("path");
		check = Integer.parseInt(req.getParameter("check"));

		/********************************************************/
		// 해당 년도에 해당되는 csv 파일로 path를 넘겨주기 위함
		String inputPath = rentalDate.substring(0, 4);
		System.out.println(inputPath);
		/*******************************************************/

		// inputUri -> 읽어들일 file / outputUri -> 분석해서 출력할 csv
		Job job = Job.getInstance(conf, "test");
		
		mr(job, inputPath, res);
		
		if (check == 1 || check == 2 || check == 3 ) { // 연령대별
			job.setMapperClass(MapperAge.class);

		} else if (check == 4 || check == 5 || check == 6 ) { // 성별
			job.setMapperClass(MapperGender.class);
		} else {
			System.out.println("check값 오류유융");
		}
		job.setReducerClass(Reducer.class);
		job.waitForCompletion(true);
		System.out.println("끝");
	}
	
	@RequestMapping(value = "/mrMapCall", method = RequestMethod.POST)
	public void mrMapCall(HttpServletRequest req,  HttpServletResponse res) throws Exception {
		rentID = req.getParameter("path");
		String year = req.getParameter("year");

		Job job = Job.getInstance(conf, "test");
		
		mr(job, year, res);
	
		job.setMapperClass(MapperMap.class);
		job.setReducerClass(Reducer.class);
		job.waitForCompletion(true);

		System.out.println("끝");
	}
	
	
	public void mr(Job job, String inputPath, HttpServletResponse res) throws Exception {
		
		long time = System.currentTimeMillis();
		SimpleDateFormat dayTime = new SimpleDateFormat("yyyyMMdd_hhmmss");
		String strTime = dayTime.format(new Date(time));
		
		URI inputUri = URI.create("/input/csv/" + inputPath + ".csv");
		System.out.println(inputUri);
		URI outputUri = URI.create("/result/" + strTime);

		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		String name = "/result/" + strTime;
		resultMap.put("name", name);
		res.setCharacterEncoding("UTF-8");
		res.setContentType("text/json;charset=utf-8");
		JSONObject json = JSONObject.fromObject(JSONSerializer.toJSON(resultMap));
		res.getWriter().write(json.toString());

		FileInputFormat.addInputPath(job, new Path(inputUri));
		job.setInputFormatClass(TextInputFormat.class);
		FileOutputFormat.setOutputPath(job, new Path(outputUri));
		job.setOutputFormatClass(TextOutputFormat.class);
		job.setOutputKeyClass(Text.class);
		job.setOutputValueClass(IntWritable.class);
		job.setJarByClass(this.getClass());

	}
	
	
	
	
	

	/*** 리듀스 된 파일 읽어오기 ******/
	@RequestMapping(value = "/getResult", method = RequestMethod.GET)
	public void getResult(HttpServletRequest req, HttpServletResponse res) throws Exception {

		String f_path = req.getParameter("mrName");
		f_path = f_path + "/part-r-00000";
		URI uri = URI.create(f_path);
		Path path = new Path(uri);

		FileSystem file = FileSystem.get(uri, conf);
		FSDataInputStream fsis = file.open(path);

		byte[] buffer = new byte[12345];
		int byteRead = 0;
		String result = "";

		while ((byteRead = fsis.read(buffer)) > 0) {
			result = new String(buffer, 0, byteRead);
		}

		String[] rows = result.split("\n");

		List<HashMap<String, Object>> list = new ArrayList<HashMap<String, Object>>();
		for (int j = 0; j < rows.length; j++) {
			String row = rows[j];
			String[] cols = row.split("\t");

			HashMap<String, Object> map = new HashMap<String, Object>();
			for (int c = 0; c < cols.length; c++) {
				map.put(c + "", cols[c]);
			}
			list.add(map);
		}

		resultMap = new HashMap<String, Object>();
		resultMap.put("result", list);

		JSONObject json = JSONObject.fromObject(JSONSerializer.toJSON(resultMap));
		res.setCharacterEncoding("UTF-8");
		res.setContentType("text/json;charset=utf-8");
		res.getWriter().write(json.toString());
	}

	/*** 이미지 저장하기 *********/
	@RequestMapping(value = "/getImg", method = RequestMethod.POST)
	public void getimg(HttpServletRequest req, HttpServletResponse res) throws IOException {
		String imgData = req.getParameter("imgData");
		String fileNm = req.getParameter("fileNm");
		OutputStream out = null;
		try {
			String path = "E:/jiianiii/study/workspace/Project/src/main/webapp/resources/upload/";
			File dir = new File(path);

			if (!dir.exists()) {
				dir.mkdirs();
			}

			String f_nm[] = fileNm.split("/"); // /result/ 지우기
			System.out.println("test :   " + f_nm[2]);
			// fileNm = fileNm.S

			File file = new File(path + "/" + f_nm[2] + ".png");
			out = new FileOutputStream(file);
			byte[] byteDat = Base64Utils.decodeFromString(imgData.replace("data:image/png;base64,", ""));
			out.write(byteDat);

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				out.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	public FileStatus[] getStatus(String newPath) throws IOException {
		URI uri = URI.create(newPath);
		Path path = new Path(uri);
		FileSystem file = FileSystem.get(uri, conf);
		return file.listStatus(path);
	}

	public void getDir(String newPath) throws IOException {
		FileStatus[] dirList = getStatus(newPath);
		for (int i = 0; i < dirList.length; i++) {
			String name = dirList[i].getPath().getName();
			if (dirList[i].isDirectory()) {
				getDir(newPath + "/" + name);
			} else {
				resultMap = new HashMap<String, Object>();
				resultMap.put(name, newPath + "/" + name);
				resultList.add(resultMap);
			}
		}

	}
}
