package com.pfe.projectMonitoringBE.models;

public class Email {
	private String title;
	private String message;

	public Email() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Email(String title, String message) {
		super();
		this.title = title;
		this.message = message;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
