#!/bin/bash
# Script to brighten faces in images using macOS sips command
# Usage: ./brighten_face.sh <input_image> [output_image] [brightness]

if [ $# -lt 1 ]; then
    echo "Usage: $0 <input_image> [output_image] [brightness]"
    echo "Example: $0 photo.jpg photo_bright.jpg 1.2"
    echo ""
    echo "Brightness values:"
    echo "  1.0 = original"
    echo "  1.2 = slightly brighter"
    echo "  1.5 = much brighter"
    echo "  2.0 = very bright"
    exit 1
fi

INPUT="$1"
OUTPUT="${2:-${INPUT%.*}_brightened.${INPUT##*.}}"
BRIGHTNESS="${3:-1.3}"

if [ ! -f "$INPUT" ]; then
    echo "❌ Error: Image file not found: $INPUT"
    exit 1
fi

echo "📸 Processing image: $INPUT"
echo "💡 Brightness factor: $BRIGHTNESS"
echo "💾 Output: $OUTPUT"

# Copy input to output first
cp "$INPUT" "$OUTPUT"

# Use Python with PIL for brightness adjustment (simpler and more reliable)
# Create a temporary Python script
python3 << EOF
from PIL import Image, ImageEnhance
import sys

try:
    img = Image.open("$OUTPUT")
    img = img.convert('RGB')
    
    # Enhance brightness
    enhancer = ImageEnhance.Brightness(img)
    img_brightened = enhancer.enhance($BRIGHTNESS)
    
    # Enhance contrast slightly
    enhancer_contrast = ImageEnhance.Contrast(img_brightened)
    img_final = enhancer_contrast.enhance(1.1)
    
    # Save result
    img_final.save("$OUTPUT", quality=95)
    print("SUCCESS")
except Exception as e:
    print(f"ERROR: {e}")
    sys.exit(1)
EOF

if [ $? -eq 0 ]; then
    echo "✅ Enhanced image saved to: $OUTPUT"
    echo ""
    echo "💡 If the face is still too dark, try:"
    echo "   $0 $INPUT $OUTPUT 1.5"
else
    echo "❌ Error processing image"
    exit 1
fi

