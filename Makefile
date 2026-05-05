NAME        := transcendence
COMPOSE     := docker compose

all: up

help:
	@echo "Targets available:"
	@echo "  make up               -> start db and backend"
	@echo "  make down             -> stop containers"
	@echo "  make restart          -> restart everything"
	@echo "  make logs             -> show db logs"
	@echo "  make logs-back    -> backend logs"
	@echo "  make logs-front   -> frontend logs"
	@echo "  make clean            -> clean temporary artifacts"
	@echo "  make fclean           -> stop containers and remove node_modules"
	@echo "  make re               -> full reset and start again"


up:
	$(COMPOSE) up --build -d

down:
	$(COMPOSE) down

restart: down up

logs:
	$(COMPOSE) logs -f db

logs-back:
	$(COMPOSE) logs -f backend

logs-front:
	$(COMPOSE) logs -f frontend

clean:
	@echo "Nothing to clean."

fclean:
	$(COMPOSE) down -v --remove-orphans
	rm -rf backend/node_modules
	rm -rf frontend/node_modules

re: fclean up

.PHONY: all help up down restart logs logs-back logs-front clean fclean re