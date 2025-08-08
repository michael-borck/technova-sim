# GitHub Pages Hosting Guide

## ✅ Yes! This simulator works perfectly on GitHub Pages!

Since the TechNova Simulator is built with static HTML, CSS, and JavaScript (no server-side code required), it can be hosted for FREE on GitHub Pages.

## Quick Setup (2 minutes)

### Step 1: Enable GitHub Pages

1. Go to your repository: https://github.com/michael-borck/teknova-sim
2. Click on **Settings** (in the repository navigation)
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select **Deploy from a branch**
5. Under **Branch**, select **main** (or master)
6. Leave folder as **/ (root)**
7. Click **Save**

### Step 2: Wait for Deployment

- GitHub will take 1-5 minutes to build and deploy
- You'll see a green checkmark when it's ready
- The page will show your URL at the top

### Step 3: Access Your Site

Your simulator will be available at:
```
https://michael-borck.github.io/teknova-sim/
```

It will automatically redirect to the briefing page:
```
https://michael-borck.github.io/teknova-sim/briefing.html
```

## Custom Domain (Optional)

If you have a custom domain, you can use it:

1. In repository Settings → Pages
2. Under "Custom domain", enter your domain (e.g., `teknova.yourdomain.com`)
3. Click Save
4. Add a CNAME record in your DNS:
   - Type: CNAME
   - Host: teknova (or @ for root domain)
   - Points to: michael-borck.github.io

## Features That Work on GitHub Pages

✅ All HTML pages
✅ CSS styling
✅ JavaScript interactivity
✅ Floating chat with built-in responses
✅ Student worksheet with localStorage
✅ All evidence pages
✅ Mobile responsive design

## Limitations on GitHub Pages

- No server-side processing (but not needed!)
- No custom AI backend (but built-in responses work great!)
- 100GB bandwidth limit per month (plenty for education)
- Must be public repo (or use GitHub Pro for private)

## Testing Your Deployment

Once deployed, test these URLs:

1. **Briefing Page**: `https://michael-borck.github.io/teknova-sim/briefing.html`
2. **Main Site**: `https://michael-borck.github.io/teknova-sim/index.html`
3. **Evidence**: `https://michael-borck.github.io/teknova-sim/internal/phishing-email.html`
4. **Worksheet**: `https://michael-borck.github.io/teknova-sim/facilitator/student-worksheet.html`

## Troubleshooting

### Site not loading?
- Wait 5-10 minutes for initial deployment
- Check Settings → Pages for any error messages
- Ensure repository is public (or you have GitHub Pro)

### 404 errors?
- Check that GitHub Pages is enabled
- Verify branch name (main vs master)
- Clear browser cache

### Chat not working?
- The built-in responses should work automatically
- Check browser console for JavaScript errors
- Ensure JavaScript is enabled in browser

## Advantages of GitHub Pages

1. **Free hosting** - No cost for public repositories
2. **Always available** - GitHub's reliable infrastructure
3. **HTTPS included** - Automatic SSL certificate
4. **Easy updates** - Just push to GitHub
5. **No maintenance** - GitHub handles everything
6. **Version control** - Built-in with git

## For Students

Share this link with students:
```
https://michael-borck.github.io/teknova-sim/briefing.html
```

Or use a URL shortener for easier sharing:
- bit.ly
- tinyurl.com
- rebrand.ly

## Updating Content

To update the simulator:

1. Make changes locally
2. Commit and push to GitHub:
```bash
git add .
git commit -m "Update content"
git push
```
3. GitHub Pages auto-updates in ~1-2 minutes

## Success Checklist

- [ ] GitHub Pages enabled in Settings
- [ ] Site accessible at GitHub.io URL
- [ ] Briefing page loads
- [ ] Chat button appears and works
- [ ] Internal evidence pages accessible
- [ ] Student worksheet saves data
- [ ] Share link with students

## Alternative: Deploy to Both

You can have BOTH:
- GitHub Pages for easy student access
- VPS deployment for custom domain/features

This gives you redundancy and flexibility!

---

Your TechNova Simulator is perfect for GitHub Pages hosting! 🎉