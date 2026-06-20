const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// Configure the SMTP transporter using secure environment configuration
// The variables are now loaded from the functions/.env file
const gmailEmail = process.env.GMAIL_EMAIL || null;
const gmailPassword = process.env.GMAIL_PASSWORD || null;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

exports.sendOrderNotification = functions.firestore
  .document("orders/{orderId}")
  .onCreate(async (snap, context) => {
    const orderData = snap.data();
    const orderId = snap.id;

    if (!gmailEmail || !gmailPassword) {
      console.warn("Gmail SMTP credentials are not configured. Skipping email dispatch.");
      return null;
    }

    const { name, email, projectType, selectedCriteria, budget, deadline, description } = orderData;
    const readableType = projectType.charAt(0).toUpperCase() + projectType.slice(1);
    const techStack = selectedCriteria && selectedCriteria.length > 0 ? selectedCriteria.join(", ") : "None specified";

    // 1. Email to Admin (Sahil)
    const adminMailOptions = {
      from: `"SahilDev Portfolio" <${gmailEmail}>`,
      to: gmailEmail, // Sends notification directly to yourself
      subject: `🚀 New Project Request: ${readableType} from ${name}`,
      html: `
        <div style="background-color: #0f172a; color: #f8fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 2rem; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #1e293b;">
          <h2 style="color: #38bdf8; border-bottom: 2px solid #1e293b; padding-bottom: 0.8rem; margin-top: 0;">New Service Request Received</h2>
          <p style="font-size: 1rem; color: #94a3b8; margin-bottom: 1.5rem;">An incoming project lead has been generated through your portfolio form.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 1.5rem;">
            <tr style="border-bottom: 1px solid #1e293b;">
              <td style="padding: 0.8rem 0; font-weight: bold; color: #38bdf8; width: 140px;">Client Name:</td>
              <td style="padding: 0.8rem 0; color: #f8fafc;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #1e293b;">
              <td style="padding: 0.8rem 0; font-weight: bold; color: #38bdf8;">Email:</td>
              <td style="padding: 0.8rem 0; color: #f8fafc;"><a href="mailto:${email}" style="color: #60a5fa; text-decoration: none;">${email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #1e293b;">
              <td style="padding: 0.8rem 0; font-weight: bold; color: #38bdf8;">Project Type:</td>
              <td style="padding: 0.8rem 0; color: #f8fafc;"><span style="background: rgba(56, 189, 248, 0.1); color: #38bdf8; padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.9rem;">${readableType}</span></td>
            </tr>
            <tr style="border-bottom: 1px solid #1e293b;">
              <td style="padding: 0.8rem 0; font-weight: bold; color: #38bdf8;">Tech Stack:</td>
              <td style="padding: 0.8rem 0; color: #f8fafc;">${techStack}</td>
            </tr>
            <tr style="border-bottom: 1px solid #1e293b;">
              <td style="padding: 0.8rem 0; font-weight: bold; color: #38bdf8;">Budget Range:</td>
              <td style="padding: 0.8rem 0; color: #f8fafc; font-weight: 600;">${budget}</td>
            </tr>
            <tr style="border-bottom: 1px solid #1e293b;">
              <td style="padding: 0.8rem 0; font-weight: bold; color: #38bdf8;">Deadline:</td>
              <td style="padding: 0.8rem 0; color: #f8fafc;">${deadline}</td>
            </tr>
          </table>

          <div style="background-color: #1e293b; padding: 1.2rem; border-radius: 8px; border: 1px solid #334155; margin-bottom: 1.5rem;">
            <h4 style="margin-top: 0; color: #38bdf8; margin-bottom: 0.5rem;">Project Description:</h4>
            <p style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.6; margin: 0; white-space: pre-wrap;">${description}</p>
          </div>

          <div style="text-align: center; margin-top: 2rem;">
            <a href="https://sahilportfol.netlify.app/#admin" style="background: linear-gradient(135deg, #38bdf8 0%, #60a5fa 100%); color: #0f172a; text-decoration: none; padding: 0.8rem 1.8rem; border-radius: 6px; font-weight: bold; display: inline-block; box-shadow: 0 4px 10px rgba(56, 189, 248, 0.3);">
              View in Admin Dashboard
            </a>
          </div>
        </div>
      `
    };

    // 2. Confirmation Email to Client (Requester)
    const clientMailOptions = {
      from: `"SahilDev Portfolio" <${gmailEmail}>`,
      to: email,
      subject: `📬 Request Received - SahilDev Portfolio Services`,
      html: `
        <div style="background-color: #0f172a; color: #f8fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 2.5rem 2rem; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #1e293b; text-align: center;">
          <div style="font-size: 2.5rem; margin-bottom: 1rem;">🎉</div>
          <h2 style="color: #38bdf8; margin-top: 0; margin-bottom: 0.5rem;">We've Received Your Request!</h2>
          <p style="color: #94a3b8; font-size: 1.05rem; line-height: 1.6; margin-bottom: 2rem;">Hi ${name}, thank you for reaching out! Your service request has been safely logged in our system and is currently being prioritized.</p>
          
          <div style="background-color: #1e293b; text-align: left; padding: 1.5rem; border-radius: 8px; border: 1px solid #334155; margin-bottom: 2rem;">
            <h3 style="margin-top: 0; color: #38bdf8; font-size: 1.1rem; border-bottom: 1px solid #334155; padding-bottom: 0.5rem;">Request Summary</h3>
            <p style="margin: 0.5rem 0; font-size: 0.95rem;"><strong style="color: #94a3b8;">Service Tier:</strong> <span style="color: #f8fafc;">${readableType} Project</span></p>
            <p style="margin: 0.5rem 0; font-size: 0.95rem;"><strong style="color: #94a3b8;">Technologies:</strong> <span style="color: #f8fafc;">${techStack}</span></p>
            <p style="margin: 0.5rem 0; font-size: 0.95rem;"><strong style="color: #94a3b8;">Estimated Budget:</strong> <span style="color: #f8fafc; font-weight: 600;">${budget}</span></p>
            <p style="margin: 0.5rem 0; font-size: 0.95rem;"><strong style="color: #94a3b8;">Expected Deadline:</strong> <span style="color: #f8fafc;">${deadline}</span></p>
          </div>

          <p style="color: #94a3b8; font-size: 0.95rem; line-height: 1.6; margin-bottom: 2rem;">
            Sahil will personally analyze your specifications and compile a comprehensive implementation layout. We will get in touch with you shortly at this address.
          </p>

          <hr style="border: 0; border-top: 1px solid #1e293b; margin: 2rem 0;" />
          
          <div style="color: #64748b; font-size: 0.85rem;">
            <p style="margin: 0 0 0.2rem 0; font-weight: bold; color: #94a3b8;">Sahil Dev - Full Stack Web Developer</p>
            <p style="margin: 0;">Turning custom problems into modern digital experiences.</p>
            <p style="margin: 0.5rem 0 0 0;"><a href="https://sahilportfol.netlify.app" style="color: #38bdf8; text-decoration: none;">sahilportfol.netlify.app</a></p>
          </div>
        </div>
      `
    };

    try {
      await Promise.all([
        transporter.sendMail(adminMailOptions),
        transporter.sendMail(clientMailOptions)
      ]);
      console.log(`Successfully dispatched notification emails for Order ID: ${snap.id}`);
    } catch (err) {
      console.error(`Failed to send emails for Order ID: ${snap.id}`, err);
    }

    return null;
  });
