from PIL import Image, ImageFilter

def chroma_key(input_path):
    img = Image.open(input_path).convert('RGBA')
    width, height = img.size
    data = img.load()

    mask = Image.new('L', (width, height), 255)
    mask_data = mask.load()

    for y in range(height):
        for x in range(width):
            r, g, b, a = data[x, y]
            blue_diff = b - max(r, g)
            
            # Blue backdrop condition
            if (b > 115 and blue_diff > 35 and r < 95) or (b > 140 and r < 80):
                mask_data[x, y] = 0
            elif b > 105 and blue_diff >= 18 and r < 110:
                # Transition zone
                t = (blue_diff - 18) / (35 - 18)
                alpha = int(max(0, min(255, (1.0 - t) * 255)))
                mask_data[x, y] = alpha
                despilled_b = int((r + g) / 2)
                data[x, y] = (r, g, despilled_b, a)
            elif blue_diff > 15 and b > 90 and r < 120:
                despilled_b = int((r + g) / 2)
                data[x, y] = (r, g, despilled_b, a)

    # Soft feather
    blurred_mask = mask.filter(ImageFilter.GaussianBlur(radius=0.9))
    img.putalpha(blurred_mask)
    
    # Save transparent variants
    img.save('public/images/profile-transparent.webp', 'WEBP', quality=95)
    
    img_800 = img.resize((800, 800), Image.Resampling.LANCZOS)
    img_800.save('public/images/profile-transparent-800.webp', 'WEBP', quality=95)
    
    img_400 = img.resize((400, 400), Image.Resampling.LANCZOS)
    img_400.save('public/images/profile-transparent-400.webp', 'WEBP', quality=95)
    
    print("Saved all transparent WebP variants successfully!")

if __name__ == '__main__':
    chroma_key('public/images/profile.jpg')
