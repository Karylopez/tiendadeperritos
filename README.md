# Tienda de Perritos - Despliegue DevOps 🐶

Este repositorio contiene la aplicación de "Tienda de Perritos" dockerizada y su flujo de despliegue automatizado hacia AWS.

## Arquitectura
* **Frontend:** Nginx (Alpine unprivileged) sirviendo HTML/JS.
* **Backend:** Node.js (Alpine) conectado a la base de datos.
* **Base de Datos:** MySQL 8.0 con persistencia de datos (Named Volumes).

## Despliegue CI/CD
El despliegue está automatizado con **GitHub Actions**. Al hacer un push a la rama `deploy`:
1. Se construyen las imágenes multi-stage.
2. Se suben a repositorios privados en **AWS ECR**.
3. Se conectan a una instancia **AWS EC2** por SSH.
4. Se levantan los servicios usando `docker-compose`.

## Instrucciones para ejecutar localmente
1. Clonar el repositorio.
2. Ejecutar `docker compose up --build -d`.
3. Acceder a `http://localhost` en el navegador.