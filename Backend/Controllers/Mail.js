const email = require("../Models/Mail");
const nodemailer = require("nodemailer");

exports.sendMail = async (req, res) => {
    try {
        const { email: recipientEmail } = req.body;
        const existingMail = await email.findOne({ email: recipientEmail });
        if (existingMail) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const mail = new email({ email: recipientEmail });
        await mail.save();
        res.status(200).json({ message: "Mail sent successfully" });
    } catch (error) {
        console.error("Error sending mail:", error.message);
        return res.status(500).json({ error: error.message });
    }
};



const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "santhoshvenugopal2004@gmail.com",
        pass: "nrpz aikw pisx uktj"
    }
});

exports.sendOfferEmails = async (req, res) => {
    try {
        const emails = await email.find();
        if (emails.length === 0) {
            return res.status(400).json({ message: "No emails found" });
        }

        for (const user of emails) {
            const mailOptions = {
                from: user,
                to: user.email,
                subject: "Exclusive Offer for You!",
                text: "Check out our latest discounts and special offers. Visit our store now!"
            };

            console.log(`Sending email to: ${user.email}`);
            await transporter.sendMail(mailOptions);
        }

        res.status(200).json({ message: "Emails sent successfully!" });
    } catch (error) {
        console.error("Error sending emails:", error);
        res.status(500).json({ error: error.message || "Error sending emails" });
    }
};



