package com.pfe.projectMonitoringBE.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pfe.projectMonitoringBE.Enums.Roles;
import com.pfe.projectMonitoringBE.entities.Member;
import com.pfe.projectMonitoringBE.interfaces.IMember;
import com.pfe.projectMonitoringBE.repositories.MemberRepository;

@Service
public class MemberService implements IMember {

	@Autowired
	private MemberRepository repository;

	@Override
	public void createOrUpdateMember(Member member) {
		repository.save(member);
	}

	@Override
	public Member findMember(int idMember) {
		return repository.findById(idMember).get();
	}

	@Override
	public List<Member> getAllMember() {
		return repository.findAll();
	}

	@Override
	public void deleteMember(Member member) {
		repository.delete(member);
	}

	@Override
	public Member findByKeycloakId(String keycloakId) {
		return repository.findBykeycloakId(keycloakId);
	}

	@Override
	public Member findByMemberByEmail(String email) {
		return repository.findByEmail(email);
	}

	@Override
	public List<Member> findmanagers() {
		return repository.findByRole(Roles.MANAGER);
	}

	@Override
	public List<Member> findByRole(Roles role) {
		return repository.findByRole(role);
	}
}
