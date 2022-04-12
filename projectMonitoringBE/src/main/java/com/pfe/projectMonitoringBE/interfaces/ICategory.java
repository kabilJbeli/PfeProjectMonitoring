package com.pfe.projectMonitoringBE.interfaces;

import java.util.List;

import com.pfe.projectMonitoringBE.entities.Category;

public interface ICategory {
	public void createOrUpdateCategory(Category category);
	public Category findCategory(int idCategory);
	public List<Category> getAllCategory();
	public void deleteCategory(Category category);
}
