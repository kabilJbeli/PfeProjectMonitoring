package com.pfe.projectMonitoringBE.entities;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.pfe.projectMonitoringBE.Enums.Roles;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer" })
public class Member implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7781235773520852122L;

	private Integer memberID;

	private Set<Task> tasks;

	private Set<Project> Projects;

	private Roles role;

	private String name;
	
	private String lastName;
	
	private String email;
	
	private Integer Telephone;
	
	private String Address;	
	
	private String Password;	

	
	
	@Column(name = "PASSWORD")
	public String getPassword() {
		return Password;
	}

	public void setPassword(String password) {
		Password = password;
	}

	@Column(name = "NAME")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	@Column(name = "LASTNAME")
	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	@Column(name = "EMAIL")
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Column(name = "TELEPHONE")
	public Integer getTelephone() {
		return Telephone;
	}

	public void setTelephone(Integer telephone) {
		Telephone = telephone;
	}
	
	@Column(name = "ADDRESS")
	public String getAddress() {
		return Address;
	}

	
	public void setAddress(String address) {
		Address = address;
	}

	public Roles getRole() {
		return role;
	}

	public void setRole(Roles role) {
		this.role = role;
	}

	@OneToMany(mappedBy = "members")
	public Set<Project> getProjects() {
		return Projects;
	}

	public void setProjects(Set<Project> projects) {
		Projects = projects;
	}

	@OneToMany(mappedBy="member")
	public Set<Task> getTasks() {
		return tasks;
	}

	public void setTasks(Set<Task> tasks) {
		this.tasks = tasks;
	}

	@Id
	@Column(name = "MEMBERID")
	@GeneratedValue(strategy = GenerationType.AUTO)
	public Integer getMemberID() {
		return memberID;
	}

	public void setMemberID(Integer memberID) {
		this.memberID = memberID;
	}

}
