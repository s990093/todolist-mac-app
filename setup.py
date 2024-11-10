from setuptools import setup

APP = ['main.py']
DATA_FILES = [
    ('', ['icon.icns'])  # 包含圖標文件
]
OPTIONS = {
    'argv_emulation': False,
    'packages': ['webview'],
    'iconfile': 'icon.icns',
    'plist': {
        'CFBundleName': 'Todo List Manager',
        'CFBundleDisplayName': 'Todo List Manager',
        'CFBundleGetInfoString': "Todo List Manager",
        'CFBundleIdentifier': "com.yourcompany.todolistmanager",
        'CFBundleVersion': "1.0.0",
        'CFBundleShortVersionString': "1.0.0",
        'NSHighResolutionCapable': True,
    }
}

setup(
    app=APP,
    data_files=DATA_FILES,
    options={'py2app': OPTIONS},
    setup_requires=['py2app'],
)
