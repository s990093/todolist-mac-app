import webview



# url = 'http://localhost:3000'
url = 'http://49.213.238.75:3009'

window = webview.create_window(
    title='Todo List Manager',
    url=url,
    width=800,
    height=600,
    resizable=True,
    min_size=(400, 300),
    fullscreen=False,
)

webview.start()
