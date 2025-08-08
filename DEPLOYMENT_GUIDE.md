# VPS Deployment Guide for TechNova Simulator

## Prerequisites
- VPS with Ubuntu/Debian (or similar Linux distro)
- Domain name pointed to your VPS IP
- SSH access to your VPS
- Basic familiarity with Linux commands

## Step 1: Connect to Your VPS

```bash
ssh root@your-vps-ip
# or
ssh username@your-vps-ip
```

## Step 2: Install Required Software

### Install Nginx (Recommended Web Server)
```bash
sudo apt update
sudo apt install nginx -y
```

### Install Git (to clone the project)
```bash
sudo apt install git -y
```

## Step 3: Set Up the Website Directory

```bash
# Create directory for your website
sudo mkdir -p /var/www/technova
cd /var/www/technova

# Copy the teknova-sim folder to your VPS
# Option A: If you have it in a git repo
git clone https://github.com/yourusername/teknova-sim.git .

# Option B: Upload via SCP from your local machine (run this locally)
# scp -r teknova-sim/* username@your-vps-ip:/var/www/technova/

# Option C: Use rsync (run this locally) - better for large transfers
# rsync -avz teknova-sim/ username@your-vps-ip:/var/www/technova/
```

## Step 4: Upload Files Manually (if not using git)

From your local machine:
```bash
# Navigate to your project directory locally
cd /home/michael/Downloads/teknova-sim

# Upload all files to VPS
rsync -avz --progress teknova-sim/ root@your-vps-ip:/var/www/technova/

# Or use SCP
scp -r teknova-sim/* root@your-vps-ip:/var/www/technova/
```

## Step 5: Set Proper Permissions

On your VPS:
```bash
# Set ownership to www-data (nginx user)
sudo chown -R www-data:www-data /var/www/technova

# Set proper permissions
sudo find /var/www/technova -type d -exec chmod 755 {} \;
sudo find /var/www/technova -type f -exec chmod 644 {} \;
```

## Step 6: Configure Nginx

Create a new Nginx configuration:
```bash
sudo nano /etc/nginx/sites-available/technova
```

Add this configuration (replace `your-domain.com` with your actual domain):
```nginx
server {
    listen 80;
    listen [::]:80;
    
    server_name your-domain.com www.your-domain.com;
    
    root /var/www/technova;
    index briefing.html index.html;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    location / {
        try_files $uri $uri/ =404;
    }
    
    # Cache static assets
    location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
    
    # Disable access to hidden files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
    
    # Redirect root to briefing page
    location = / {
        return 301 /briefing.html;
    }
}
```

Enable the site:
```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/technova /etc/nginx/sites-enabled/

# Remove default site if needed
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

## Step 7: Set Up SSL with Let's Encrypt (Recommended)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate (replace with your domain)
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Follow the prompts:
# - Enter your email
# - Agree to terms
# - Choose whether to redirect HTTP to HTTPS (recommended: yes)
```

## Step 8: Configure Firewall

```bash
# If using UFW
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

## Step 9: Test Your Deployment

1. Visit `http://your-domain.com` (should redirect to briefing.html)
2. Check that the chat button appears
3. Test navigation between pages
4. Verify all internal evidence pages load
5. Test the student worksheet

## Step 10: Optional - Set Up Basic Authentication (for testing)

If you want to password-protect during testing:

```bash
# Install apache2-utils for htpasswd
sudo apt install apache2-utils -y

# Create password file
sudo htpasswd -c /etc/nginx/.htpasswd testuser

# Add to your nginx config (inside server block):
location / {
    auth_basic "Restricted Access";
    auth_basic_user_file /etc/nginx/.htpasswd;
    try_files $uri $uri/ =404;
}

# Reload nginx
sudo systemctl reload nginx
```

## Troubleshooting

### Files not loading?
```bash
# Check file permissions
ls -la /var/www/technova/

# Check nginx error log
sudo tail -f /var/log/nginx/error.log

# Verify nginx is running
sudo systemctl status nginx
```

### 404 errors on internal pages?
```bash
# Ensure all files were uploaded
find /var/www/technova -name "*.html" | wc -l
# Should show ~15 HTML files
```

### Chat not working?
- Check browser console for JavaScript errors
- Ensure personas.js and chatbot.js are loading
- Verify file paths are correct

### Domain not working?
```bash
# Check DNS propagation
dig your-domain.com

# Verify nginx is listening
sudo netstat -tlnp | grep 80
```

## Monitoring & Maintenance

### View Access Logs
```bash
sudo tail -f /var/log/nginx/access.log
```

### Update Content
```bash
cd /var/www/technova
# Edit files as needed
sudo nano index.html

# Or re-sync from local
rsync -avz --delete teknova-sim/ root@your-vps-ip:/var/www/technova/
```

### Backup Your Site
```bash
# Create backup
sudo tar -czf technova-backup-$(date +%Y%m%d).tar.gz /var/www/technova/

# Download backup to local machine (run locally)
scp root@your-vps-ip:~/technova-backup-*.tar.gz .
```

## Quick Deployment Script

Save this as `deploy.sh` on your local machine:

```bash
#!/bin/bash

# Configuration
VPS_USER="root"
VPS_IP="your-vps-ip"
LOCAL_DIR="/home/michael/Downloads/teknova-sim/teknova-sim"
REMOTE_DIR="/var/www/technova"

echo "Deploying TechNova Simulator to VPS..."

# Sync files
rsync -avz --delete --progress \
    --exclude '.git' \
    --exclude '.DS_Store' \
    --exclude 'deploy.sh' \
    "$LOCAL_DIR/" "$VPS_USER@$VPS_IP:$REMOTE_DIR/"

# Fix permissions
ssh "$VPS_USER@$VPS_IP" "sudo chown -R www-data:www-data $REMOTE_DIR"
ssh "$VPS_USER@$VPS_IP" "sudo find $REMOTE_DIR -type d -exec chmod 755 {} \;"
ssh "$VPS_USER@$VPS_IP" "sudo find $REMOTE_DIR -type f -exec chmod 644 {} \;"

echo "Deployment complete!"
echo "Visit: http://your-domain.com"
```

Make it executable:
```bash
chmod +x deploy.sh
./deploy.sh
```

## Security Considerations

1. **Change default SSH port** (optional but recommended)
2. **Use SSH keys** instead of passwords
3. **Keep system updated**: `sudo apt update && sudo apt upgrade`
4. **Regular backups** of your content
5. **Monitor access logs** for unusual activity
6. **Consider adding rate limiting** to prevent abuse

## Success Checklist

- [ ] VPS is accessible via SSH
- [ ] Nginx installed and running
- [ ] Files uploaded to `/var/www/technova`
- [ ] Proper permissions set
- [ ] Nginx configured with your domain
- [ ] SSL certificate installed
- [ ] Domain resolves to your VPS
- [ ] Briefing page loads at root domain
- [ ] All internal pages accessible
- [ ] Chat functionality working
- [ ] Student worksheet saves data

## Support Resources

- [Nginx Documentation](https://nginx.org/en/docs/)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
- [DigitalOcean Tutorials](https://www.digitalocean.com/community/tutorials)
- [Ubuntu Server Guide](https://ubuntu.com/server/docs)

---

Your TechNova Simulator should now be live at `https://your-domain.com`!