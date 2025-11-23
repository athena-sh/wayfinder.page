---
title: "Keep Your Inbox Clutter-Free: Automate Email Deletion in Gmail"
description: Effortlessly & automatically delete Gmail emails with Google Apps Script through our simple guide — Ideal for managing time-sensitive notifications like stock updates or GitHub alerts.
published: 2024-11-28
draft: false
tags:
  - AI
#image: "./heroImage.jpg"
category: "Guides"
lang: ""
---


_Do you ever find your Gmail inbox cluttered with emails that are only relevant for a short period?_


## Preface

<!-- ![Crafted using Athena's imaginative AI prompts on theMidjourneyplatform.](https://res.cloudinary.com/ddicetqs5/image/upload/c_fill,f_auto,fl_force_strip,q_auto:best/v1763925910/wayfinder-images/coluddqzuzv2n85fx3pz) -->

Think about those balance notifications from a highly fluctuating account, up-to-the-minute stock quotes, or short-lived discount offers.

These messages are essential momentarily but quickly lose their value. Wouldn't it be great if these emails could just vanish on their own after serving their purpose?

Well, with a simple Google Apps Script,

🪜 You can automate this process and keep your inbox streamlined.

Here's how you can set it up, even with just a basic level of IT know-how: 👇

### Step 1: Open Google Apps Script

Navigate to Google Apps Script and log in with your Google account. Then, start a new project by clicking `New Project`.

### Step 2: Paste the Script

In the script editor (a blank file named `Code.gs`), paste the following script:

```js
function deleteEmails() {
    var label = GmailApp.getUserLabelByName("YourLabelHere"); // Replace 'YourLabelHere' with your label name
    var interval = 5;  // Interval in minutes
    var date = new Date();
    var timeToCheck = date.getTime() - 1000 * 60 * interval; // Calculate 5 minutes ago
    var threads = label.getThreads();

    for (var i = 0; i < threads.length; i++) {
        if (threads[i].getLastMessageDate().getTime() < timeToCheck) {
            threads[i].moveToTrash();
        }
    }
}
```

### Step 3: Customize the Script

Modify the script by replacing `'YourLabelHere'` with the name of the Gmail label you want to target.

### Step 4: Set Up a Trigger

Create an automatic trigger for the script:

- Click the clock icon on the left sidebar to open `Triggers`.
- At the bottom right corner, click `Add Trigger`.
- Select the `deleteEmails` function.
- Choose `Time-driven`, `Minutes timer`, and the interval as `Every 5 minutes`.

### Step 5: Save and Authorize

Save your project. Run the script once manually for authorization   —  a key step for operational functionality.

### Step 6: Testing

Test the script with a non-essential email labeled as specified. Wait for 5 minutes to check if it gets automatically deleted.

## Final Thoughts

![Crafted using Athena's imaginative AI prompts on theMidjourneyplatform.](https://res.cloudinary.com/ddicetqs5/image/upload/c_fill,f_auto,fl_force_strip,q_auto:best/v1763925912/wayfinder-images/kfgqsgobc705nwptqbjc)

My use case for this script is managing GitHub Actions notifications. These alerts are crucial to know when a workflow has finished.

Still, the notification content itself isn't needed after a short period. So, I've set the duration for deletion at 5 minutes. This little automation keeps my inbox clean and focused, letting me stay on top of what's important without the clutter of outdated notifications.

Remember, this script is powerful and will delete emails, so use it wisely. First, ensure you test it thoroughly with non-critical emails and remain within Google's usage limits and policies.

Here's to a more organized and efficient email experience! 🍷 🥂🎉 ✨

## FAQ

#### **How can I automatically delete emails in Gmail?**

Automate your email deletion in Gmail by using Google Apps Script. This guide provides a step-by-step process to set up a script that deletes emails based on specific labels after a set time, perfect for managing short-lived emails.

#### **Is it possible to delete emails from a specific label in Gmail automatically?**

Yes, you can set up Google Apps Script to automatically delete emails from a specific Gmail label. Customize the script provided in our guide to target the label of your choice.

#### **What are some common use cases for automatically deleting Gmail emails?**

Common use cases include managing notifications from fluctuating accounts, stock quotes, limited-time offers, and GitHub Actions notifications, which are only relevant briefly.

#### **Is this automated email deletion process suitable for non-technical users?**

Absolutely! Our guide is tailored for users with low to mid-level IT knowledge, making it accessible for anyone looking to streamline their email management.

#### **How often can I set the script to check and delete emails?**

You can customize the script to match and delete emails at various intervals. Our guide specifically shows you how to set it up for a 5-minute interval, which is ideal for very time-sensitive emails.

#### **Is using Google Apps Script to delete emails safe?**

Yes, it's safe but requires cautious use. Our guide emphasizes testing the script with non-critical emails first and ensuring compliance with Google's usage policies.

---

_Originally published on December 30, 2023._

_Gmail is a trademark of Google LLC. Wayfinder publications are not affiliated with, endorsed by, or sponsored by Google LLC._
