package com.pfe.projectMonitoringBE.models;

import com.pfe.projectMonitoringBE.entities.Member;

public class SelectProjectMembers {
private String label;
private Member member;

public String getLabel() {
	return label;
}
public void setLabel(String label) {
	this.label = label;
}
public Member getMember() {
	return member;
}
public void setMember(Member members) {
	this.member = members;
}


}
