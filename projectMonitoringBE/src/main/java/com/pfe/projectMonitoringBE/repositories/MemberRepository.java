package com.pfe.projectMonitoringBE.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.pfe.projectMonitoringBE.Enums.Roles;
import com.pfe.projectMonitoringBE.entities.Member;

@Repository
public interface MemberRepository  extends JpaRepository<Member, Integer> {
	public Member findByNameAndPassword(String password, String username);
	
	@Query("select m from Member m where password = ?1 and name = ?2")
	public Member findMember (String password, String username);
	public List<Member> findByRole(Roles role);

}
