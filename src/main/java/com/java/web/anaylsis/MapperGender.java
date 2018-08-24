package com.java.web.anaylsis;

import java.io.IOException;

import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;


public class MapperGender extends org.apache.hadoop.mapreduce.Mapper<LongWritable, Text, Text, IntWritable>{
	
	@Override
	protected void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException{
		BikeBean bb = new BikeBean(value);
		Text outputKey = new Text();
		IntWritable outputValue = new IntWritable();
		
		//KEY SETTING
		outputKey.set(bb.getRentalDate()+ " , " +bb.getGender());

		// [해당연월_성별] 5.이용건수  6.운동량  7.이동거리  8.이동시간
		try {
			if(AnaylsisController.check == 4) {
				if( bb.getUseCount()>0) {				
					outputValue.set(bb.getUseCount());
				}

			} else if (AnaylsisController.check == 5) {	
				
				if(bb.getDistance()>0) {				
					outputValue.set(bb.getDistance());
				}
			} else if (AnaylsisController.check == 6) {	
				if(bb.getTime()>0) {				
					outputValue.set(bb.getTime());
				}
			} else {
				System.out.println( "check : " + AnaylsisController.check);
			}
			
			context.write(outputKey, outputValue);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}