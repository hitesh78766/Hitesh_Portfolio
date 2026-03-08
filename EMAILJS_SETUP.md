# 📧 EmailJS Contact Form Setup Guide

## 🚀 Quick Setup (5 Minutes)

### Step 1: Install EmailJS
```bash
npm install @emailjs/browser react-hot-toast
```

### Step 2: Get Your EmailJS Keys

#### 2.1 Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up"** and create a free account
3. Verify your email

#### 2.2 Connect Your Email Service
1. In EmailJS dashboard, click **"Email Services"** (left sidebar)
2. Click **"Add New Service"**
3. Choose your email provider (Gmail recommended)
4. Click **"Connect"** and follow the instructions
5. **Copy your Service ID** (looks like: `service_123456`)

#### 2.3 Create Email Template
1. Click **"Email Templates"** (left sidebar)
2. Click **"Create New Template"**
3. **Template Name:** `Portfolio Contact`
4. **Subject:** `New message from {{from_name}}`
5. **Email Content:**
```
From: {{from_email}}
Message: {{message}}

---
Sent from your portfolio contact form
```
6. Click **"Save"**
7. **Copy your Template ID** (looks like: `template_123456`)

#### 2.4 Get Your Public Key
1. Click **"Account"** (left sidebar, scroll down)
2. **Copy your Public Key** (long string of letters/numbers)

### Step 3: Update Your Code

#### 3.1 Update Contact.tsx
Replace these lines in `src/sections/Contact.tsx`:

```typescript
// Line 23-25 - Replace with your actual keys
const serviceID = 'YOUR_SERVICE_ID_HERE';
const templateID = 'YOUR_TEMPLATE_ID_HERE'; 
const publicKey = 'YOUR_PUBLIC_KEY_HERE';
```

**Example:**
```typescript
const serviceID = 'service_p15usfn';
const templateID = 'template_ql8s77v';
const publicKey = 'qSGXzdjPJiwMFl0b0';
```

#### 3.2 Update Email Address
Change line 31 to your email:
```typescript
to_email: 'your-email@gmail.com',
```

### Step 4: Test Your Form

#### 4.1 Run Your Portfolio
```bash
npm run dev
```

#### 4.2 Test Contact Form
1. Go to your Contact section
2. Fill out the form with test data
3. Click **"Send Message"**
4. Check your email inbox

## 🔧 Troubleshooting

### ❌ "The Public Key is invalid"
**Solution:** Re-copy your public key from EmailJS Account page

### ❌ "400 Bad Request"  
**Solution:** Check your Service ID and Template ID are correct

### ❌ "Email not sending"
**Solution:** Make sure your email service is connected in EmailJS

### ❌ "Template variables not working"
**Solution:** Ensure your template uses `{{from_name}}`, `{{from_email}}`, `{{message}}`

## 📋 What You Need (Summary)

| Item | Where to Find | Example |
|------|---------------|---------|
| Service ID | Email Services → Your Service | `service_p15usfn` |
| Template ID | Email Templates → Your Template | `template_ql8s77v` |
| Public Key | Account → Public Key | `qSGXzdjPJiwMFl0b0` |

## 🎯 Quick Copy-Paste Template

```typescript
// In Contact.tsx - handleSubmit function
const serviceID = 'service_YOUR_ID';
const templateID = 'template_YOUR_ID';
const publicKey = 'YOUR_PUBLIC_KEY';

await emailjs.send(serviceID, templateID, {
  from_name: formState.name,
  from_email: formState.email,
  message: formState.message,
  to_email: 'your-email@gmail.com',
}, publicKey);
```

## 🎉 Success!

Your contact form will now:
- ✅ Send emails to your inbox
- ✅ Show beautiful toast notifications  
- ✅ Handle errors gracefully
- ✅ Work on all devices

## 📞 Need Help?

- **EmailJS Documentation:** [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- **Common Issues:** Check Service ID, Template ID, and Public Key are correct
- **Test First:** Always test with real form submission

## 🎯 How to Use Your Contact Form (Simple Steps)

### Step 1: Visitor Fills Form
- User goes to your Contact section
- Types their **Name**, **Email**, and **Message**
- Clicks **"Send Message"** button

### Step 2: Form Sends Email
- Form data goes to EmailJS
- EmailJS formats the message
- Email arrives in your inbox

### Step 3: You Get Email
You'll receive an email like:
```
From: John Doe <john@example.com>
Subject: New message from John Doe

Message: Hi, I love your portfolio! I'd like to hire you.

---
Sent from your portfolio contact form
```

### Step 4: User Sees Success
- Green toast notification: "Message sent successfully!"
- Form automatically clears
- User knows their message was sent

## 📱 What Your Visitors See

### ✅ Success Flow:
1. **Fill form** → Type name, email, message
2. **Click send** → Button shows loading spinner
3. **See success** → Green toast notification appears
4. **Form clears** → Ready for next message

### ❌ Error Flow:
1. **Fill form** → Type information
2. **Click send** → Button shows loading spinner  
3. **See error** → Red toast notification with error
4. **Try again** → Form stays filled, user can retry

## 🔔 Toast Notifications

### ✅ Success (Green):
```
✅ Message sent successfully! I'll get back to you soon.
```

### ❌ Errors (Red):
```
❌ EmailJS configuration error. Please check your Public Key.
❌ Invalid request. Please check your EmailJS configuration.
❌ Failed to send message. Please try again later.
```

## 🎨 User Experience

### Before Sending:
- Clean form with floating labels
- Smooth focus animations
- Professional dark theme design

### During Sending:
- Loading spinner on button
- Button text changes to "Sending..."
- User can't submit twice

### After Sending:
- Beautiful success notification
- Form automatically resets
- Ready for next message

## 📧 What You Receive

### Email Format:
```
Subject: New message from [Sender Name]

From: [Sender Email]
Message: [Sender Message]

---
Sent from your portfolio contact form
```

### When You Get Emails:
- Check your inbox regularly
- Reply to the sender's email directly
- No need to log into EmailJS

## 🚀 That's It!

Your contact form works automatically:
1. **User fills form** → **You get email**
2. **No extra steps** → **No manual work**
3. **Professional appearance** → **Happy visitors**

---

**That's it! Your contact form is ready to receive messages automatically! 🎉**
