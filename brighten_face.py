#!/usr/bin/env python3
"""
Script to brighten faces in images - focuses only on face region
Uses face detection and selective brightening
"""

import sys
import os
import numpy as np
from PIL import Image, ImageEnhance
import cv2

def detect_face(image_path):
    """
    Detect face in image using OpenCV
    Returns face bounding box coordinates or None
    """
    try:
        # Load image
        img = cv2.imread(image_path)
        if img is None:
            return None
        
        # Convert to grayscale for face detection
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # Try multiple face detection methods
        face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
        faces = face_cascade.detectMultiScale(gray, 1.1, 4)
        
        if len(faces) > 0:
            # Return the largest face (first one, or find largest)
            largest_face = max(faces, key=lambda rect: rect[2] * rect[3])
            x, y, w, h = largest_face
            # Expand the region slightly for better coverage
            padding = 20
            x = max(0, x - padding)
            y = max(0, y - padding)
            w = min(img.shape[1] - x, w + 2 * padding)
            h = min(img.shape[0] - y, h + 2 * padding)
            return (x, y, w, h)
        
        return None
    except Exception as e:
        print(f"⚠️  Face detection warning: {e}")
        return None

def brighten_face_region(image_path, output_path=None, brightness_factor=1.6, face_region=None):
    """
    Brighten only the face region in an image
    """
    try:
        # Open image with PIL
        img = Image.open(image_path)
        img = img.convert('RGB')
        img_array = np.array(img)
        
        # If face region not provided, try to detect it
        if face_region is None:
            print("🔍 Detecting face in image...")
            face_region = detect_face(image_path)
        
        if face_region is None:
            print("⚠️  Could not detect face automatically. Using center-right region (common for portrait photos).")
            # Default to center-right region (common for portrait photos)
            height, width = img_array.shape[:2]
            x = int(width * 0.5)
            y = int(height * 0.1)
            w = int(width * 0.4)
            h = int(height * 0.5)
            face_region = (x, y, w, h)
        
        x, y, w, h = face_region
        print(f"📍 Face region: x={x}, y={y}, width={w}, height={h}")
        
        # Create a mask for the face region with smooth edges
        height, width = img_array.shape[:2]
        mask = np.zeros((height, width), dtype=np.float32)
        
        # Create elliptical mask for smoother blending
        center_x = x + w // 2
        center_y = y + h // 2
        radius_x = w // 2
        radius_y = h // 2
        
        # Create coordinate grids
        y_coords, x_coords = np.ogrid[:height, :width]
        
        # Elliptical mask
        mask = ((x_coords - center_x) / radius_x) ** 2 + ((y_coords - center_y) / radius_y) ** 2
        mask = 1.0 - np.clip(mask, 0, 1)  # Invert so center is 1, edges fade to 0
        
        # Apply Gaussian blur to mask for smooth transition
        from scipy import ndimage
        mask = ndimage.gaussian_filter(mask, sigma=15)
        
        # Enhance brightness of entire image
        enhancer = ImageEnhance.Brightness(img)
        img_brightened = enhancer.enhance(brightness_factor)
        img_brightened_array = np.array(img_brightened)
        
        # Blend: apply brightening more strongly in face region
        result = img_array.copy().astype(np.float32)
        brightened_float = img_brightened_array.astype(np.float32)
        
        # Blend original and brightened based on mask
        # Higher mask value = more brightening
        blend_strength = mask * 0.8  # Use 80% of mask strength for blending
        for c in range(3):  # RGB channels
            result[:, :, c] = result[:, :, c] * (1 - blend_strength) + brightened_float[:, :, c] * blend_strength
        
        # Convert back to PIL Image
        result_img = Image.fromarray(result.astype(np.uint8))
        
        # Determine output path
        if output_path is None:
            base, ext = os.path.splitext(image_path)
            output_path = f"{base}_brightened{ext}"
        
        # Save result
        result_img.save(output_path, quality=95)
        print(f"✅ Enhanced image saved to: {output_path}")
        return output_path
        
    except ImportError as e:
        if 'scipy' in str(e):
            # Fallback without scipy
            return brighten_face_simple_fallback(image_path, output_path, brightness_factor, face_region)
        raise
    except Exception as e:
        print(f"❌ Error processing image: {e}")
        return None

def brighten_face_simple_fallback(image_path, output_path=None, brightness_factor=1.6, face_region=None):
    """
    Fallback method without scipy - uses simpler blending
    """
    try:
        img = Image.open(image_path)
        img = img.convert('RGB')
        img_array = np.array(img)
        
        if face_region is None:
            face_region = detect_face(image_path)
            if face_region is None:
                height, width = img_array.shape[:2]
                x = int(width * 0.5)
                y = int(height * 0.1)
                w = int(width * 0.4)
                h = int(height * 0.5)
                face_region = (x, y, w, h)
        
        x, y, w, h = face_region
        
        # Create simple rectangular mask with soft edges
        height, width = img_array.shape[:2]
        mask = np.zeros((height, width), dtype=np.float32)
        
        # Create soft-edged rectangular mask
        y_coords, x_coords = np.ogrid[:height, :width]
        
        # Distance from face center
        center_x = x + w // 2
        center_y = y + h // 2
        
        # Simple distance-based mask
        dist_x = np.abs(x_coords - center_x) / (w / 2)
        dist_y = np.abs(y_coords - center_y) / (h / 2)
        dist = np.sqrt(dist_x**2 + dist_y**2)
        mask = np.clip(1.0 - dist, 0, 1)
        
        # Enhance brightness
        enhancer = ImageEnhance.Brightness(img)
        img_brightened = enhancer.enhance(brightness_factor)
        img_brightened_array = np.array(img_brightened)
        
        # Blend
        result = img_array.copy().astype(np.float32)
        brightened_float = img_brightened_array.astype(np.float32)
        
        blend_strength = mask * 0.8
        for c in range(3):
            result[:, :, c] = result[:, :, c] * (1 - blend_strength) + brightened_float[:, :, c] * blend_strength
        
        result_img = Image.fromarray(result.astype(np.uint8))
        
        if output_path is None:
            base, ext = os.path.splitext(image_path)
            output_path = f"{base}_brightened{ext}"
        
        result_img.save(output_path, quality=95)
        print(f"✅ Enhanced image saved to: {output_path}")
        return output_path
        
    except Exception as e:
        print(f"❌ Error in fallback processing: {e}")
        return None

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 brighten_face.py <image_path> [output_path] [brightness_factor]")
        print("Example: python3 brighten_face.py photo.jpg photo_bright.jpg 1.6")
        print("\nThis script detects faces and brightens only the face region.")
        sys.exit(1)
    
    image_path = sys.argv[1]
    output_path = sys.argv[2] if len(sys.argv) > 2 else None
    brightness = float(sys.argv[3]) if len(sys.argv) > 3 else 1.6
    
    if not os.path.exists(image_path):
        print(f"❌ Error: Image file not found: {image_path}")
        sys.exit(1)
    
    # Brighten face region
    result = brighten_face_region(image_path, output_path, brightness)
    
    if result:
        print(f"\n💡 Tip: If the face is still too dark, try increasing brightness_factor:")
        print(f"   python3 brighten_face.py {image_path} {output_path} 1.8")
