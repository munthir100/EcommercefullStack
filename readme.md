# Full-Stack Project with Docker

This project is a full-stack application using Laravel for the backend and Next.js for the frontend, containerized with Docker.

## Project Structure

- **Laravel**: Backend framework
- **Next.js**: Frontend framework
- **MySQL**: Database

## Prerequisites

- Docker
- Docker Compose

## Setup

1. **Clone the repository:**

    ```sh
    git clone https://github.com/yourusername/your-repo.git
    cd your-repo
    ```

2. **Build and run the containers:**

    To build and start the containers, you can use the following commands:

    ```sh
    make build
    make up
    ```

    Or directly use:

    ```sh
    make setup
    ```

3. **Access the application:**

    - Laravel backend: `http://localhost:8000`
    - Next.js frontend: `http://localhost:3000`

## Docker Setup

### Dockerfiles

- **Laravel Dockerfile**: Containerizes the Laravel application.
- **Next.js Dockerfile**: Containerizes the Next.js application.

### Docker Compose

The `docker-compose.yml` file defines the services for the application:

- **laravel**: The backend service.
- **nextjs**: The frontend service.
- **mySQL**: The database service.

### Makefile Commands

- `make build`: Builds the Docker containers.
- `make up`: Starts the Docker containers in detached mode.
- `make stop`: Stops the Docker containers.
- `make frontendTerminal`: Opens a shell in the Next.js container.
- `make nodeUser`: Opens a shell in the Next.js container as the `node` user.
- `make backendTerminal`: Opens a shell in the Laravel container.
- `make frontendLogs`: Streams logs for the frontend service.
- `make backendLogs`: Streams logs for the backend service.
- `make buildFrontend`: Builds the frontend Docker container.
- `make buildBackend`: Builds the backend Docker container.
- `make data`: Runs database migrations and seeds.

## Volumes

- MySQL data is stored in the `mysql` folder to ensure persistence.

## License

This project is licensed under the MIT License.
