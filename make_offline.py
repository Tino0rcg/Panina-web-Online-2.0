import os
import re
import base64

html_path = 'presentación scania/PRESENTACION_SCANIA_ACCESS.html'
output_path = 'presentación scania/PRESENTACION_SCANIA_OFFLINE.html'
base_dir = 'presentación scania'

with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Replace images with base64
def replace_img(match):
    img_path = match.group(1)
    full_path = os.path.join(base_dir, img_path)
    if os.path.exists(full_path):
        with open(full_path, 'rb') as img_f:
            b64_data = base64.b64encode(img_f.read()).decode('utf-8')
        ext = os.path.splitext(img_path)[1][1:].lower()
        if ext == 'jpg': ext = 'jpeg'
        return f'src="data:image/{ext};base64,{b64_data}"'
    return match.group(0)

html = re.sub(r'src="([^"]+)"', replace_img, html)

# Improve font fallback for offline
html = html.replace("font-family:'Inter',sans-serif;", "font-family:'Inter',system-ui,-apple-system,sans-serif;")

with open(output_path, 'w', encoding='utf-8') as f:
    f.write(html)
print('Offline presentation created!')
