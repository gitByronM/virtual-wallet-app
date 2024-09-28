# Proyecto Billetera Virtual - Prueba Técnica ePayco

Este repositorio presenta la solución a la prueba técnica solicitada por **ePayco** para el puesto de **Desarrollador Fullstack**. El objetivo de este proyecto es simular una **billetera virtual** con funcionalidades básicas de registro, recarga de saldo, pago y confirmación, implementando dos servicios REST y un frontend.

## Configuración y Montaje

**Nota**:
Si se tiene alguna duda sobre el proceso de configuración y montaje se puede escribir al siguiente correo: **byronmiranda0401@gmail.com**

Este proyecto incluye un archivo `docker-compose.yml` que facilita la ejecución de los servicios backend (service-rest1 y bff) y el frontend (client) en contenedores Docker. 

Para montar el proyecto, sigue estos pasos:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/gitByronM/virtual-wallet-app.git
   cd virtual-wallet-app


2. Ejecuta Docker Compose para levantar los servicios:
    ```bash
    docker-compose up --build
    ```

   > **Nota importante**: 
   > Durante el proceso de construcción de las imágenes con `docker-compose up --build`, es posible que la instalación de las dependencias falle en alguna de las aplicaciones (especialmente al construir las imágenes de `service-rest`, `bff` o `frontend`). 
   > Si esto ocurre, simplemente vuelve a ejecutar el comando `docker-compose up --build` hasta que las imágenes se construyan correctamente.

3. Accede al cliente web desde tu navegador **http://localhost:80** y prueba las funcionalidades de la billetera virtual.

## Como probar las APIs y verificar la base de datos

1. Primero verificamos que el contenedor este levantado y ejecutándose (ver Configuración y Montaje)

2. Para probar las APIs a traves de postman debes apuntar a **http://localhost:3000** (service-rest) y a **http://localhost:3001** (bff / service-rest2)

3. Si deseas verificar la información en la base de datos debes conectarte desde Mongo DB Compass a **mongodb://localhost:27018/walletdb**

## Documentación de las APIs

### Colección de Postman

Para probar las APIs del proyecto, hem incluido una colección documentada en **Postman** que cubre todos los endpoints, con ejemplos de solicitudes y respuestas para cada una de las funcionalidades.

#### Cómo importar la colección:

1. En la raíz del del repositorio, encontrarás el archivo **`collection.json`** que contiene la documentación completa de las APIs.
2. Abre **Postman** en tu máquina.
3. Haz clic en el botón **"Import"** en la esquina superior izquierda de la interfaz de Postman.
4. Selecciona la opción **"Upload Files"** y carga el archivo **`collection.json`** desde el repositorio.
5. Una vez cargada, la colección aparecerá en tu espacio de trabajo de Postman, donde podrás interactuar con todos los endpoints documentados.

### Endpoints incluidos:

- **Registro de Cliente**: Permite crear un nuevo cliente.
- **Recargar Billetera**: Permite recargar el saldo en la billetera de un cliente.
- **Realizar Pago**: Inicia un proceso de pago enviando un token de confirmación al correo del cliente.
- **Confirmar Pago**: Valida el token de pago, el id de sesión y confirma el pago realizado.
- **Consultar Saldo**: Recupera el saldo actual de la billetera del cliente.

### ¿Qué incluye la documentación de Postman?
- **Ejemplos de solicitudes**: Cada endpoint tiene ejemplos predefinidos de cómo deben enviarse los parámetros.
- **Respuestas esperadas**: Se han incluido ejemplos de respuestas para escenarios exitosos y de error.
- **Validaciones y errores comunes**: Cada endpoint incluye posibles respuestas de validación y mensajes de error para facilitar las pruebas.

### Nota importante:
Para ejecutar correctamente las solicitudes de Postman, asegúrate de que el proyecto esté corriendo en tu entorno local. Los endpoints deben estar configurados correctamente en el archivo `collection.json`.

## Estructura del Repositorio

El proyecto está organizado en tres carpetas principales, cada una con un propósito específico:

- **/client**: Contiene la implementación del frontend, el cual esta desarrollado en **React.js**. El frontend permite al usuario interactuar con la billetera virtual, permitiendo el registro, la recarga de saldo, la realización de pagos y la consulta del saldo.

- **/service-rest**: Este es el servicio backend que tiene acceso directo a la base de datos. Se encarga de procesar y almacenar los datos de los usuarios y sus billeteras. Las operaciones realizadas en este servicio incluyen el registro de clientes, recarga de billetera, pago y consulta de saldo.

- **/bff**: Este servicio es el segundo servicio rest y actúa como un **Backend for Frontend (BFF)**. Se encarga de ser el intermediario entre el frontend y el **service-rest**. El BFF es responsable de consumir el servicio de base de datos (service-rest) y entregar las respuestas adecuadas al frontend, transformando o adaptando los datos según sea necesario.

## Funcionalidad del Proyecto

La billetera virtual debe cumplir con las siguientes funcionalidades:

1. **Registro de Clientes**:
   - Permite registrar un cliente mediante los parámetros: Documento, Nombres, Email, y Celular.
   - El servicio valida que todos los campos sean requeridos y responde con un mensaje de éxito o fallo.

2. **Recarga de Billetera**:
   - Permite cargar dinero en la billetera utilizando el número de documento, celular y el valor a recargar.
   - El sistema responderá si la operación fue exitosa o no.

3. **Pago con Token de Confirmación**:
   - La billetera permite realizar compras si tiene saldo. Al hacer una compra, el sistema genera un **token de 6 dígitos** que se envía al email del usuario.
   - Para confirmar el pago, el usuario debe enviar el **ID de sesión** y el **token** recibido por correo.
   - Si el token es válido, el sistema descuenta el saldo de la billetera.

4. **Consulta de Saldo**:
   - El cliente puede consultar el saldo de su billetera proporcionando su documento y número de celular.