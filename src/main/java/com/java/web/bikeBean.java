package com.java.web;

import org.apache.hadoop.io.Text;

public class bikeBean {
	
	String rentalDate;	//대여일자
	String gender;		//성별
	String age;			//연령대
	
	int distance;		// 이동거리
	int time;			// 이동시간
	
	public bikeBean(Text value) {
		try {
//			HomeController.check;
//			String[] colm = value.toString().split(",");
//			setrentalDate(colm[0]==null?"":colm[8]);
//			setArrDelay(Integer.parseInt(colm[14].equals("NA")?"0":colm[14]));
//			setDepDelay(Integer.parseInt(colm[15].equals("NA")?"0":colm[15]));
		}catch(Exception e) {
			e.printStackTrace();
		}
	}

	public String getRentalDate() {
		return rentalDate;
	}

	public void setRentalDate(String rentalDate) {
		this.rentalDate = rentalDate;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getAge() {
		return age;
	}

	public void setAge(String age) {
		this.age = age;
	}

	public int getDistance() {
		return distance;
	}

	public void setDistance(int distance) {
		this.distance = distance;
	}

	public int getTime() {
		return time;
	}

	public void setTime(int time) {
		this.time = time;
	}
	
	
}
