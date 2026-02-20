import resend
from typing import Optional
from app.core.config import settings

class EmailService:
    def __init__(self):
        if settings.RESEND_API_KEY:
            resend.api_key = settings.RESEND_API_KEY
        self.from_email = settings.FROM_EMAIL

    def send_email(self, to: str, subject: str, html: str):
        """Send a transactional email using Resend."""
        if not settings.RESEND_API_KEY:
            print(f"Skipping email to {to}: RESEND_API_KEY not configured.")
            return None
        
        try:
            params = {
                "from": self.from_email,
                "to": to,
                "subject": subject,
                "html": html,
            }
            email = resend.Emails.send(params)
            return email
        except Exception as e:
            print(f"Failed to send email to {to}: {e}")
            return None

    def send_welcome_email(self, email: str, name: str):
        """Send a welcome email after signup."""
        subject = f"Welcome to MyMedic, {name}!"
        html = f"""
        <h1>Welcome to MyMedic!</h1>
        <p>Hi {name},</p>
        <p>Thank you for joining MyMedic. Your account is now active and you can start booking consultations with our premium healthcare professionals.</p>
        <p>Stay healthy!</p>
        <p>The MyMedic Team</p>
        """
        return self.send_email(email, subject, html)

    def send_booking_confirmation(self, email: str, name: str, doctor_name: str, date: str, time: str, meet_link: Optional[str] = None):
        """Send an appointment confirmation email."""
        subject = "Appointment Confirmed - MyMedic"
        meet_info = f"<p><strong>Join Meeting:</strong> <a href='{meet_link}'>{meet_link}</a></p>" if meet_link else ""
        
        html = f"""
        <h1>Appointment Confirmed</h1>
        <p>Hi {name},</p>
        <p>Your appointment with <strong>{doctor_name}</strong> has been successfully booked.</p>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Time:</strong> {time}</p>
        {meet_info}
        <p>You can also download the calendar invite from your dashboard.</p>
        <p>The MyMedic Team</p>
        """
        return self.send_email(email, subject, html)

email_service = EmailService()
