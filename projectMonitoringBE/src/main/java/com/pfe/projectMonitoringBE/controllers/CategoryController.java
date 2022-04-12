package com.pfe.projectMonitoringBE.controllers;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pfe.projectMonitoringBE.entities.Category;
import com.pfe.projectMonitoringBE.interfaces.ICategory;
import com.pfe.projectMonitoringBE.services.CategoryService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value = "/category")
public class CategoryController {

	@Autowired
	private ICategory service;

	@GetMapping("/all")
	public List<Category> getAll() {
		return service.getAllCategory();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Category> getCategoryById(@PathVariable Integer id) {
		try {
			Category category = service.findCategory(id);
			return new ResponseEntity<Category>(category, HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<Category>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/add")
	public void addMajor(@RequestBody Category category) {
		service.createOrUpdateCategory(category);
	}

	@PutMapping("/update/{id}")
	public void updateCategory(@RequestBody Category category) {
		try {
			Category searchedCategory = service.findCategory(category.getCategoryID());
			if (searchedCategory.getCategoryID() != null) {
				service.createOrUpdateCategory(category);
			}
		} catch (NoSuchElementException e) {

		}
	}

	@DeleteMapping("/delete/{id}")
	public void deleteCategory(@PathVariable Integer id) {
		try {
			Category searchedCategory = service.findCategory(id);
			if (searchedCategory.getCategoryID() != null) {
				service.deleteCategory(searchedCategory);
			}
		} catch (NoSuchElementException e) {

		}
	}
}
