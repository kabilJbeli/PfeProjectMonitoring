package com.pfe.projectMonitoringBE.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pfe.projectMonitoringBE.entities.File;


public interface FileRepository   extends JpaRepository<File, Integer>{

}
