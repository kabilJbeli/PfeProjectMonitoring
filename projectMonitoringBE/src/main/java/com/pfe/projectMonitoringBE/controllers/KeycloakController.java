package com.pfe.projectMonitoringBE.controllers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ws.rs.NotFoundException;
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

import com.pfe.projectMonitoringBE.Enums.Roles;
import com.pfe.projectMonitoringBE.entities.Member;
import com.pfe.projectMonitoringBE.interfaces.IMember;
import com.pfe.projectMonitoringBE.services.MemberService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value = "/keycloak")
public class KeycloakController {
	@Autowired
	private Environment env;

	@Autowired
	private IMember memberService;

	private Keycloak getKeycloakInstance() {

		return Keycloak.getInstance(env.getProperty("keycloak.auth-server-url"), env.getProperty("keycloak.realm"),
				"helpdesk", "admin", "projectMonitoringFE");
	}

	@PostMapping("/user")
	public ResponseEntity<String> createUser(@RequestParam String username, @RequestParam String email,
			@RequestParam String firstname, @RequestParam String lastname, @RequestParam String password,
			@RequestParam Roles role, @RequestParam String address, @RequestParam String telephone) {
		if (StringUtils.isEmpty(username) || StringUtils.isEmpty(password) || StringUtils.isEmpty(email)) {
			return ResponseEntity.badRequest().body("Empty username or password");
		}

		CredentialRepresentation credentials = new CredentialRepresentation();
		credentials.setType(CredentialRepresentation.PASSWORD);
		credentials.setValue(password);
		credentials.setTemporary(false);
		UserRepresentation userRepresentation = new UserRepresentation();
		userRepresentation.setUsername(email);
		userRepresentation.setEmail(email);
		userRepresentation.setFirstName(firstname);
		userRepresentation.setLastName(lastname);
		userRepresentation.setEnabled(true);
		userRepresentation.setCredentials(Arrays.asList(credentials));
		userRepresentation.setEmailVerified(false);

		Keycloak keycloak = getKeycloakInstance();

		Response result = keycloak.realm(env.getProperty("keycloak.realm")).users().create(userRepresentation);
		List<UserRepresentation> userRepresentations = keycloak.realm(env.getProperty("keycloak.realm")).users().list();

		int status = result.getStatus();
		
		if (status == 201 || status == 200 || status == 204) {
			UsersResource userResources = keycloak.realm(env.getProperty("keycloak.realm")).users();
			
			userResources.list().forEach(user -> {
				if(user.getEmail() != null && user.getEmail().equalsIgnoreCase(userRepresentation.getEmail())== true) {
					userRepresentation.setId(user.getId());
				}
				
			} );
			
			UserResource userResource = keycloak.realm(env.getProperty("keycloak.realm")).users()
					.get(userRepresentation.getId());

			Member member = new Member();
			try {
			UserRepresentation user = userResource.toRepresentation();
			member.setKeycloakId(user.getId());
			assignRoles(user.getId(), Arrays.asList(role.name()));
			userResource.sendVerifyEmail();
			member.setEmail(email);
			member.setName(firstname);
			member.setLastName(lastname);
			member.setRole(role);
			member.setTelephone(telephone);
			member.setAddress(address);
			memberService.createOrUpdateMember(member);
			}catch (NotFoundException e) {
				System.out.println(e);
		    }
		}
		
		return new ResponseEntity<>(HttpStatus.valueOf(result.getStatus()));
	}

	private void assignRoles(String userId, List<String> roles) {
		Keycloak keycloak = getKeycloakInstance();

		List<RoleRepresentation> roleList = rolesToRealmRoleRepresentation(roles);
		keycloak.realm(env.getProperty("keycloak.realm")).users().get(userId).roles().realmLevel().add(roleList);

	}

	private List<RoleRepresentation> rolesToRealmRoleRepresentation(List<String> roles) {
		Keycloak keycloak = getKeycloakInstance();

		List<RoleRepresentation> existingRoles = keycloak.realm(env.getProperty("keycloak.realm")).roles().list();

		List<String> serverRoles = existingRoles.stream().map(RoleRepresentation::getName).collect(Collectors.toList());
		List<RoleRepresentation> resultRoles = new ArrayList<>();

		for (String role : roles) {
			int index = serverRoles.indexOf(role);
			if (index != -1) {
				resultRoles.add(existingRoles.get(index));
			} else {
				System.out.println("Role does not exist");
			}
		}
		return resultRoles;
	}

	@GetMapping("/users")
	public List<UserRepresentation> getUsers() {
		Keycloak keycloak = getKeycloakInstance();
		List<UserRepresentation> userRepresentations = keycloak.realm(env.getProperty("keycloak.realm")).users().list();
		return userRepresentations;
	}

	@GetMapping("/updateUserInformation")
	public ResponseEntity<UserRepresentation> updateUserDescriptionAttribute(@RequestParam String username,
			@RequestParam String email, @RequestParam String firstname, @RequestParam String lastname,
			@RequestParam String password, @RequestParam Roles role, @RequestParam String address,
			@RequestParam String telephone) {
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
			List<UserRepresentation> userRepresentations = keycloak.realm(env.getProperty("keycloak.realm")).users()
					.list();

			Member member = new Member();
			for (UserRepresentation userInformation : userRepresentations) {
				if (userInformation.getEmail() != null && userInformation.getEmail().equalsIgnoreCase(email)) {
					member.setKeycloakId(userInformation.getId());
					assignRoles(userInformation.getId(), Arrays.asList(role.name()));
					break;
				}
			}
			member.setEmail(email);
			member.setName(firstname);
			member.setLastName(lastname);
			member.setRole(role);
			member.setTelephone(telephone);
			member.setAddress(address);
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

		users.search(username).stream().forEach(user -> {
			Response result = keycloak.realm(env.getProperty("keycloak.realm")).users().delete(user.getId());
			if (result.getStatus() == 201 || result.getStatus() == 200 || result.getStatus() == 204) {
				Member member = memberService.findByKeycloakId(user.getId());
				memberService.deleteMember(member);
			}

		});
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

			List<RoleRepresentation> roles = userResource.roles().realmLevel().listAll();
			return ResponseEntity.ok(roles);
		} else {
			return ResponseEntity.badRequest().build();
		}
	}

}