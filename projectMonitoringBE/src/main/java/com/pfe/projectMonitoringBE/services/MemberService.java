package com.pfe.projectMonitoringBE.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pfe.projectMonitoringBE.Enums.Roles;
import com.pfe.projectMonitoringBE.entities.Category;
import com.pfe.projectMonitoringBE.entities.Member;
import com.pfe.projectMonitoringBE.repositories.MemberRepository;

@Service
public class MemberService {

	@Autowired
	private MemberRepository repository;

	public void createOrUpdateMember(Member member) {
		repository.save(member);
	}

	public Member findMember(int idMember) {
		return repository.findById(idMember).get();
	}

	public List<Member> getAllMember() {
		return repository.findAll();
	}

	public void deleteMember(Member member) {
		repository.delete(member);
	}
	
	public Member findByKeycloakId(String keycloakId){
	return repository.findBykeycloakId(keycloakId);
}
	
	public List<Member> findmanagers() {
		return repository.findByRole(Roles.MANAGER);
	}
}
