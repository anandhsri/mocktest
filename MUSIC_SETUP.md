# Background Music Setup

The app is configured to play South Indian instrumental light music as background music.

## How to Add Your Music

1. **Download or obtain a royalty-free South Indian instrumental music file**
   - Recommended sources:
     - YouTube Audio Library (filter by "Indian" or "Instrumental")
     - Free Music Archive
     - Incompetech (royalty-free music)
     - Purchase royalty-free tracks from music marketplaces

2. **Save the music file**
   - Name the file: `south-indian-instrumental.mp3`
   - Place it in the project root directory (same folder as `index.html`)

3. **Supported formats**
   - MP3 (recommended)
   - The browser will automatically handle the format

## Music Settings

- **Volume**: Set to 25% for background listening
- **Loop**: Music loops continuously
- **Fade In/Out**: Smooth 3-second fade in, 1.5-second fade out

## Troubleshooting

- If music doesn't play, check the browser console for error messages
- Ensure the file is named exactly `south-indian-instrumental.mp3`
- Make sure the file is in the same directory as `index.html`
- Check that your browser supports HTML5 Audio

## Note

The app will try to load `south-indian-instrumental.mp3` first. If the file is not found, it will attempt to use a fallback URL (which may not work). For best results, always use a local music file.
