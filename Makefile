# FOR DEVELOPMENT MODE
build-dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build

run-dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

scale-dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --scale node-app=2

monitor-dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

stop-dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml down

build-dev-v:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build -V

### ==> FOR RUN JUST a Service
# run-dev-depent-n:
# 	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --no-depends backup_node-app_1
# run-dev-depent-m:
# 	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --no-depends backup_mongo_1

# FOR PRODUCTION
run-prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

stop-prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml down

enter-bash:
	docker exec -it node-app sh
