import type { CallbackStorage, FetchTokenResponse,
	KeycloakAdapter,
	KeycloakJSON,
	KeycloakLoginOptions,
	KeycloakLogoutOptions,
	KeycloakProfile,
	KeycloakRegisterOptions,
	OIDCProviderConfig
} from '@react-keycloak/keycloak-ts';

// Wrap everything inside ReactNativeKeycloakProvider
class MyCustomAdapter implements KeycloakAdapter {
    createCallbackStorage(): CallbackStorage {
        throw new Error('Method not implemented.');
    }
    login(options?: KeycloakLoginOptions): Promise<void> {
        throw new Error('Method not implemented.');
    }
    logout(options?: KeycloakLogoutOptions): Promise<void> {
        throw new Error('Method not implemented.');
    }
    register(options?: KeycloakRegisterOptions): Promise<void> {
        throw new Error('Method not implemented.');
    }
    accountManagement(): Promise<void> {
        throw new Error('Method not implemented.');
    }
    fetchKeycloakConfigJSON(configUrl: string): Promise<KeycloakJSON> {
        throw new Error('Method not implemented.');
    }
    fetchOIDCProviderConfigJSON(configUrl: string): Promise<OIDCProviderConfig> {
        throw new Error('Method not implemented.');
    }
    fetchTokens(tokenUrl: string, params: string): Promise<FetchTokenResponse> {
        throw new Error('Method not implemented.');
    }
    refreshTokens(tokenUrl: string, params: string): Promise<FetchTokenResponse> {
        throw new Error('Method not implemented.');
    }
    fetchUserProfile(profileUrl: string, token: string): Promise<KeycloakProfile> {
        throw new Error('Method not implemented.');
    }
    fetchUserInfo(userInfoUrl: string, token: string): Promise<unknown> {
        throw new Error('Method not implemented.');
    }
    redirectUri(options?: { redirectUri?: string | undefined; }, encodeHash?: boolean): string {
        throw new Error('Method not implemented.');
    }

};

export default MyCustomAdapter;
