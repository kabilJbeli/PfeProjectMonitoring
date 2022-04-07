package com.pfe.projectMonitoringBE.controllers;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pfe.projectMonitoringBE.Enums.Roles;
import com.pfe.projectMonitoringBE.entities.Member;
import com.pfe.projectMonitoringBE.services.MemberService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value = "/member")
public class MemberController {

	@Autowired
	private MemberService service;

	@GetMapping("/all")
	public List<Member> getAll() {
		return service.getAllMember();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Member> getMemberById(@PathVariable Integer id) {
		try {
			Member member = service.findMember(id);
			return new ResponseEntity<Member>(member, HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<Member>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/add")
	public void addMember(@RequestBody Member member) {
		service.createOrUpdateMember(member);
	}

	@PutMapping("/update/{id}")
	public void updateMember(@RequestBody Member member) {
		try {
			Member searchedMember = service.findMember(member.getMemberID());
			if (searchedMember.getMemberID() != null) {
				service.createOrUpdateMember(member);
			}
		} catch (NoSuchElementException e) {

		}
	}

	@DeleteMapping("/delete/{id}")
	public void deleteMember(@PathVariable Integer id) {
		try {
			Member searchedMember = service.findMember(id);
			if (searchedMember.getMemberID() != null) {
				service.deleteMember(searchedMember);
			}
		} catch (NoSuchElementException e) {

		}
	}
	
	@GetMapping("/getMemberByEmail")
	public Member findMemberByEmail(@RequestParam String email) {
		return service.findByMemberByEmail(email);
	}
	

	@GetMapping("/getMemberByRole")
	public List<Member> findMemberByRole(@RequestParam Roles role) {
		return service.findByRole(role);
	}
	
	@GetMapping("/getProjectManagers")
	public List<Member> findManagers() {
		return service.findmanagers();
	}
}
