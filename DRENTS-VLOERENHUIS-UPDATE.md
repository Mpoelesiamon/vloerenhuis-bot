# 🏠 Drents Vloerenhuis - Bot Update

## ✨ Bot Now Synced with Your Website!

Your VloerBot is now fully customized for **Drents Vloerenhuis** (sprout2grow.com)!

---

## 🎯 What Changed

### ✅ 1. Company-Specific Knowledge

The bot now knows:
- **Company:** Drents Vloerenhuis
- **Website:** sprout2grow.com
- **Brand Promise:** "Jouw vloer. Jouw stijl."
- **Service:** Van meting tot montage - perfect geregeld

### ✅ 2. Product Knowledge

**PVC Vloeren:**
- Waterbestendig en onderhoudsvriendelijk
- Perfect voor keuken, badkamer, woonruimtes
- Prijsrange: €50-80 per m²
- Diverse designs (houtlook, steenlook)

**Laminaat:**
- Stijlvol en betaalbaar
- Geschikt voor alle woonruimtes
- Prijsrange: €40-70 per m²
- Slijtvast en onderhoudsvriendelijk

**Raamdecoratie:**
- Gordijnen, jaloezieën, zonwering
- Maatwerk en montage
- Stijlvol en functioneel

**Traprenovatie:**
- Professionele traprenovatie
- Diverse materialen en kleuren
- Veilig en duurzaam

### ✅ 3. Service Information

Bot knows about:
- Complete service: meting tot montage
- Gratis offerte en advies
- Ervaren monteurs
- Garantie op materiaal en vakwerk
- Contact via sprout2grow.com/contact/

### ✅ 4. New Greeting Message

**Dutch:**
```
Welkom bij Drents Vloerenhuis! 👋

Ik help je graag met advies over:
• PVC vloeren
• Laminaat
• Raamdecoratie
• Traprenovatie

Van meting tot montage - perfect geregeld!

Waar kan ik je mee helpen?
```

**English:**
```
Welcome to Drents Vloerenhuis! 👋

I'm happy to help you with:
• PVC flooring
• Laminate
• Window decoration
• Stair renovation

From measurement to installation - perfectly arranged!

How can I help you?
```

---

## 📦 Deployment Required (2 Steps)

### Step 1: Deploy Supabase Function ⚠️ **IMPORTANT**

The AI brain needs to be updated in Supabase:

**Option A: Via Supabase Dashboard (Easiest)**
1. Go to [supabase.com](https://supabase.com)
2. Select your project
3. Go to **Edge Functions** in the left menu
4. Find the `chat-stream` function
5. Click **Edit** or **Deploy**
6. Copy the content from: `supabase/functions/chat-stream/index.ts`
7. Paste it in the editor
8. Click **Deploy**

**Option B: Via Supabase CLI**
```bash
# If you have Supabase CLI installed
cd C:\projects\vloerenhuis-bot
supabase functions deploy chat-stream
```

**Option C: Manual File Upload**
1. Download the file: `supabase/functions/chat-stream/index.ts`
2. In Supabase Dashboard → Edge Functions
3. Upload the new version

### Step 2: Update WordPress Plugin ✅

1. **Create ZIP:**
   - Go to: `C:\projects\vloerenhuis-bot\wordpress-plugin`
   - Select: `vloerbot-chatbot.php` + `build` folder
   - Right-click → Compress to ZIP
   - Name: `vloerbot-chatbot.zip`

2. **Upload:**
   - WordPress Admin → Plugins
   - Deactivate "VloerBot Chatbot"
   - Delete it
   - Add New → Upload Plugin
   - Install & Activate

3. **Clear Cache:**
   - Browser: Ctrl+F5
   - WordPress cache
   - CDN cache

---

## 📦 Build Information

**WordPress Plugin:**
- `main-Cja_fD1i.js` (562.69 KB)
- `main-AsCcBapm.css` (63.09 KB)

**Supabase Function:**
- Updated with full Drents Vloerenhuis knowledge

**Build Date:** November 10, 2025, 12:59 PM

---

## ✅ How to Test

After deployment, test these questions:

**Dutch:**
1. "Welke vloeren hebben jullie?"
2. "Wat kost een PVC vloer?"
3. "Ik wil een offerte aanvragen"
4. "Vertelt eens over laminaat"
5. "Kunnen jullie ook raamdecoratie?"

**English:**
1. "What flooring do you offer?"
2. "How much does PVC flooring cost?"
3. "I want a quote"
4. "Tell me about laminate"
5. "Do you also do window decoration?"

**Expected Behavior:**
- ✅ Bot identifies as Drents Vloerenhuis
- ✅ Mentions all 4 products
- ✅ Provides price ranges (€40-80/m²)
- ✅ Directs to contact page for quotes
- ✅ Professional and helpful tone
- ✅ Responds in user's language

---

## 🎯 Bot Capabilities Now

### Knows:
- ✅ Company name and website
- ✅ All 4 products (PVC, Laminaat, Raamdecoratie, Traprenovatie)
- ✅ Price ranges (€40-80/m²)
- ✅ Services (meting tot montage)
- ✅ Contact page (sprout2grow.com/contact/)
- ✅ Brand promise ("Jouw vloer. Jouw stijl.")

### Can Do:
- ✅ Answer product questions
- ✅ Provide price guidance
- ✅ Explain differences between products
- ✅ Give advice based on room/usage
- ✅ Direct to contact page for quotes
- ✅ Analyze floor images
- ✅ Switch languages automatically

### Won't Do:
- ❌ Mention OUTLET deals (as requested)
- ❌ Give exact prices (only ranges)
- ❌ Book appointments (directs to contact)

---

## 🎨 Design (Unchanged)

The chatbot design stays perfect:
- Orange branding (#d5803f)
- 12px text
- Clean buttons
- Orange floating button
- X in header

---

## 📋 Deployment Checklist

- [ ] **Step 1:** Deploy Supabase function (chat-stream)
- [ ] **Step 2:** Upload new WordPress plugin
- [ ] **Step 3:** Clear all caches
- [ ] **Step 4:** Test with sample questions
- [ ] **Step 5:** Verify bot mentions Drents Vloerenhuis
- [ ] **Step 6:** Check price ranges are mentioned
- [ ] **Step 7:** Verify contact page redirection works

---

## ⚠️ Important Notes

### Supabase Deployment is Critical!

The WordPress plugin only contains the **interface** (greeting message).

The **AI brain** (product knowledge, pricing, etc.) is in the **Supabase function**.

**You must deploy BOTH:**
1. ✅ Supabase function (AI knowledge)
2. ✅ WordPress plugin (greeting)

If you only upload the WordPress plugin, the bot will show the new greeting but won't have the product knowledge!

---

## 🆘 Need Help?

### Supabase Function Not Deployed?

**Check if it's working:**
1. Open chat on your site
2. Ask: "Welke producten hebben jullie?"
3. **Good:** Bot mentions PVC, Laminaat, Raamdecoratie, Traprenovatie
4. **Bad:** Bot gives generic flooring answer

**If bad:** Deploy the Supabase function!

### Bot Not Showing New Greeting?

**Check:**
1. Clear browser cache (Ctrl+F5)
2. WordPress cache cleared
3. New plugin uploaded

---

## 🎉 Expected Result

After full deployment:

**User:** "Wat zijn jullie prijzen?"

**Bot:** "Drents Vloerenhuis biedt verschillende vloeren aan:

**PVC vloeren:** circa €50-80 per m² (inclusief materiaal en leggen)
**Laminaat:** circa €40-70 per m² (inclusief materiaal en leggen)

De exacte prijs hangt af van uw keuze en de grootte van de ruimte. Voor een gratis offerte en persoonlijk advies kunt u terecht op onze contactpagina: sprout2grow.com/contact/"

---

## 📞 Support

If something doesn't work:
1. Verify Supabase function is deployed
2. Check browser console (F12) for errors
3. Confirm both steps completed
4. Test with sample questions above

---

**Version:** 1.7.0 (Drents Vloerenhuis Edition)  
**Build Date:** November 10, 2025, 12:59 PM  
**Status:** ✅ Ready for Deployment  
**Knowledge Base:** Fully Customized for sprout2grow.com

**Your bot is now a Drents Vloerenhuis expert!** 🏠🎨
