# VloerBot Chatbot - Changelog

## [1.1.0] - 2025-11-10

### 🎨 Major UI Redesign - HubBot-Inspired Interface

#### Added
- **ActionButtons Component** (`src/components/chatbot/ActionButtons.tsx`)
  - 4 quick-action buttons: Chat with sales, Book a demo, Get started for free, Get help with my account
  - Icons from lucide-react
  - Sends action text as message when clicked

- **AI Disclaimer**
  - Added "AI-generated content may be inaccurate." text below input field

#### Changed

##### ChatWindow Component
- Changed height from `h-full` to `h-[80vh]` (80% viewport height)
- Repositioned from top to bottom (`bottom-0` instead of `top-0`)
- Added rounded corners on desktop (`md:rounded-lg`)
- Added desktop spacing (`md:right-6 md:bottom-6`)
- Changed animation from sliding from right to sliding from bottom (`y` instead of `x`)
- Reduced padding in messages area (from `px-4 py-6` to `px-3 py-4`)
- Reduced message spacing (from `space-y-4` to `space-y-3`)
- Integrated ActionButtons component below header

##### ChatHeader Component
- Background color: Changed to dark grey (`#2d3748`)
- Text color: Changed to white
- Robot icon: Changed from "VB" text to emoji 🤖
- Icon background: Changed to orange (`#d5803f`)
- Icon size: Reduced from 10x10 to 8x8
- Removed subtitle "AI Assistent"
- Reduced padding (from `px-6 py-4` to `px-4 py-3`)
- Reduced title font size (from `text-base` to `text-sm`)
- Reduced close button size (to `h-8 w-8`)
- Reduced close icon size (from `w-5 h-5` to `w-4 h-4`)

##### MessageBubble Component
- Bot messages: Changed to light grey background (`#e2e8f0`)
- Bot messages: Changed text to dark grey (`text-gray-800`)
- User messages: Changed to orange background (`#d5803f`)
- User messages: Changed text to white
- Reduced padding (from `px-4 py-3` to `px-3 py-2`)
- Reduced font size (from `18px` to `15px`)

##### ChatInput Component
- Input field: Changed to white background with grey border
- Input field: Changed border color to `border-gray-300`
- Input field: Changed focus ring to orange (`#d5803f`)
- Placeholder: Changed to "Ask me anything..."
- Reduced padding (from `p-4` to `p-3`)
- Reduced attachment margin (from `mb-3` to `mb-2`)
- Reduced input padding (from `px-4 py-3` to `px-3 py-2.5`)
- Reduced input min-height (from `44px` to `40px`)
- Reduced send button size (from `h-11 w-11` to `h-10 w-10`)
- Changed send button colors to orange (`#d5803f` with hover `#c17235`)
- Added disclaimer text below input

##### Color Scheme (index.css)
- Added `--bot-primary` variable for orange (`#d5803f`)
- Updated `--chat-user-bg` to use orange
- Updated `--chat-bot-bg` to light grey (`#e2e8f0`)
- Updated `--chat-bot-fg` to dark grey

#### Build Output
- New files generated:
  - `main-BhwlGAg4.js` (564.40 KB)
  - `main-BoTa3W-L.css` (63.37 KB)
- Previous files removed:
  - `main-Dt9QpYqm.js`
  - `main-UYOrpI4o.css`

### 📝 Documentation
- Created `WORDPRESS-UPDATE-INSTRUCTIONS.md` with comprehensive update guide
- Added `CHANGELOG.md` (this file)

### 🎯 Key Design Changes
- **More compact**: 20% shorter height
- **Better positioning**: Doesn't overlap page header
- **Cleaner look**: White input, light grey bot messages
- **Quick actions**: Pre-defined action buttons
- **Professional**: Dark header with branding
- **Consistent**: Orange accent color throughout

### 📱 Responsive Design
- Desktop: 380px width, 80vh height, positioned bottom-right with spacing
- Mobile: Full width, 80vh height, positioned at bottom
- Smooth slide-up animation from bottom on both

### 🔧 Technical Changes
- All components use hardcoded colors for design consistency
- WordPress admin customization still available but doesn't override new design colors
- PHP plugin automatically detects new hashed filenames
- No database changes required

---

## How to Apply This Update

See `WORDPRESS-UPDATE-INSTRUCTIONS.md` for detailed step-by-step instructions.

**Quick Steps:**
1. Deactivate & delete old plugin in WordPress
2. Create new zip file from `wordpress-plugin/` folder
3. Upload and activate in WordPress
4. Verify settings and test functionality
