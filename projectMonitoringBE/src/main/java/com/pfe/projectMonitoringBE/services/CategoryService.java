package com.pfe.projectMonitoringBE.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pfe.projectMonitoringBE.entities.Category;
import com.pfe.projectMonitoringBE.interfaces.ICategory;
import com.pfe.projectMonitoringBE.repositories.CategoryRepository;

@Service
public class CategoryService implements ICategory {

	@Autowired
	private CategoryRepository repository;

	@Override
	public void createOrUpdateCategory(Category category) {
		repository.save(category);
	}

	@Override
	public Category findCategory(int idCategory) {
		return repository.findById(idCategory).get();
	}

	@Override
	public List<Category> getAllCategory() {
		return repository.findAll();
	}

	@Override
	public void deleteCategory(Category category) {
		repository.delete(category);
	}
}
