# Google Sheets Form Integration Setup

This guide will help you connect the registration form to Google Sheets and receive email notifications.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Takalam Registrations" (or any name you prefer)
4. In the first row, add these headers (exactly as shown):

| A | B | C | D | E | F | G | H | I | J | K | L |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Timestamp | First Name | Family Name | Phone | Email | Age | Sex | Country | City | Package | Message | Payment Status |

## Step 2: Create the Google Apps Script

1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. Delete any code in the editor
3. Copy and paste the following code:

```javascript
// Configuration
const SHEET_NAME = 'Sheet1'; // Change if your sheet has a different name
const EMAIL_TO = 'takalamenglishcenter@gmail.com';

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const data = JSON.parse(e.postData.contents);
    
    // Add row to sheet
    sheet.appendRow([
      new Date().toLocaleString('en-GB', { timeZone: 'Africa/Casablanca' }),
      data.firstName,
      data.familyName,
      data.phone,
      data.email,
      data.age,
      data.sex,
      data.country,
      data.city,
      data.package,
      data.message || '',
      data.paymentStatus || 'Pending'
    ]);
    
    // Send email notification
    sendEmailNotification(data);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendEmailNotification(data) {
  const subject = `🎓 New Registration: ${data.firstName} ${data.familyName} - ${data.package}`;
  
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #16a34a; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">New Student Registration</h1>
      </div>
      
      <div style="padding: 30px; background: #f9fafb;">
        <div style="background: #dcfce7; border: 1px solid #16a34a; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
          <h3 style="color: #16a34a; margin: 0 0 5px 0;">📦 Package Selected</h3>
          <p style="font-size: 18px; font-weight: bold; margin: 0; color: #1f2937;">${data.package}</p>
        </div>
        
        <h2 style="color: #1f2937; margin-top: 0;">Contact Information</h2>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; width: 40%;">Name:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${data.firstName} ${data.familyName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Phone:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">
              <a href="https://wa.me/${data.phone.replace(/[^0-9]/g, '')}" style="color: #16a34a;">${data.phone}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Email:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">
              <a href="mailto:${data.email}" style="color: #16a34a;">${data.email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Age:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${data.age}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Sex:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${data.sex}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Location:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${data.city}, ${data.country}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Payment Status:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">
              <span style="background: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 20px; font-size: 12px;">
                ${data.paymentStatus || 'Awaiting screenshot'}
              </span>
            </td>
          </tr>
        </table>
        
        ${data.message ? `
        <h3 style="color: #1f2937; margin-top: 20px;">Message:</h3>
        <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb;">
          ${data.message}
        </div>
        ` : ''}
        
        <div style="margin-top: 30px; text-align: center;">
          <a href="https://wa.me/${data.phone.replace(/[^0-9]/g, '')}" 
             style="display: inline-block; background: #25D366; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 25px; font-weight: bold; margin-right: 10px;">
            📱 WhatsApp
          </a>
          <a href="mailto:${data.email}" 
             style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 25px; font-weight: bold;">
            ✉️ Email
          </a>
        </div>
      </div>
      
      <div style="background: #1f2937; padding: 15px; text-align: center;">
        <p style="color: #9ca3af; margin: 0; font-size: 12px;">
          This registration was submitted via the Takalam website
        </p>
      </div>
    </div>
  `;
  
  GmailApp.sendEmail(EMAIL_TO, subject, '', {
    htmlBody: htmlBody,
    name: 'Takalam Website'
  });
}

// Test function - run this manually to test
function testDoPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        firstName: 'Test',
        familyName: 'User',
        phone: '+212600000000',
        email: 'test@example.com',
        age: '25',
        sex: 'Male',
        country: 'Morocco',
        city: 'Casablanca',
        package: 'Monthly Package - 2200 DHS',
        message: 'This is a test message',
        paymentStatus: 'Awaiting screenshot via WhatsApp'
      })
    }
  };
  
  doPost(testData);
}
```

4. Click **Save** (💾 icon) and name the project "Takalam Form Handler"

## Step 3: Deploy the Script

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**
3. Configure:
   - **Description**: "Takalam Form Handler"
   - **Execute as**: "Me (your email)"
   - **Who has access**: "Anyone"
4. Click **Deploy**
5. **Authorize** the app when prompted (click through the warnings - it's safe, it's your own script)
6. **Copy the Web app URL** - it looks like:
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```

## Step 4: Update the Website

1. Open `app/components/Contact.tsx`
2. Find this line (around line 93):
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
   ```
3. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL` with your actual URL:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby.../exec';
   ```
4. Save the file

## Step 5: Test

1. Submit a test form on your website
2. Check your Google Sheet for the new entry
3. Check your email for the notification

## What Gets Stored

Each registration creates a row with:
- **Timestamp** - When the form was submitted
- **First Name** - Student's first name
- **Family Name** - Student's family name
- **Phone** - Phone number (with WhatsApp link in email)
- **Email** - Email address
- **Age** - Student's age
- **Sex** - Male/Female/Prefer not to say
- **Country** - Country of residence
- **City** - City of residence
- **Package** - Selected package (e.g., "Monthly Package - 2200 DHS")
- **Message** - Any additional message
- **Payment Status** - Initially "Awaiting screenshot via WhatsApp"

## Updating Payment Status

After receiving payment confirmation via WhatsApp:
1. Open your Google Sheet
2. Find the student's row
3. Update the "Payment Status" column to "Paid" or "Confirmed"

## Troubleshooting

### Form not submitting?
- Make sure the script URL is correct (no extra spaces)
- Check browser console for errors (F12 → Console)
- Verify the script is deployed as "Anyone can access"

### Not receiving emails?
- Check your spam folder
- Verify the EMAIL_TO address in the script
- Run the `testDoPost()` function in Apps Script to test

### Data not appearing in sheet?
- Make sure the sheet name matches `SHEET_NAME` in the script (default: "Sheet1")
- Check that all 12 headers are in row 1
- Look at the Apps Script execution logs for errors

### Need to update the script?
1. Make your changes in Apps Script
2. Click **Deploy** → **Manage deployments**
3. Click the ✏️ edit icon
4. Select "New version" from the dropdown
5. Click **Deploy**

## Security Notes

- The script URL is public but only accepts POST requests with specific data
- All data is stored in your private Google Sheet
- Emails are sent only to your specified address
- No sensitive data is exposed

---

## Quick Reference

| Setting | Value |
|---------|-------|
| Email | takalamenglishcenter@gmail.com |
| Sheet Name | Sheet1 |
| Timezone | Africa/Casablanca |
| Headers | Timestamp, First Name, Family Name, Phone, Email, Age, Sex, Country, City, Package, Message, Payment Status |
