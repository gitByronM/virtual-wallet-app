# Proyecto Billetera Virtual - Prueba Técnica ePayco

Este repositorio presenta la solución a la prueba técnica solicitada por **ePayco** para el puesto de **Desarrollador Fullstack**. El objetivo de este proyecto es simular una **billetera virtual** con funcionalidades básicas de registro, recarga de saldo, pago y confirmación, implementando dos servicios REST y un frontend.

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

## Configuración y Montaje

Este proyecto incluye un archivo `docker-compose.yml` que facilita la ejecución de los servicios backend (service-rest1 y bff) y el frontend (client) en contenedores Docker. 

Para montar el proyecto, sigue estos pasos:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/proyecto-billetera-virtual.git
   cd proyecto-billetera-virtual
