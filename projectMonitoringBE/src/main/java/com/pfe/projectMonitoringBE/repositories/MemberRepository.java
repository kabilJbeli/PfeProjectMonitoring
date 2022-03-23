package com.pfe.projectMonitoringBE.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.pfe.projectMonitoringBE.Enums.Roles;
import com.pfe.projectMonitoringBE.entities.Member;

@Repository
public interface MemberRepository  extends JpaRepository<Member, Integer> {
	
	public List<Member> findByRole(Roles role);
	public Member findBykeycloakId(String keycloakId);

}
