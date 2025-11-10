# WordPress Plugin Update Instructions

## What's Changed

Your VloerBot chatbot has been redesigned with a modern, HubBot-inspired interface:

### ✨ New Features
- **Action Buttons**: 4 quick-action buttons for common queries
  - Chat with sales
  - Book a demo
  - Get started for free
  - Get help with my account
- **Compact Design**: 80% height (80vh) instead of full-screen
- **Bottom Positioning**: Chat window slides from bottom with rounded corners on desktop
- **Dark Grey Header**: Professional dark header (#2d3748) with robot icon 🤖
- **Light Grey Bot Messages**: Bot responses now in light grey bubbles (#e2e8f0)
- **Orange Accent Color**: Primary color changed to #d5803f
- **White Input Field**: Clean white input with border
- **AI Disclaimer**: "AI-generated content may be inaccurate." below input
- **Smaller Text**: More compact 15px font size for messages

---

## 📦 How to Update Your WordPress Plugin

### Method 1: Upload via WordPress Admin (Recommended)

1. **Deactivate the current plugin:**
   - Go to WordPress Admin → Plugins
   - Find "VloerBot Chatbot"
   - Click "Deactivate"

2. **Delete the old plugin:**
   - Click "Delete" (don't worry, your settings are saved in the database)

3. **Create a new zip file:**
   - Navigate to the `wordpress-plugin` folder
   - Select these items:
     - `vloerbot-chatbot.php`
     - `build/` folder (with the newly built files)
   - Right-click → Send to → Compressed (zipped) folder
   - Name it `vloerbot-chatbot.zip`

4. **Upload the new plugin:**
   - Go to WordPress Admin → Plugins → Add New
   - Click "Upload Plugin"
   - Choose your new `vloerbot-chatbot.zip` file
   - Click "Install Now"
   - Click "Activate Plugin"

5. **Verify your settings:**
   - Go to Settings → VloerBot
   - Your Supabase credentials should still be there
   - If not, re-enter them and save

### Method 2: Manual FTP/SFTP Update

1. **Connect to your server via FTP/SFTP**

2. **Navigate to:**
   ```
   /wp-content/plugins/vloerbot-chatbot/
   ```

3. **Delete the old `build` folder:**
   - Delete `/wp-content/plugins/vloerbot-chatbot/build/`

4. **Upload new files:**
   - Upload the new `build/` folder from `wordpress-plugin/build/`
   - Replace `vloerbot-chatbot.php` if you made changes to the PHP file

5. **No need to reactivate** - the plugin will automatically use the new files

---

## 🔍 Verify the Update

1. **Visit your WordPress site** (any page)
2. **Check the chat widget**:
   - ✅ Chat button in bottom-right corner
   - ✅ Click it to open the chat window
   - ✅ Window should be 80% height with rounded corners (on desktop)
   - ✅ Dark grey header with robot icon
   - ✅ 4 action buttons at the top
   - ✅ White input field with "Ask me anything..." placeholder
   - ✅ Disclaimer text below input
   - ✅ Bot messages in light grey bubbles
   - ✅ User messages in orange (#d5803f) bubbles

3. **Test functionality**:
   - Try clicking an action button (e.g., "Chat with sales")
   - Send a test message
   - Upload an image to test file uploads
   - Check that AI responses stream properly

---

## 📝 New Build Files

After running `npm run build:wordpress`, the following files were generated:

```
wordpress-plugin/build/
├── assets/
│   ├── main-BhwlGAg4.js  (564.40 KB - includes new ActionButtons component)
│   └── main-BoTa3W-L.css (63.37 KB - includes new styling)
├── favicon.ico
├── placeholder.svg
└── robots.txt
```

The file names have changed (hashed) but the PHP plugin automatically detects them.

---

## 🎨 Customization Options

### Via WordPress Admin (Settings → VloerBot)

You can still customize these via the admin panel:
- Primary color (changes user message color)
- Accent color (changes button hover states)
- Background color (changes chat window background)
- Font family
- Profile picture

**Note**: The new design uses hardcoded colors for consistency:
- Header: `#2d3748` (dark grey)
- Bot messages: `#e2e8f0` (light grey)
- User messages: `#d5803f` (orange)
- Input field: White with grey border

### To Change Hardcoded Colors

If you want to modify the hardcoded colors, edit these files and rebuild:

1. **Header color** → `src/components/chatbot/ChatHeader.tsx` (line 11)
2. **Bot message color** → `src/components/chatbot/MessageBubble.tsx` (line 38)
3. **User message color** → `src/components/chatbot/MessageBubble.tsx` (line 37)
4. **Input field** → `src/components/chatbot/ChatInput.tsx` (line 63)
5. **Action buttons** → `src/components/chatbot/ActionButtons.tsx` (line 39)

After editing, run:
```bash
npm run build:wordpress
```

Then re-upload to WordPress.

---

## 🐛 Troubleshooting

### Chat widget doesn't appear
1. Clear your browser cache (Ctrl+Shift+Delete)
2. Check WordPress Admin → Plugins (ensure it's activated)
3. Verify Supabase credentials in Settings → VloerBot
4. Check browser console (F12) for errors

### Old design still showing
1. **Hard refresh your browser**: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
2. **Clear WordPress cache** if you use a caching plugin:
   - WP Super Cache: Settings → WP Super Cache → Delete Cache
   - W3 Total Cache: Performance → Purge All Caches
   - WP Rocket: Clear Cache from toolbar
3. **Clear CDN cache** if you use Cloudflare or similar

### Action buttons not working
1. Check browser console for JavaScript errors
2. Verify the build files are in `/wp-content/plugins/vloerbot-chatbot/build/assets/`
3. Ensure file permissions are correct (644 for files, 755 for folders)

### Settings lost after update
1. Settings are stored in WordPress database, not in plugin files
2. Go to Settings → VloerBot and re-enter your Supabase credentials
3. Save settings again

---

## 📱 Responsive Behavior

### Desktop (md and above)
- Width: 380px
- Height: 80vh
- Position: Bottom-right corner with 24px spacing
- Rounded corners
- Slides up from bottom

### Mobile
- Width: 100% (full width)
- Height: 80vh
- Position: Bottom of screen
- No rounded corners
- Slides up from bottom

---

## 🔄 Future Updates

To update the chatbot in the future:

1. Make changes to React components in `src/`
2. Run: `npm run build:wordpress`
3. Follow the update instructions above
4. Test on a staging site first (recommended)

---

## 📞 Support

If you encounter any issues:
1. Check browser console for errors (F12 → Console tab)
2. Verify Supabase credentials are correct
3. Ensure your WordPress version is 5.0 or higher
4. Check file permissions on your server

---

## ✅ Update Checklist

- [ ] Backed up current WordPress site (recommended)
- [ ] Deactivated old plugin
- [ ] Deleted old plugin
- [ ] Created new zip file with updated build files
- [ ] Uploaded and activated new plugin
- [ ] Verified Supabase credentials in Settings → VloerBot
- [ ] Tested chat widget on frontend
- [ ] Cleared browser cache
- [ ] Cleared WordPress cache (if applicable)
- [ ] Tested action buttons
- [ ] Verified AI responses work
- [ ] Tested file uploads
- [ ] Checked mobile responsiveness

---

**Last Updated**: November 10, 2025  
**Plugin Version**: 1.0.0  
**Build Files**: main-BhwlGAg4.js, main-BoTa3W-L.css
