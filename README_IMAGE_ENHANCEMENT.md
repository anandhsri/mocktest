# Image Face Brightening Guide

This directory contains tools to brighten faces in images.

## Quick Start (macOS - Recommended)

Use the shell script with macOS's built-in `sips` command:

```bash
./brighten_face.sh your_image.jpg
```

This will create `your_image_brightened.jpg` with enhanced brightness.

### Custom Output and Brightness

```bash
./brighten_face.sh input.jpg output.jpg 1.5
```

**Brightness values:**
- `1.0` = original (no change)
- `1.2` = slightly brighter
- `1.3` = default (moderate brightening)
- `1.5` = much brighter
- `2.0` = very bright

## Python Method (More Control)

For more advanced face detection and selective brightening:

### 1. Install Required Libraries

```bash
pip3 install Pillow numpy
```

### 2. Run the Script

```bash
python3 brighten_face.py your_image.jpg
```

Or with custom settings:

```bash
python3 brighten_face.py input.jpg output.jpg 1.6
```

## Usage Examples

### Example 1: Basic Brightening
```bash
./brighten_face.sh temple_photo.jpg
```

### Example 2: Custom Brightness
```bash
./brighten_face.sh temple_photo.jpg bright_face.jpg 1.6
```

### Example 3: Python Method
```bash
python3 brighten_face.py temple_photo.jpg enhanced.jpg 1.5
```

## Tips

1. **Start with default brightness (1.3)** and adjust if needed
2. **If face is still dark**, increase brightness to 1.5 or 1.6
3. **If image looks washed out**, reduce brightness to 1.2
4. **For very dark faces**, try 1.8 or 2.0, but be careful not to overexpose

## Troubleshooting

### Script not working?
- Make sure the image file path is correct
- Check file permissions: `chmod +x brighten_face.sh`

### Python script errors?
- Install Pillow: `pip3 install Pillow numpy`
- If scipy is needed: `pip3 install scipy`

### Image still too dark?
- Try higher brightness values (1.6, 1.8, 2.0)
- Check if the original image is too underexposed
- Consider using photo editing software for more control

## Advanced: Manual Region Selection

If you need to brighten a specific region of the image, you can:

1. Use the Python script and edit the face region coordinates
2. Use image editing software like Preview (macOS) or GIMP
3. Use online tools like Photopea or Canva



