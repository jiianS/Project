package com.java.web.anaylsis;

import org.apache.hadoop.io.Text;

public class BikeBean {



	String dateMap; 	// 대여일자 (map page에서 사용할 것)
	String rentID;		// 대여소 id
	String gender;		// 성별   _col[4]
	String age; 		// 연령대 _col[5]
	
	int useCount = 0; 	// 이용건수_col[6]
	int distance = 0;	// 이동거리_col[9]
	int time = 0; 		// 이동시간_col[10]

	public BikeBean(Text value) {
		try {
			String[] col = value.toString().split(",");
			setRentalDate(AnaylsisController.rentalDate);
			setGender(col[4]);	
			setAge(col[5]);
			setUseCount(Integer.parseInt(col[6].equals("")?"0":col[6]));	// 이용건수
			setDistance(Integer.parseInt(col[9].equals("")?"0":col[9]));	// 이동거리			
			setTime(Integer.parseInt(col[10].equals("")?"0":col[10]));		// 이동시간
			
			/************************************************************************/
			setDateMap(col[0]);
			setRentID(rentID);
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

	String rentalDate; 	// 대여일자
	public String getDateMap() {
		return dateMap;
	}

	public void setDateMap(String dateMap) {
		this.dateMap = dateMap;
	}

	public String getRentID() {
		return rentID;
	}

	public void setRentID(String rentID) {
		this.rentID = rentID;
	}

	

}
