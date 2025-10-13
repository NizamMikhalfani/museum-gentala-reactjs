from PIL import Image, ImageDraw, ImageFont
import sys

# Create a simple circular avatar
size = 48
img = Image.new('RGB', (size, size), color='#3498db')
draw = ImageDraw.Draw(img)

# Draw a circle
draw.ellipse([0, 0, size-1, size-1], fill='#3498db', outline='#2980b9', width=2)

# Add a simple user icon (head and shoulders)
# Head
head_center = (size//2, size//3)
head_radius = size//6
draw.ellipse([head_center[0]-head_radius, head_center[1]-head_radius,
              head_center[0]+head_radius, head_center[1]+head_radius],
             fill='white', outline='white')

# Shoulders (simplified)
shoulder_y = int(size * 0.65)
draw.arc([size//4, shoulder_y - size//3, 3*size//4, shoulder_y + size//3],
         start=0, end=180, fill='white', width=6)

img.save('avatar.png')
print("Avatar created successfully")
