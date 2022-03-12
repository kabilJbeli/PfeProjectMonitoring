package com.pfe.projectMonitoringBE.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.pfe.projectMonitoringBE.entities.Member;

@Repository
public interface MemberRepository  extends JpaRepository<Member, Integer> {
	public Member findByNameAndPassword(String username, String password);
	
	@Query("select m from Member m where Password = ?1 and Name = ?2")
	public Member findMember (String password, String username);

}
