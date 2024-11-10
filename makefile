.PHONY: help server web install dev stop

# 顯示可用的命令說明
help:
	@echo "Available commands:"
	@echo "  make install  - Install dependencies for both server and web"
	@echo "  make dev      - Start both server and web in development mode"
	@echo "  make server   - Start the server only"
	@echo "  make web      - Start the web client only"
	@echo "  make stop     - Stop all running services"

# 安裝依賴
install:
	@echo "Installing server dependencies..."
	cd server && pip install -r requirements.txt
	@echo "Installing web dependencies..."
	cd web && npm install

# 啟動開發環境（同時啟動 server 和 web）
dev:
	@echo "Starting development environment..."
	make server & make web

# 只啟動後端 server
server:
	@echo "Starting server..."
	cd server && uvicorn main:app --reload --port 8000

# 只啟動前端 web
web:
	@echo "Starting web client..."
	cd web && yarn dev

build:
	@echo "Building web client..."
	cd web && yarn build

# 停止所有服務
stop:
	@echo "Stopping all services..."
	@pkill -f "uvicorn"
	@pkill -f "next"
	@echo "All services stopped"
