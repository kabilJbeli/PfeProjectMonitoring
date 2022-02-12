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

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer" })
public class SprintStatus implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1486996591796972767L;

	@Column(name = "SprintStatusID")
	private Integer sprintStatusID;
	
	@Column(name = "SPRINTTYPETITLE")
	private Integer sprintStatusTitle;

	
	
	private Set<Sprint> sprint;
	
	
	@OneToMany(mappedBy = "status")
	public Set<Sprint> getSprint() {
		return sprint;
	}

	public void setSprint(Set<Sprint> sprint) {
		this.sprint = sprint;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public Integer getSprintStatusID() {
		return sprintStatusID;
	}

	public void setSprintStatusID(Integer sprintStatusID) {
		this.sprintStatusID = sprintStatusID;
	}

	public Integer getSprintStatusTitle() {
		return sprintStatusTitle;
	}

	public void setSprintStatusTitle(Integer sprintStatusTitle) {
		this.sprintStatusTitle = sprintStatusTitle;
	}
	
	
}
