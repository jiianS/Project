package com.java.web.anaylsis;

import java.io.IOException;

import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;

public class MapperMap extends org.apache.hadoop.mapreduce.Mapper<LongWritable, Text, Text, IntWritable> {

	@Override
	protected void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {
		BikeBean bb = new BikeBean(value);
		Text outputKey = new Text();
		IntWritable outputValue = new IntWritable();
		outputKey.set(AnaylsisController.rentID + " : " + bb.getDateMap());
		try {
			if (bb.getUseCount() > 0) {
				outputValue.set(bb.getUseCount());
				context.write(outputKey, outputValue);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
