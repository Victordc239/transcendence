NAME        := transcendence
COMPOSE     := docker compose
BACKEND_DIR := backend
NODE        := node
NPM         := npm

all: up

help:
	@echo "Targets available:"
	@echo "  make up               -> start db and backend"
	@echo "  make down             -> stop containers"
	@echo "  make restart          -> restart everything"
	@echo "  make logs             -> show db logs"
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

clean:
	@echo "Nothing to clean."

fclean:
	$(COMPOSE) down -v --remove-orphans
	rm -rf backend/node_modules

re: fclean up

.PHONY: all help up down restart logs clean fclean re