package com.pfe.projectMonitoringBE.controllers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.ws.rs.core.Response;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.ClientRepresentation;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value = "/keycloak")
public class KeycloakController {
	@Autowired
	private Environment env;

	private Keycloak getKeycloakInstance() {

		return Keycloak.getInstance(env.getProperty("keycloak.auth-server-url"), env.getProperty("keycloak.realm"),
				"helpdesk", "admin", "projectMonitoringFE");
	}

	@PostMapping("/user")
	public ResponseEntity<String> createUser(@RequestParam String username, @RequestParam String email,
			@RequestParam String firstname, @RequestParam String lastname, @RequestParam String password,
			@RequestParam Boolean ismanager) {
		if (StringUtils.isEmpty(username) || StringUtils.isEmpty(password) || StringUtils.isEmpty(email)) {
			return ResponseEntity.badRequest().body("Empty username or password");
		}

		CredentialRepresentation credentials = new CredentialRepresentation();
		credentials.setType(CredentialRepresentation.PASSWORD);
		credentials.setValue(password);
		credentials.setTemporary(false);
		UserRepresentation userRepresentation = new UserRepresentation();
		userRepresentation.setUsername(username);
		userRepresentation.setEmail(username);
		userRepresentation.setFirstName(firstname);
		userRepresentation.setLastName(lastname);
		userRepresentation.setEnabled(true);
		userRepresentation.setCredentials(Arrays.asList(credentials));
		userRepresentation.setEmailVerified(false);
		if (ismanager) {
			List<String> roles = new ArrayList<String>();
			roles.add("front-manager");
			Map<String, List<String>> clientRoles = new HashMap<>();
			clientRoles.put("federateur", roles);
			userRepresentation.setClientRoles(clientRoles);
		}

		Map<String, List<String>> attributes = new HashMap<>();
		userRepresentation.setAttributes(attributes);
		Keycloak keycloak = getKeycloakInstance();
		Response result = keycloak.realm(env.getProperty("keycloak.realm")).users().create(userRepresentation);
		return new ResponseEntity<>(HttpStatus.valueOf(result.getStatus()));
	}

	@GetMapping("/users")
	public List<UserRepresentation> getUsers() {
		Keycloak keycloak = getKeycloakInstance();
		List<UserRepresentation> userRepresentations = keycloak.realm(env.getProperty("keycloak.realm")).users().list();
		return userRepresentations;
	}

	@PutMapping("/user")
	public ResponseEntity<UserRepresentation> updateUserDescriptionAttribute(@RequestParam String username,
			@RequestParam String firstname, @RequestParam String lastname, @RequestParam String password
			) {
		Keycloak keycloak = getKeycloakInstance();
		Optional<UserRepresentation> user = keycloak.realm(env.getProperty("keycloak.realm")).users().search(username)
				.stream().filter(u -> u.getUsername().equals(username)).findFirst();
		if (user.isPresent()) {
			UserRepresentation userRepresentation = user.get();
			UserResource userResource = keycloak.realm(env.getProperty("keycloak.realm")).users()
					.get(userRepresentation.getId());
			userRepresentation.setFirstName(firstname);
			userRepresentation.setLastName(lastname);
			userRepresentation.setEmail(username);
			/*CredentialRepresentation credentials = new CredentialRepresentation();
			credentials.setType(CredentialRepresentation.PASSWORD);
			credentials.setValue(password);
			credentials.setTemporary(false);*/
			userResource.update(userRepresentation);
			return ResponseEntity.ok().body(userRepresentation);
		} else {
			return ResponseEntity.badRequest().build();
		}
	}

	@DeleteMapping("/user")
	public void deleteUser(@RequestParam String username) {
		Keycloak keycloak = getKeycloakInstance();
		UsersResource users = keycloak.realm(env.getProperty("keycloak.realm")).users();
		users.search(username).stream()
				.forEach(user -> keycloak.realm(env.getProperty("keycloak.realm")).users().delete(user.getId()));
	}

	@GetMapping("/roles")
	public ResponseEntity<List<RoleRepresentation>> getRoles() {
		Keycloak keycloak = getKeycloakInstance();
		ClientRepresentation clientRepresentation = keycloak.realm(env.getProperty("keycloak.realm")).clients()
				.findByClientId(env.getProperty("keycloak.resource")).get(0);
		List<RoleRepresentation> roles = keycloak.realm(env.getProperty("keycloak.realm")).clients()
				.get(clientRepresentation.getId()).roles().list();
		return ResponseEntity.ok(roles);
	}

	@GetMapping("/roles-by-user")
	public ResponseEntity<List<RoleRepresentation>> getRolesByUser(@RequestParam String username) {
		Keycloak keycloak = getKeycloakInstance();
		Optional<UserRepresentation> user = keycloak.realm(env.getProperty("keycloak.realm")).users().search(username)
				.stream().filter(u -> u.getUsername().equals(username)).findFirst();
		if (user.isPresent()) {
			UserRepresentation userRepresentation = user.get();
			UserResource userResource = keycloak.realm(env.getProperty("keycloak.realm")).users()
					.get(userRepresentation.getId());
			ClientRepresentation clientRepresentation = keycloak.realm(env.getProperty("keycloak.realm")).clients()
					.findByClientId(env.getProperty("keycloak.resource")).get(0);
			List<RoleRepresentation> roles = userResource.roles().clientLevel(clientRepresentation.getId()).listAll();
			return ResponseEntity.ok(roles);
		} else {
			return ResponseEntity.badRequest().build();
		}
	}
	

}