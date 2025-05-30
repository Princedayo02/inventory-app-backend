import nodemailer from "nodemailer";

export const generateSKU = (productName: string) => {
	const prefix = productName.slice(0, 3).toLocaleUpperCase();
	const randomNumber = Math.floor(100 + Math.random() * 900);
	const SKU = `${prefix}-${randomNumber}`;
	return SKU;
};

export const mailTransporter = nodemailer.createTransport({
	host: "sandbox.smtp.mailtrap.io",
	port: 2525,
	auth: {
		user: "49dcfe0fb1deef",
		pass: "22fcea15965587",
	},
});

export const sendWelcomeMail = async (email: string, fullName: string) => {
	try {
		const mailOptions = {
			from: "Dayo's Inventory",
			to: email,
			html: `
        <h1>Welcome, ${fullName}!</h1>
        <p>Thank you for signing up for our inventory management system.</p>
        <p>We're excited to have you on board. Here are a few things you can do to get started:</p>
        <ul>
          <li>Add your first product</li>
          <li>Explore our categories</li>
        </ul>
        <p>If you have any questions, please don't hesitate to contact our support team.</p>
        <p>Best regards,<br>The Dayo Inventory Management Team</p>
      `,
		};
		const mailRes = await mailTransporter.sendMail(mailOptions);
		console.log(mailRes.messageId, "mail sent");
		return mailRes;
	} catch (error) {
		console.log("error sending email", error);
		throw error;
	}
};
