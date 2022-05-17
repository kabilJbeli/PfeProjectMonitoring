import { RNKeycloak } from '@react-keycloak/native';
import Environment from "./Environment";

// Setup Keycloak instance as needed
// Pass initialization options as required
const keycloak = new RNKeycloak({
	url: `${Environment.KEYCLOAK_URL}/auth`,
	realm: 'projectMonitoring',
	clientId: 'projectMonitoringFE',
});

keycloak.init({
	onLoad: 'check-sso',
	checkLoginIframe: true,
	checkLoginIframeInterval: 1,
	enableLogging:true
});

export default keycloak;
