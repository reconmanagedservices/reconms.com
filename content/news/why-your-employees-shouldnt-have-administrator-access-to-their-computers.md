---
title: "Why Your Employees Shouldn’t Have Administrator Access to Their Computers"
date: 2026-10-05
description: "Employees should use standard accounts for email, web browsing, and everyday work."
category: "IT Management"
image: /assets/news/why-your-employees-shouldnt-have-administrator-access-to-their-computers.jpg
imageAlt: "People working on computer"
---
_Summary: Employees should use standard accounts for email, web browsing, and everyday work. Administrator access should be limited to approved IT tasks and protected with a separate account._

Administrator access often starts with one request. An employee needs to install a printer, update a specialist program, or change a setting on their computer.

Giving them administrator access gets the job done. The problem is that the access usually stays after the request has been completed.

From then on, the employee can approve other software installations and make changes that would normally require help from IT. If they install the wrong program or someone takes control of their account, those permissions can also be used to change the computer.

For everyday work, employees should use standard accounts. Administrator access should be kept for tasks that require it.

## **What administrator access allows someone to do**

An administrator has more control over a computer than a standard user.

On Windows, members of the local Administrators group have full control over the resources on that computer. According to [Microsoft’s guidance on local accounts](https://learn.microsoft.com/en-us/windows/security/identity-protection/access-control/local-accounts), Microsoft recommends limiting the number of users in that group.

Depending on the computer and how it is managed, an administrator may be able to:

-   Install and remove software
-   Add drivers for printers and other equipment
-   Create, change, or remove user accounts
-   Change system settings
-   Change permissions on files and folders
-   Install services that continue running in the background
-   Make changes to some security settings

Mac computers also have standard and administrator accounts. Apple says administrators can install and remove software, manage other users, and change settings. [Apple recommends limiting the number of administrative users](https://support.apple.com/en-gb/guide/mac-help/flvlt003/26/mac/26) and using a standard account when administrator rights aren’t required.

Local administrator access applies to the computer itself. It is different from Microsoft 365, Google Workspace, network, or server administrator access. Those accounts may control email, cloud files, user accounts, or several systems at once.

An employee may have local administrator access to a laptop without being a Microsoft 365 administrator. Both types of access should be reviewed separately.

## **Why permanent administrator access increases your risk**

Software launched by an employee normally starts with the permissions available to that employee.

![](/assets/news/why-your-employees-shouldnt-have-administrator-access-to-their-computers-1.jpg)

If the software asks for administrator approval and the employee approves it, the program may be able to install system components, change settings, or affect information belonging to other users.

That matters when someone downloads a fake installer, opens a harmful attachment, or installs software from an untrusted website. The employee may think they are approving a legitimate update while giving the program permission to change the computer.

Windows uses User Account Control to ask for approval before many administrative changes. An employee signed in with an administrator account can approve the request themselves. A standard user is normally asked for credentials belonging to an administrator.

Microsoft describes the standard account as the [recommended and more secure way to use Windows](https://learn.microsoft.com/en-us/windows/security/application-security/application-control/user-account-control/how-it-works).

Standard accounts also reduce the number of people who can change security settings without review. Employees cannot approve every installation themselves, so IT has a chance to check the program, where it came from, and what permissions it needs.

CISA advises businesses to [control local administrator access and restrict who can install software](https://www.cisa.gov/stopransomware/ransomware-guide). The Australian Cyber Security Centre includes restricting administrative privileges in its Essential Eight security measures and recommends creating separate accounts for administrative work. [Cyber.gov.au](https://www.cyber.gov.au/business-government/protecting-devices-systems/system-administration/restricting-administrative-privileges)

## **Standard accounts are suitable for everyday work**

A standard account can still be used for normal business tasks, including:

-   Reading and sending email
-   Using a web browser
-   Working in Microsoft 365 or Google Workspace
-   Accessing approved business applications
-   Joining online meetings
-   Printing with an installed printer
-   Opening and saving files
-   Changing personal settings that do not affect other users

Some applications can be installed for one user without administrator access. Others need administrator approval because they add drivers, services, or files in protected parts of the computer.

An employee should not receive permanent administrator access because one program needs an update. IT can approve the installation, deploy the update remotely, or use a separate administrator account for that task.

Older business applications sometimes expect the user to have administrator rights. Test those applications before changing account permissions. In many cases, IT can update the application, adjust its configuration, or grant access to the specific folders it needs.

## **How to manage software installations without permanent administrator access**

Staff can still get software installed and updated without keeping administrator rights.

![](/assets/news/why-your-employees-shouldnt-have-administrator-access-to-their-computers-2.jpg)

### **Let IT install approved software**

Your IT team or provider can install the program remotely. This also gives them a chance to confirm that the installer came from the software company and that the requested version is supported.

### **Use managed software deployment**

Businesses with managed computers can send approved applications and updates to employees without asking each person to run an installer. The available method will depend on the operating system and device management service.

### **Approve individual requests**

An employee can contact IT when an installation requires administrator approval. IT can review the request and enter the required credentials without giving the password to the employee.

### **Provide time-limited administrator access**

Some roles need to install or test software as part of their work. Give those employees a separate administrator account that is enabled only for the approved task, then disable it afterward.

### **Create a separate administrator account**

Employees who regularly perform approved technical work can have a separate administrator account. They should continue using their standard account for email, browsing, and normal work.

The administrator account should only be used when a task requires the extra permissions.

## **Who should have administrator access?**

Administrator access should be limited to people whose work requires it.

That may include:

-   Your internal IT staff
-   Your IT provider
-   An approved technical employee
-   A software specialist responsible for a particular system

Business owners should use standard accounts for their normal work too. Ownership of the company does not require permanent administrator access to every computer.

Your IT provider should keep a managed administrator account so they can support each device. The password should be protected and should not be shared with employees.

Using the same local administrator password on every computer creates another problem. If that password is stolen from one device, it may work on the others. Each computer should have a unique administrator password or use a management service that controls those passwords.

## **How to remove administrator access safely**

Do not remove every administrator account at once. Someone still needs a working way to manage and repair each computer.

### **1\. Check which employees have administrator access**

Review the local Administrators group on every Windows computer and the administrator users on every Mac. Include old accounts, shared accounts, vendor accounts, and accounts created during the original setup.

### **2\. Confirm why each person has it**

Ask what tasks require administrator access. A clear business need should exist for every account that keeps the permission.

Needing to update one application occasionally does not require permanent access.

### **3\. Make sure IT has a working administrator account**

Confirm that your IT team or provider can sign in with a protected administrator account before removing permissions from employees.

Test the account on each device. This prevents the business from being locked out of its own computers.

### **4\. Test important software**

Check the programs each employee needs for their job. Confirm that they open, update, and work correctly when the employee uses a standard account.

Any application that fails should be reviewed before administrator access is removed permanently.

### **5\. Change the employee’s account to a standard account**

Once the computer has been checked, remove the employee from the local administrator group or change the account type.

The employee should then sign out and sign back in so the new permissions apply correctly.

### **6\. Tell staff how to request an installation**

Give employees one place to contact when they need software installed or a setting changed. Explain what information to include, such as the program name, the reason it is needed, and the official download page.

### **7\. Review access when roles change**

Check administrator access when an employee changes jobs, receives new responsibilities, or leaves the business. Include it in your regular access reviews as well.

## **Frequently asked questions**

### **Can a standard user install software?**

It depends on the software. Programs that only install inside the employee’s user profile may not need administrator approval. Software that changes protected system files, installs drivers, or adds background services usually requires administrator credentials.

### **Will removing administrator access stop employees from working?**

Normal business applications should continue working. Test specialist and older applications before making the change across every computer.

### **Does removing administrator access stop malware?**

It reduces what many harmful programs can change, but it does not prevent every attack. You still need supported software, security updates, endpoint protection, email security, MFA, and tested backups.

### **Should the business owner keep administrator access?**

Use a standard account for everyday work. If you need administrator access for an approved task, use a separate account and keep its password protected.

### **Is local administrator access the same as Microsoft 365 administrator access?**

No. Local administrator access controls one computer. Microsoft 365 administrator roles can control cloud users, email, files, security settings, and other parts of the company’s Microsoft environment.

Both should be limited and reviewed.

## **Sources and further reading**

-   [Microsoft Learn: Local accounts](https://learn.microsoft.com/en-us/windows/security/identity-protection/access-control/local-accounts)
-   [Microsoft Learn: How User Account Control works](https://learn.microsoft.com/en-us/windows/security/application-security/application-control/user-account-control/how-it-works)
-   [Apple Support: Set up your Mac to be secure](https://support.apple.com/en-gb/guide/mac-help/flvlt003/26/mac/26)
-   [CISA: StopRansomware Guide](https://www.cisa.gov/stopransomware/ransomware-guide)
-   [Australian Cyber Security Centre: Restricting administrative privileges](https://www.cyber.gov.au/business-government/protecting-devices-systems/system-administration/restricting-administrative-privileges)

If you are not sure who has administrator access or whether your employees need it, ask your IT provider to review the accounts on your business computers.

And if you don’t have an IT provider, feel free to reach out to us and we’ll help you sort it out.

—

[Featured Image Credit](https://www.pexels.com/photo/focused-colleagues-working-on-laptops-in-office-5324853/)

This Article has been Republished with Permission from [The Technology Press.](https://thetechnologypress.com/why-your-employees-shouldnt-have-administrator-access-to-their-computers/ "Why Your Employees Shouldn’t Have Administrator Access to Their Computers")
