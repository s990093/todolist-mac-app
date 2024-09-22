import webview

url = 'http://localhost:3000'

webview.create_window(
    title='Webview App',    
    url=url,                    
)

webview.start()
