package com.java.web.anaylsis;

import org.apache.hadoop.io.Text;

import com.java.web.HomeController;
import com.sun.org.apache.xalan.internal.xsltc.compiler.sym;

public class BikeBean {

	String rentalDate; // 대여일자
	String gender; // 성별
	String age; // 연령대

	int useCount = 0; // 이용횟수
	int time = 0; // 이동시간

	public BikeBean(Text value) {
		try {
			String[] col = value.toString().split(",");
			setRentalDate(HomeController.rentalDate);
			setGender(col[4]);
			setAge(col[5]);
			setUseCount(Integer.parseInt(col[6].equals("")?"0":col[6]));	// 이용횟수
			setTime(Integer.parseInt(col[10].equals("")?"0":col[10]));	// 이동시간
		} catch (Exception e) {
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
		if(null == gender || gender.equals("''") || gender.equals("")) {
			this.gender = "성별모름";
		}else {
			this.gender = gender;
		}
	}

	public String getAge() {
		return age;
	}

	public void setAge(String age) {
		if(null == age || age.equals("''") || age.equals("")) {
			this.age = "나이모름";
		}else {
			this.age = age;
		}
	}

	
	public int getUseCount() {
		return useCount;
	}

	public void setUseCount(int useCount) {
		this.useCount = useCount;
	}

	public int getTime() {
		return time;
	}

	public void setTime(int time) {
		this.time = time;
	}

	@Override
	public String toString() {
		return "BikeBean [rentalDate=" + rentalDate + ", gender=" + gender + ", age=" + age + ", useCount=" + useCount
				+ ", time=" + time + "]";
	}
	
	

}
