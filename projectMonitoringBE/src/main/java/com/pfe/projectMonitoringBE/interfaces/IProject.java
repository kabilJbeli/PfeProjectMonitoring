package com.pfe.projectMonitoringBE.interfaces;

import java.util.List;

import com.pfe.projectMonitoringBE.entities.Member;
import com.pfe.projectMonitoringBE.entities.Project;

public interface IProject {
	public void createOrUpdateProject(Project project);
	public Project findProject(int idProject);
	public List<Project> getAllProject();
	public void deleteProject(Project project);	
	public  List<Project> getManagerProjects(Member member);
	public  List<Project> findByMember(String email);	
	public  List<Project> findByClient(String email);	
	public List<Member> findProjectMembers(Integer id);
}
