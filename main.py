import webview

# 連接到本地運行的 Web 應用
url = 'http://localhost:3000'

# 創建並打開帶有圖標的 Webview 窗口
webview.create_window(
    title='Webview App',       # 應用標題
    url=url,                   # 連接的 URL
)

# 啟動 Webview 應用
webview.start()
