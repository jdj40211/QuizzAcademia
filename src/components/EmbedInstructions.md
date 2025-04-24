# How to Embed the Experience Prime Quiz

This vocabulary quiz can be embedded in your Framer site using an iframe. Here are the instructions:

## Step 1: Deploy to Vercel

1. Sign up for a [Vercel account](https://vercel.com/signup) if you don't have one
2. Connect your GitHub, GitLab, or Bitbucket account
3. Import this project to Vercel
4. Deploy the project
5. After deployment, Vercel will provide you with a deployment URL

## Step 2: Embed in Framer

1. In your Framer project, add a new HTML embed component
2. Use the following code, replacing `YOUR_VERCEL_URL` with your actual deployment URL:

```html
<iframe 
  src="YOUR_VERCEL_URL" 
  width="100%" 
  height="600px" 
  frameborder="0"
  style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);"
></iframe>
```

3. Adjust the height as needed to fit your design

## Collecting Email Addresses

When users submit the quiz with their email address, this data can be:

1. Stored in a database connected to your application
2. Sent to an email service
3. Integrated with a CRM or marketing platform

The current implementation simulates data collection, but for production, you would need to add API endpoints to your backend to handle and store the submission data.

Vercel provides serverless functions that can be used to create these endpoints without setting up a separate server.