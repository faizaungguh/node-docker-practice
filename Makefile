run-dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build

stop-dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v

run-prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build

stop-prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml down -v

enter-bash:
	docker exec -it node-app sh
