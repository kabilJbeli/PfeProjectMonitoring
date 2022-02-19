package com.pfe.projectMonitoringBE.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pfe.projectMonitoringBE.entities.Member;


public interface MemberRepository  extends JpaRepository<Member, Integer> {

}
