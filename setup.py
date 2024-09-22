from setuptools import setup

APP = ['main.py']
DATA_FILES = []
OPTIONS = {
    'iconfile': 'icon.icns',
}

setup(
    name="todolist",
    version="1.0.0",  # 添加版本號
    description="A simple to-do list application",  # 添加描述
    author="Your Name",  # 添加作者名稱
    author_email="your.email@example.com",  # 添加作者電子郵件
    license="MIT",  # 添加許可證ㄌ
    url="https://github.com/yourusername/todolist",  # 添加項目 URL
    app=APP,
    data_files=DATA_FILES,
    options={'py2app': OPTIONS},
    setup_requires=['py2app'],
)
