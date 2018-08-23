package com.java.web.anaylsis;

import java.io.IOException;

import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;

import com.java.web.HomeController;

public class MapperAge extends org.apache.hadoop.mapreduce.Mapper<LongWritable, Text, Text, IntWritable>{
	
	@Override
	protected void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {
		BikeBean bb = new BikeBean(value);
		Text outputKey = new Text();
		IntWritable outputValue = new IntWritable();	//
		
		//ouputkey -> 해당 되는 값들이 키가 된다
		outputKey.set(bb.getRentalDate() +" , " + bb.getAge());//날짜 , 나이 
		
		
		// 1번 -> 연령대별 , 이동건수 		 * 2번 -> 연령대별 , 이용시간
		try {
			if(HomeController.check == 1) {
				if( bb.getUseCount()>0) {				
					outputValue.set(bb.getUseCount());
				}

			} else if (HomeController.check == 2) {	
				if(bb.getTime()>0) {				
					outputValue.set(bb.getTime());

				}
			} else {
				System.out.println( "check : " + HomeController.check);
			}
			
			context.write(outputKey, outputValue);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
	}
}