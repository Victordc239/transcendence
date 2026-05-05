NAME        := transcendence
COMPOSE     := docker compose
BACKEND_DIR := backend
NODE        := node
NPM         := npm

all: up

help:
	@echo "Targets available:"
	@echo "  make install-backend  -> install backend dependencies"
	@echo "  make db               -> start PostgreSQL container"
	@echo "  make backend          -> run the backend server"
	@echo "  make up               -> start db and backend"
	@echo "  make down             -> stop containers"
	@echo "  make restart          -> restart everything"
	@echo "  make logs             -> show db logs"
	@echo "  make clean            -> clean temporary artifacts"
	@echo "  make fclean           -> stop containers and remove node_modules"
	@echo "  make re               -> full reset and start again"

install-backend:
	@cd $(BACKEND_DIR) && $(NPM) install

db:
	$(COMPOSE) up -d db

backend:
	@cd $(BACKEND_DIR) && $(NODE) server.js

up: db install-backend
	@echo "Esperando a PostgreSQL..."
	@sleep 5
	@cd $(BACKEND_DIR) && $(NODE) server.js

down:
	$(COMPOSE) down

restart: down up

logs:
	$(COMPOSE) logs -f db

clean:
	@echo "Nothing to clean."

fclean: down
	$(COMPOSE) down -v --remove-orphans
	@rm -rf $(BACKEND_DIR)/node_modules

re: fclean install-backend up

.PHONY: all help install-backend db backend up down restart logs clean fclean re