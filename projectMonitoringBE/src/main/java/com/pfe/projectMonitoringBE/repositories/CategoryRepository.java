package com.pfe.projectMonitoringBE.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pfe.projectMonitoringBE.entities.Category;


public interface CategoryRepository  extends JpaRepository<Category, Integer> {

}
