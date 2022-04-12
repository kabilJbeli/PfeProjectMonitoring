package com.pfe.projectMonitoringBE.interfaces;

import java.util.List;

import com.pfe.projectMonitoringBE.Enums.Roles;
import com.pfe.projectMonitoringBE.entities.Member;

public interface IMember {
	public void createOrUpdateMember(Member member);
	public Member findMember(int idMember);
	public List<Member> getAllMember();
	public void deleteMember(Member member);	
	public Member findByKeycloakId(String keycloakId);	
	public Member findByMemberByEmail(String email);
	public List<Member> findmanagers();	
	public List<Member> findByRole(Roles role);
}
