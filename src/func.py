import os
import subprocess

# 使用 os.system 方式发送通知
def show_notification(title, text):
    # 对 title 和 text 进行适当的转义，防止特殊字符引发问题
    os.system(f"""
              osascript -e 'display notification "{text}" with title "{title}"'
              """)

# 使用 subprocess.call 方式发送通知
def show_notification_2(title, text):
    # 对字符串进行转义以确保 osascript 可以正确解析
    cmd = f'display notification "{text}" with title "{title}"'
    subprocess.call(["osascript", "-e", cmd])
