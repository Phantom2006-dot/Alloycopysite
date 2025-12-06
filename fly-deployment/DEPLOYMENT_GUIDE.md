# BAUHAUS Backend Deployment Guide for Fly.io

This guide provides step-by-step instructions to deploy the BAUHAUS backend to Fly.io as a standalone API server.

---

## Prerequisites

1. A Fly.io account (sign up at https://fly.io)
2. A PostgreSQL database (you can create one on Fly.io or use an external provider like Neon, Supabase, etc.)
3. Cloudinary account for media storage
4. Flutterwave account for payment processing (optional)

---

## Step 1: Install Fly.io CLI

**macOS/Linux:**
```bash
curl -L https://fly.io/install.sh | sh
```

**Windows (PowerShell):**
```powershell
iwr https://fly.io/install.ps1 -useb | iex
```

**Homebrew (macOS):**
```bash
brew install flyctl
```

---

## Step 2: Authenticate with Fly.io

```bash
fly auth login
```

This opens your browser to log in. Once authenticated, return to your terminal.

---

## Step 3: Prepare Your Project Files

Copy these files from the `fly-deployment` folder to your project root:

1. **Dockerfile** - Copy `fly-deployment/Dockerfile` to your project root
2. **.dockerignore** - Copy `fly-deployment/.dockerignore` to your project root
3. **fly.toml** - Copy `fly-deployment/fly.toml` to your project root

Your project root should have:
```
├── Dockerfile
├── .dockerignore
├── fly.toml
├── package.json
├── server/
├── shared/
├── drizzle.config.ts
└── tsconfig.json
```

---

## Step 4: Create Your Fly.io App

Navigate to your project root and run:

```bash
fly launch --no-deploy
```

When prompted:
- **App name**: Enter a unique name (e.g., `bauhaus-backend`) or leave blank for auto-generated
- **Region**: Choose the closest region to your users (e.g., `lhr` for London, `iad` for Virginia)
- **Database**: Select "No" (we'll set up the database separately)

This creates the `fly.toml` configuration file. If you already copied the one from `fly-deployment`, it will ask to overwrite - you can keep the existing one.

---

## Step 5: Create a PostgreSQL Database on Fly.io

Create a Postgres database:

```bash
fly postgres create --name bauhaus-db
```

When prompted:
- **Region**: Same region as your app
- **Configuration**: Choose "Development" for testing or "Production" for live use

Attach the database to your app:

```bash
fly postgres attach bauhaus-db --app bauhaus-backend
```

This automatically sets the `DATABASE_URL` secret for your app.

---

## Step 6: Set Environment Variables (Secrets)

Set all required secrets using the `fly secrets set` command:

### Required Secrets:

```bash
# Database (automatically set if using Fly Postgres)
# If using external database, set manually:
fly secrets set DATABASE_URL="postgresql://username:password@host:5432/database?sslmode=require"

# API Key for frontend-to-backend communication (generate a secure random string)
fly secrets set CMS_API_KEY="your-secure-api-key-here"

# JWT Secret for authentication (generate a secure random string)
fly secrets set JWT_SECRET="your-secure-jwt-secret-here"

# Cloudinary (required for media uploads)
fly secrets set CLOUDINARY_CLOUD_NAME="your-cloud-name"
fly secrets set CLOUDINARY_API_KEY="your-api-key"
fly secrets set CLOUDINARY_API_SECRET="your-api-secret"

# CORS - Allow your frontend domains
fly secrets set ALLOWED_ORIGINS="https://your-frontend-domain.com,https://www.your-frontend-domain.com"
```

### Optional Secrets (for payments):

```bash
# Flutterwave (for payment processing)
fly secrets set FLW_PUBLIC_KEY="FLWPUBK-xxxxxxxxxxxxx"
fly secrets set FLW_SECRET_KEY="FLWSECK-xxxxxxxxxxxxx"
fly secrets set FLW_SECRET_HASH="your-webhook-secret-hash"
```

### Verify your secrets:

```bash
fly secrets list
```

---

## Step 7: Deploy Your App

Deploy the application:

```bash
fly deploy
```

This will:
1. Build the Docker image
2. Push it to Fly.io
3. Deploy your backend

Deployment typically takes 2-5 minutes.

---

## Step 8: Initialize the Database

After deployment, run the database migrations and seed:

### Push the database schema:

```bash
fly ssh console --app bauhaus-backend
```

Once connected, run:

```bash
npx drizzle-kit push
```

Then seed the database with admin user:

```bash
npx tsx server/seed.ts
```

Exit the SSH session:

```bash
exit
```

**Alternative method** (run commands without SSH):

```bash
fly ssh console -C "npx drizzle-kit push" --app bauhaus-backend
fly ssh console -C "npx tsx server/seed.ts" --app bauhaus-backend
```

---

## Step 9: Verify Deployment

Check your app status:

```bash
fly status
```

Open your app in browser:

```bash
fly open
```

Test the health endpoint:

```bash
curl https://your-app-name.fly.dev/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-12-06T...",
  "version": "1.0.0",
  "mode": "standalone"
}
```

---

## Admin Credentials

The database is seeded with the following admin account:

| Field | Value |
|-------|-------|
| **Username** | admin |
| **Password** | admin123 |
| **Email** | admin@bauhaus.ng |
| **Role** | super_admin |

**IMPORTANT**: Change the admin password after first login for security!

---

## Environment Variables Summary

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `CMS_API_KEY` | Yes | API key for frontend authentication |
| `JWT_SECRET` | Yes | Secret for JWT token signing |
| `BACKEND_MODE` | Yes | Set to `standalone` (already in fly.toml) |
| `PORT` | Yes | Set to `8080` (already in fly.toml) |
| `NODE_ENV` | Yes | Set to `production` (already in fly.toml) |
| `CLOUDINARY_CLOUD_NAME` | Yes | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Yes | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Yes | Cloudinary API secret |
| `ALLOWED_ORIGINS` | Yes | Comma-separated list of allowed frontend domains |
| `FLW_PUBLIC_KEY` | No | Flutterwave public key (for payments) |
| `FLW_SECRET_KEY` | No | Flutterwave secret key (for payments) |
| `FLW_SECRET_HASH` | No | Flutterwave webhook hash (for payments) |

---

## Connecting Your Frontend

Update your frontend's `.env` file:

```env
VITE_API_URL=https://your-app-name.fly.dev/api
VITE_API_KEY=your-secure-api-key-here
```

Your frontend will use these to communicate with the backend.

---

## Useful Fly.io Commands

| Command | Description |
|---------|-------------|
| `fly status` | Check app status |
| `fly logs` | View real-time logs |
| `fly logs --app bauhaus-backend` | View logs for specific app |
| `fly ssh console` | SSH into your VM |
| `fly deploy` | Re-deploy after changes |
| `fly scale count 2` | Scale to 2 instances |
| `fly scale memory 1024` | Increase memory to 1GB |
| `fly secrets list` | List all secrets |
| `fly secrets set KEY=value` | Set a secret |
| `fly secrets unset KEY` | Remove a secret |
| `fly apps destroy bauhaus-backend` | Delete the app |

---

## Troubleshooting

### App won't start
1. Check logs: `fly logs`
2. Verify all required secrets are set: `fly secrets list`
3. Make sure DATABASE_URL is correct

### Database connection issues
1. Verify database is running: `fly postgres list`
2. Check connection string format
3. Ensure SSL mode is enabled for external databases

### CORS errors
1. Add your frontend domain to `ALLOWED_ORIGINS`
2. Include both `https://domain.com` and `https://www.domain.com`

### Build failures
1. Check Dockerfile syntax
2. Ensure all required files are not in `.dockerignore`
3. Review build logs: `fly logs`

---

## Cost Estimate (Fly.io)

Fly.io offers a generous free tier:
- 3 shared-cpu-1x VMs (256MB RAM each)
- 3GB persistent storage
- 160GB outbound transfer/month

For this backend:
- **Free tier**: Suitable for development/testing
- **Production**: ~$5-10/month for a small VM with Postgres

---

## Security Recommendations

1. **Change admin password** immediately after deployment
2. **Use strong secrets** for `CMS_API_KEY` and `JWT_SECRET` (32+ characters)
3. **Limit CORS origins** to only your frontend domains
4. **Enable HTTPS** (Fly.io does this automatically)
5. **Monitor logs** regularly for suspicious activity

---

## Quick Start Checklist

- [ ] Install Fly CLI
- [ ] Login to Fly.io
- [ ] Copy deployment files to project root
- [ ] Run `fly launch --no-deploy`
- [ ] Create Postgres database
- [ ] Attach database to app
- [ ] Set all required secrets
- [ ] Run `fly deploy`
- [ ] Push database schema
- [ ] Seed database with admin user
- [ ] Test health endpoint
- [ ] Login with admin credentials
- [ ] Update frontend environment variables
