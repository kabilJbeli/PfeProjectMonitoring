package com.pfe.projectMonitoringBE.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.pfe.projectMonitoringBE.entities.Task;
import com.pfe.projectMonitoringBE.entities.TaskComment;

public interface TaskCommentRepository  extends JpaRepository<TaskComment, Integer>{
	@Query("SELECT  t FROM TaskComment t WHERE t.task=  ?1")	
    public List<TaskComment> getCommentByTask(Task task);
}
