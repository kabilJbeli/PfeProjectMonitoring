package com.pfe.projectMonitoringBE.entities;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
	
	private Project managedproject;

	private Roles role;

	private String name;
	
	private String lastName;
	
	private String email;
	
	private Integer Telephone;
	
	private String Address;	
	
	private String keyclokId;	

	
	
	public Member() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "Member [memberID=" + memberID + ", tasks=" + tasks + ", Projects=" + Projects + ", managedproject="
				+ managedproject + ", role=" + role + ", name=" + name + ", lastName=" + lastName + ", email=" + email
				+ ", Telephone=" + Telephone + ", Address=" + Address + ", keyclokId=" + keyclokId + "]";
	}

	public Member(Integer memberID, Set<Task> tasks, Set<Project> projects, Project managedproject, Roles role,
			String name, String lastName, String email, Integer telephone, String address, String keyclokId) {
		super();
		this.memberID = memberID;
		this.tasks = tasks;
		Projects = projects;
		this.managedproject = managedproject;
		this.role = role;
		this.name = name;
		this.lastName = lastName;
		this.email = email;
		this.Telephone = telephone;
		this.Address = address;
		this.keyclokId = keyclokId;
	}

	@Column(name = "KEYCLOAKID",unique=true)
	public String getKeycloakId() {
		return keyclokId;
	}

	public void setKeycloakId(String keyclokId) {
		this.keyclokId = keyclokId;
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

	@Column(name = "EMAIL",unique=true)
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

	@ManyToMany(mappedBy = "members")
	@JsonIgnore
	public Set<Project> getProjects() {
		return Projects;
	}

	public void setProjects(Set<Project> projects) {
		Projects = projects;
	}

	@OneToMany(mappedBy="member")
	@JsonIgnore
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

	@OneToOne(mappedBy = "projectManager")
	@JsonIgnore
	public Project getManagedproject() {
		return managedproject;
	}

	public void setManagedproject(Project managedproject) {
		this.managedproject = managedproject;
	}
	
	

}
