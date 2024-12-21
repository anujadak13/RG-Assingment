const nodemailer = require('nodemailer');
jest.mock('nodemailer');

describe('Email Tests', () => {
    test('Send an email ', async () => {
        const sendMailMock = jest.fn().mockResolvedValue('Email sent');
        nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });

        const sendEmail = require('../utils/email'); // Your email utility
        const result = await sendEmail('test@example.com', 'Test Subject', 'Test Message');

        expect(sendMailMock).toHaveBeenCalledTimes(1);
        expect(sendMailMock).toHaveBeenCalledWith({
            from: 'your-email@example.com',
            to: 'test@example.com',
            subject: 'Test Subject',
            text: 'Test Message',
        });
        expect(result).toBe('Email sent');
    });
});
