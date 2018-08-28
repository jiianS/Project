package com.java.web.anaylsis;

import java.io.IOException;

import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;

public class MapperAge extends org.apache.hadoop.mapreduce.Mapper<LongWritable, Text, Text, IntWritable> {

	@Override
	protected void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {
		BikeBean bb = new BikeBean(value);
		Text outputKey = new Text();
		IntWritable outputValue = new IntWritable(); //

		// ouputkey -> 해당 되는 값들이 키값!!
		outputKey.set(bb.getRentalDate() + "_" + bb.getAge());// 날짜 , 나이

		// [해당연월_연령대별] 1.이용건수 2.이동거리 3.이동시간

		try {
			if (AnaylsisController.check == 1) {
				if (bb.getUseCount() > 0) {
					outputValue.set(bb.getUseCount());
				}
			} else if (AnaylsisController.check == 2) {
				if (bb.getDistance() > 0) {
					outputValue.set(bb.getDistance());
				}
			} else if (AnaylsisController.check == 3) {
				if (bb.getTime() > 0) {
					outputValue.set(bb.getTime());

				}
			} else {
				System.out.println("check : " + AnaylsisController.check);
			}
			
			context.write(outputKey, outputValue);
			
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}