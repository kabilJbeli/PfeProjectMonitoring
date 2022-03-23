import { RNKeycloak } from '@react-keycloak/native';
import {reactNativeKeycloakContext} from "@react-keycloak/native/lib/typescript/src/context";
import MyCustomAdapter from "./adapter";

// Setup Keycloak instance as needed
// Pass initialization options as required
const keycloak = new RNKeycloak({
	url: 'http://10.0.2.2:8080/auth',
	realm: 'projectMonitoring',
	clientId: 'projectMonitoringFE',
});

export default keycloak;
