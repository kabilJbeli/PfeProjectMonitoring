package com.pfe.projectMonitoringBE.interfaces;

public interface IEmail {
	   public void sendSimpleMessage(
			      String to, String subject, String text);
}
