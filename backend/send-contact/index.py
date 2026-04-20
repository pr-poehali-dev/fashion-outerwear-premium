import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта Fashion Outerwear на email владельца."""

    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    try:
        body = json.loads(event.get("body") or "{}")
    except Exception:
        return {"statusCode": 400, "headers": cors_headers, "body": json.dumps({"error": "Invalid JSON"})}

    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    message = body.get("message", "").strip()

    if not name or not phone:
        return {
            "statusCode": 400,
            "headers": cors_headers,
            "body": json.dumps({"error": "Имя и телефон обязательны"}),
        }

    to_email = os.environ.get("CONTACT_EMAIL", "")
    smtp_host = os.environ.get("SMTP_HOST", "smtp.mail.ru")
    smtp_port = int(os.environ.get("SMTP_PORT", "465"))
    smtp_user = os.environ.get("SMTP_USER", "")
    smtp_pass = os.environ.get("SMTP_PASS", "")

    html_body = f"""
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; background: #f9f9f9; padding: 32px; border-radius: 8px;">
      <h2 style="color: #1a1a1a; margin-bottom: 24px; border-bottom: 2px solid #d7b56d; padding-bottom: 12px;">
        Новая заявка — Fashion Outerwear
      </h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; color: #888; font-size: 13px; width: 120px;">Имя</td>
          <td style="padding: 10px 0; color: #1a1a1a; font-weight: 600;">{name}</td>
        </tr>
        <tr style="border-top: 1px solid #eee;">
          <td style="padding: 10px 0; color: #888; font-size: 13px;">Телефон</td>
          <td style="padding: 10px 0; color: #1a1a1a; font-weight: 600;">{phone}</td>
        </tr>
        {"<tr style='border-top: 1px solid #eee;'><td style='padding: 10px 0; color: #888; font-size: 13px; vertical-align: top;'>Сообщение</td><td style='padding: 10px 0; color: #1a1a1a;'>" + message + "</td></tr>" if message else ""}
      </table>
    </div>
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Новая заявка от {name} — Fashion Outerwear"
    msg["From"] = smtp_user
    msg["To"] = to_email
    msg.attach(MIMEText(html_body, "html", "utf-8"))

    with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
        server.login(smtp_user, smtp_pass)
        server.sendmail(smtp_user, to_email, msg.as_string())

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"ok": True}),
    }
