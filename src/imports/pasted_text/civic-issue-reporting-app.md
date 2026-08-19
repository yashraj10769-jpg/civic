# Build a Complete Government Civic Issue Reporting & Resolution Web Application

Design and prototype a complete, production-quality responsive web application for a government civic issue reporting and resolution platform.

The platform allows ordinary citizens to report civic problems such as potholes, garbage accumulation, broken streetlights, damaged roads, water leakage, drainage problems, illegal dumping, traffic issues, public infrastructure damage, and other local civic problems.

The website should look and feel like an **official Indian government digital service portal**, but it must have a modern, clean, highly usable interface suitable for both technically educated and less-educated citizens.

Do NOT make it look like a generic startup, social media platform, or flashy SaaS dashboard.

The visual identity should communicate:

* Government
* Trust
* Transparency
* Accessibility
* Public service
* Accountability
* Technology
* Reliability

Use a professional government-style design system with:

* White/light backgrounds
* Deep blue/navy as the primary government color
* Subtle saffron and green accents inspired by the Indian national color palette, but do not overuse them
* Government-style typography
* High contrast
* Clear borders
* Accessible buttons
* Large readable text
* Proper spacing
* Professional cards
* Subtle shadows
* Minimal gradients
* No excessive glassmorphism
* No excessive animations
* No unnecessary decorative elements

The application must be fully responsive for:

* Desktop
* Laptop
* Tablet
* Mobile

==================================================

1. APPLICATION NAME
   ==================================================

Use the fictional platform name:

"CivicSetu"

Subtitle:

"Connecting Citizens. Resolving Communities."

Add a small label:

"Government of Jharkhand"

The platform should be presented as a government civic grievance reporting and resolution system.

Do not use real government logos unless they are explicitly provided. Instead create a professional placeholder government emblem area labelled:

"Government of Jharkhand"

==================================================
2. GLOBAL NAVIGATION
====================

Create a consistent navigation system across the entire application.

Desktop navigation:

Left:

* Government emblem placeholder
* Government of Jharkhand
* CivicSetu
* "Citizen Civic Issue Platform"

Center navigation:

* Home
* Report Issue
* Track Complaint
* Map
* Community
* About

Right:

* Language selector
* Accessibility button
* Notifications
* Login

Add a prominent primary button:

"Report an Issue"

Mobile navigation:

* Government branding at top
* Hamburger menu
* Report Issue button
* Notification icon
* Login/Profile icon

Create smooth but subtle page transitions.

Animations should be:

* 150–300ms
* Ease-in-out
* Professional
* Never distracting

==================================================
3. LANDING PAGE
===============

Create a highly polished government portal homepage.

Hero section:

Heading:

"Your Voice. Your Community. Your Government."

Subheading:

"Report civic issues in your area and help authorities build safer, cleaner and better communities."

Primary CTA:

"Report a Civic Issue"

Secondary CTA:

"Track My Complaint"

Add a large civic illustration/map visualization showing:

* Roads
* Houses
* Civic infrastructure
* Issue markers
* Government response indicators

Add a small trust indicator:

"Transparent • Accountable • Community Powered"

Below the hero create a statistics section:

"Platform at a Glance"

Cards:

* Total Issues Reported
* Issues Resolved
* Active Issues
* Citizens Participating
* Average Resolution Time

Use realistic placeholder numbers.

Example:

24,860
Issues Reported

18,430
Issues Resolved

4,120
Active Issues

12,650
Active Citizens

3.8 Days
Average Resolution

==================================================
4. HOW IT WORKS
===============

Create a 4-step government service workflow.

Step 1:
"Report"
Citizen reports a civic issue using text, image, location or voice.

Step 2:
"Verify"
The platform checks the complaint and identifies duplicate/similar reports.

Step 3:
"Resolve"
The responsible department receives and processes the issue.

Step 4:
"Track"
Citizen tracks the complaint until resolution.

Use simple icons and visual connectors.

==================================================
5. CITIZEN LOGIN
================

Create a dedicated Citizen Login page.

Title:

"Citizen Login"

Login methods:

* Mobile Number
* Email
* Password

Also provide:

"Login with OTP"

Fields:

* Mobile Number
* OTP

Buttons:
"Send OTP"
"Login"

Links:

* Forgot Password
* Create Citizen Account

Add accessibility-friendly language.

Create a simple registration flow:

Name
Mobile Number
Email
District
Ward
Password

Optional:
Profile Picture

After registration show:

"Your CivicSetu profile is ready."

==================================================
6. ADMIN LOGIN
==============

Create a completely separate Admin Login interface.

URL-style concept:

/admin/login

Title:

"Government Administration Portal"

Fields:

Official Email / Employee ID
Password

Button:

"Secure Login"

Add:

* CAPTCHA placeholder
* Two-factor authentication placeholder
* Security notice

Use a more serious administrative design.

Do not make the admin interface visually identical to the citizen interface.

==================================================
7. CITIZEN DASHBOARD
====================

After login, create the Citizen Dashboard.

Header:

"Welcome back, Citizen"

Show profile information.

Main dashboard cards:

My Reports
Reports Resolved
Reports Under Review
Civic Points
Certificates Earned

Create a large "Report an Issue" button.

Add:

"Recent Complaints"

Each complaint card should contain:

Complaint ID
Issue Type
Location
Date Reported
Current Status
Priority
Assigned Department

Statuses:

Submitted
Under Verification
Assigned
In Progress
Resolved
Rejected

Use a visual status timeline.

==================================================
8. REPORT CIVIC ISSUE PAGE
==========================

This is one of the MOST IMPORTANT pages.

Make the reporting process extremely simple.

Use a multi-step wizard.

Step 1:
"What's the problem?"

Large visual category buttons:

* Pothole / Damaged Road
* Garbage
* Streetlight
* Water Leakage
* Drainage
* Public Toilet
* Traffic
* Electricity
* Illegal Dumping
* Other

Step 2:
"Tell us what happened"

Large text area:

"Describe the problem in your own words..."

Add a large microphone button:

"Speak your Problem"

When clicked, display:

"Listening..."

Then convert speech to text and populate the description field.

Show:
Voice Input → Speech-to-Text → Complaint Description

Add language selector:

English
Hindi
Marathi

Step 3:
"Upload Evidence"

Allow:

Take Photo
Upload Photo
Upload Video

Show uploaded media previews.

Step 4:
"Where is the problem?"

Show an interactive map.

Allow:

* Detect My Location
* Search Location
* Drop Pin

Display:
Latitude
Longitude
Address

Step 5:
"Review Complaint"

Show:

Issue Type
Description
Photo
Location
Date
Reporter

Button:

"Submit Complaint"

After submission show a success page:

"Complaint Submitted Successfully"

Generate:

Complaint ID:
CIV-2026-XXXXXX

Show:

"Track Complaint"

==================================================
9. AI DUPLICATE / SIMILAR ISSUE DETECTION
=========================================

Create an AI-powered verification interface.

The purpose is to detect whether multiple citizens are reporting the same civic issue.

Example:

Citizen A:
"There is a huge pothole near the school gate."

Citizen B:
"Road is damaged near the school entrance."

Citizen C:
"Large pothole outside the school."

The AI should identify these as potentially the same issue.

Create a visual component:

"AI Similarity Detection"

Display:

New Complaint

AI Analysis

Potential Matching Complaints

Similarity Score

Example:

92% Similar
88% Similar
81% Similar

Then show:

"This complaint may already have been reported."

Buttons:

"View Existing Issue"

"Report Anyway"

"Not the Same Issue"

If confirmed as duplicate, group them under one master issue.

Example:

Master Issue:
CIV-2026-00421

Reports:
23 Citizens

Priority:
High

Community Impact:
High

Create a visual "Issue Cluster" component.

Show:

23 citizen reports
1 geographic location
1 master complaint
1 assigned department

==================================================
10. AI ADMIN MODERATION
=======================

Create an admin AI verification dashboard.

Sections:

New Reports
Potential Duplicates
Suspicious Reports
High Priority Issues
AI Confidence

Each report should show:

Complaint ID
Citizen description
Location
AI Category
AI Confidence
Duplicate Probability
Priority
Recommended Department

Example:

AI Classification:

Category:
Road Infrastructure

Confidence:
96%

Duplicate Probability:
87%

Priority:
High

Recommended Department:
Public Works Department

Admin buttons:

Approve
Merge
Reject
Escalate
Assign Department

==================================================
11. CIVIC HEATMAP / ALERT MAP
=============================

Create a major "Civic Intelligence Map" page.

Use a large interactive map interface.

Map should show:

* Issue markers
* Heatmap zones
* High-alert areas
* Resolved issues
* Active issues
* Government work locations

Legend:

Red:
Critical / High Alert

Orange:
High Issue Density

Yellow:
Moderate

Green:
Low

Blue:
Resolved

Add map filters:

Issue Type
Severity
Date
Status
Department
District
Ward

Create a side panel:

"Area Intelligence"

Example:

Area:
Ward 12

Total Reports:
146

Active:
42

Resolved:
104

High Priority:
8

Average Resolution:
3.2 Days

Top Issue:
Garbage

Create an "High Alert Areas" section.

Example:

High Alert Zone
Ward 12
68 active complaints

High Alert Zone
Ward 7
52 active complaints

High Alert Zone
Ward 18
41 active complaints

Clicking an area should zoom into the map.

==================================================
12. CITIZEN GAMIFICATION / CIVIC POINTS
=======================================

Create a Civic Points system.

Title:

"Your Civic Impact"

Users earn points for meaningful civic participation.

Example:

Submit verified issue:
+20 points

Provide useful evidence:
+10 points

Issue successfully resolved:
+30 points

Confirm duplicate:
+5 points

Community verification:
+10 points

Do not reward users simply for repeatedly submitting complaints.

Create a progress bar:

Current Points:
780

Next Level:
1000

Level:

"Civic Contributor"

Create levels:

Citizen Observer
Civic Contributor
Community Champion
Civic Leader

Create leaderboard:

"Top Civic Contributors"

Rank
Citizen
Points
Issues Reported
Issues Resolved

Use anonymized display names such as:

Citizen #1042

rather than exposing personal information.

==================================================
13. CERTIFICATE SYSTEM
======================

Create a "My Certificates" page.

Users can earn certificates for meaningful civic participation.

Examples:

"Civic Participation Certificate"

"Community Champion Certificate"

"Clean Community Contributor"

"Public Infrastructure Contributor"

Certificate cards should contain:

Citizen Name
Achievement
Points
Issue Contributions
Date
Certificate ID

Buttons:

"View Certificate"

"Download Certificate"

Create a beautiful official-looking digital certificate preview.

Do not make certificates appear as fake legal government documents; clearly label them as platform recognition certificates.

==================================================
14. COMMUNITY PAGE
==================

Create a community page showing public civic activity.

Sections:

Trending Civic Issues
Recently Resolved
High Priority Areas
Community Contributors

Allow users to see:

Issue
Location
Reports
Status
Department
Progress

Example:

"Pothole near Main Road"

23 citizens reported

Status:
Work in Progress

Do not expose private citizen information.

==================================================
15. TRACK COMPLAINT PAGE
========================

Create a public complaint tracking interface.

Input:

Complaint ID

Button:

"Track Complaint"

After searching display:

Complaint CIV-2026-00421

Issue:
Road Damage

Location:
Ward 12

Current Status:
Work in Progress

Timeline:

Submitted
↓
AI Verified
↓
Department Assigned
↓
Inspection Completed
↓
Work in Progress
↓
Resolved

Show estimated resolution date if available.

==================================================
16. ADMIN DASHBOARD
===================

Create a powerful government administrative dashboard.

Top statistics:

Total Complaints
Pending Verification
Active Issues
Resolved Issues
High Priority
Average Resolution Time

Create charts:

Issues by Category
Issues by District
Resolution Rate
Complaint Trend
Department Performance

Create an "Urgent Action Required" panel.

Example:

8 High Priority Issues

12 complaints exceeding SLA

24 unresolved duplicate clusters

Create tables for:

Recent Complaints
Department Assignments
High Priority Issues
AI Flagged Complaints

==================================================
17. ADMIN MAP
=============

Create a dedicated administrative GIS dashboard.

Left:
Interactive map

Right:
Issue intelligence panel

Filters:

District
Ward
Issue Type
Severity
Status
Department
Time Period

Allow administrators to click an issue cluster.

Show:

Cluster ID
Number of Citizens
Issue Type
Severity
Location
First Reported
Last Updated
Assigned Department
SLA Status

Buttons:

Assign
Escalate
Merge
Mark Resolved

==================================================
18. DEPARTMENT MANAGEMENT
=========================

Create an admin page:

"Department Management"

Departments:

Public Works
Sanitation
Water Supply
Electricity
Traffic
Drainage
Municipal Services

Each department card:

Active Issues
Resolved
Pending
Average Resolution Time
SLA Violations

Add:

"Assign Complaint"

interface.

==================================================
19. ISSUE DETAIL PAGE
=====================

Create a detailed issue page.

Show:

Issue ID
Issue Category
Priority
Location
Number of Citizen Reports
Description
Photos
AI Analysis
Assigned Department
Timeline

Include:

"Citizen Reports"

showing anonymized supporting reports.

Include:

"Resolution Updates"

with government work updates.

Example:

"Inspection completed"

"Repair team assigned"

"Materials dispatched"

"Work completed"

Allow admin to upload resolution evidence.

==================================================
20. NOTIFICATIONS
=================

Create notification center.

Examples:

"Your complaint CIV-2026-00421 has been assigned."

"Your complaint has been resolved."

"You earned 30 Civic Points."

"Your report was merged with an existing issue."

"High priority issue detected near your area."

Use notification categories.

==================================================
21. ACCESSIBILITY
=================

This platform must be usable by people with low digital literacy.

Create:

Large buttons
Large icons
Simple language
Minimal forms
Clear instructions
Voice input
Hindi language option
Marathi language option
English language option
High contrast mode
Text size control

Add an accessibility toolbar:

A+
A-
High Contrast
Read Aloud
Language

Use icons together with text.

Do not rely only on color to communicate status.

==================================================
22. MULTILINGUAL UI
===================

Create a language selector.

Languages:

English
हिन्दी
मराठी

The interface should support translated labels.

Example:

Report Issue
"समस्या दर्ज करें"

Track Complaint
"शिकायत ट्रैक करें"

My Reports
"मेरी शिकायतें"

==================================================
23. AI VOICE ASSISTANT
======================

Create a voice-assisted reporting experience.

Large microphone interface.

Text:

"Tell us what happened."

Example interaction:

User speaks:
"There is a broken streetlight near the railway station."

System converts it into:

"There is a broken streetlight near the railway station."

Then AI automatically suggests:

Issue Type:
Streetlight

Location:
Railway Station Area

Priority:
Medium

Add:

"Is this information correct?"

Buttons:

Yes, Continue
Edit

==================================================
24. AI ISSUE CLASSIFICATION
===========================

When a citizen submits text, simulate AI classification.

Example:

Input:
"There is garbage piling up near the market."

AI result:

Category:
Garbage / Sanitation

Confidence:
97%

Priority:
Medium

Suggested Department:
Sanitation Department

Show this in a clean AI analysis card.

==================================================
25. FAKE / LOW QUALITY REPORT DETECTION
=======================================

Create an admin interface for AI-assisted report quality detection.

AI checks:

Duplicate content
Spam
Repeated submissions
Invalid location
Missing evidence
Suspicious activity
Potentially false information

Do NOT automatically accuse citizens.

Use wording:

"Requires Verification"

instead of:

"Fake Citizen"

Show:

Verification Score
Location Confidence
Duplicate Probability
Evidence Quality

Admin makes the final decision.

==================================================
26. DESIGN SYSTEM
=================

Create reusable components for the entire application.

Components:

Government Header
Footer
Navigation
Buttons
Cards
Status Badges
Complaint Cards
Issue Cards
Map Markers
Statistics Cards
Charts
Forms
Input Fields
Dropdowns
Modal Dialogs
Toast Notifications
Progress Bars
Timelines
AI Analysis Cards
Certificate Cards
Leaderboard Cards
Accessibility Toolbar
Language Selector

Use consistent:

8px spacing system
Rounded corners approximately 6–10px
Professional typography
Strong hierarchy
Accessible contrast

Avoid:
Huge rounded blobs
Excessive gradients
Neon colors
Gaming-style UI
Overly futuristic UI
Excessive glass effects

==================================================
27. MICROINTERACTIONS
=====================

Add subtle transitions.

Examples:

Button hover
Card hover
Page transitions
Map marker interaction
Complaint submission progress
AI analysis loading
Notification appearance
Status updates
Certificate reveal
Points earned animation

AI analysis can show:

"Analyzing complaint..."
"Checking nearby reports..."
"Finding similar complaints..."
"Classification complete."

Keep animations professional.

==================================================
28. RESPONSIVE MOBILE EXPERIENCE
================================

The mobile experience is extremely important.

On mobile:

Bottom navigation:

Home
Report
Map
My Reports
Profile

Make "Report" visually prominent.

The report process should be possible using one hand.

Use:
Large buttons
Large microphone button
Camera shortcut
GPS location button

==================================================
29. FOOTER
==========

Create a government-style footer.

Sections:

CivicSetu
About
Contact
Help
Accessibility
Privacy Policy
Terms of Use
Citizen Charter

Government information:

"An initiative for transparent and participatory civic governance."

Add:

Feedback
Helpdesk
Emergency information placeholder

==================================================
30. IMPORTANT USER FLOWS
========================

Prototype these complete flows:

FLOW A:
Citizen Registration
→ Login
→ Dashboard
→ Report Issue
→ Voice Input
→ AI Classification
→ Location
→ Upload Evidence
→ AI Duplicate Detection
→ Submit
→ Complaint Tracking

FLOW B:
Citizen
→ Existing Issue Detected
→ View Similar Complaint
→ Confirm Duplicate
→ Earn Civic Points

FLOW C:
Admin Login
→ Dashboard
→ New Complaints
→ AI Verification
→ Duplicate Cluster
→ Assign Department
→ Update Status
→ Resolve Complaint

FLOW D:
Citizen
→ My Civic Points
→ Achievement
→ Certificate
→ View Certificate

FLOW E:
Admin
→ Civic Intelligence Map
→ High Alert Area
→ Issue Cluster
→ Department Assignment
→ Resolution

==================================================
31. DEMO DATA
=============

Use realistic fictional data for the prototype.

Create approximately:

50+ complaint records

15+ citizen profiles

10+ issue clusters

8+ departments

Multiple districts and wards

Example issue categories:

Road Damage
Garbage
Streetlight
Water Leakage
Drainage
Traffic
Electricity
Public Infrastructure

Use fictional names and locations where necessary.

==================================================
32. IMPORTANT SECURITY / PRIVACY UI
===================================

Create privacy-conscious interfaces.

Do not publicly display:

Phone numbers
Email addresses
Exact personal identity
Private citizen information

Use anonymized citizen IDs on public pages.

Admin pages can show authorized information placeholders.

Include:

"Your personal information is protected."

==================================================
33. FINAL VISUAL QUALITY
========================

The final product should look like a serious government digital platform that could be demonstrated at:

Smart India Hackathon
Government innovation competition
Municipal corporation technology demo
Government technology conference

It should NOT look like a simple college project.

Prioritize:

1. Excellent UX
2. Government credibility
3. Accessibility
4. Clear civic workflows
5. AI-powered duplicate detection
6. Interactive map
7. Citizen engagement
8. Gamification
9. Admin analytics
10. Mobile responsiveness

Create all major pages, reusable components, responsive layouts and connected prototype interactions.

Make the prototype visually consistent across every screen.

The final experience should communicate:

"Citizens report problems → AI organizes them → Government departments act → Citizens track progress → Communities improve."

Build the complete clickable prototype with realistic interactions and polished UI.
