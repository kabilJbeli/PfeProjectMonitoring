package com.pfe.projectMonitoringBE.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pfe.projectMonitoringBE.entities.Category;
import com.pfe.projectMonitoringBE.repositories.CategoryRepository;

@Service
public class CategoryService {

	@Autowired
	private CategoryRepository repository;

	public void createOrUpdateCategory(Category category) {
		repository.save(category);
	}

	public Category findCategory(int idCategory) {
		return repository.findById(idCategory).get();
	}

	public List<Category> getAllCategory() {
		return repository.findAll();
	}

	public void deleteCategory(Category category) {
		repository.delete(category);
	}
}
