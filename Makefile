setup:
	@make build
	@make up
build:
	docker-compose build
stop:
	docker-compose stop
up:
	docker-compose up -d
frontendTerminal:
	docker exec -it ecommerce-nextjs /bin/sh
nodeUser:
	docker exec -it -u node ecommerce-nextjs /bin/sh
backendTerminal:
	docker exec -it ecommerce-laravel /bin/bash
laravelUser:
	docker exec -it -u laravel ecommerce-laravel /bin/bash
frontendLogs:
	docker-compose logs -f frontend
backendLogs:
	docker-compose logs -f backend
buildFrontend:
	docker-compose build frontend
buildBackend:
	docker-compose build backend
data:
	docker-compose exec backend sh -c "cp .env.example .env && php artisan migrate && php artisan db:seed"