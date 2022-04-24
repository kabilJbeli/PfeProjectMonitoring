# PfeProjectMonitoring

PfeProjectMonitoring is a mobile project monitoring solution that provides the possibility of generating reports and KPIs regarding the project, There's 4 different roles in the application(Administrator,Client,Manager,Employee), the application is developer Spring Boot/Java EE for the backend, React native for the front end with the use of Keycloak 16 for user management and security

## Installation FrontEnd

Use the package manager [yarn] to install all the dependencies.

```bash
yarn install
```

## Installation BackEnd

Use the package manager [maven] to install all the dependencies.

```bash
mvn clean install
```


## How to start The application

### Keycloak
Open the keycloak/bin folder and launch the command below through the terminal

```bash
standalone.bat
```

### BackEnd
You need to start the backend application before starting to test the application


### FrontEnd
After installing all the dependencies open the project through the terminal and launch the command below for testing the application on an android emulator.

You must have the android studio pre-configured to be able to test the application on an emulator.

```bash
yarn android
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)