import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      type, // 'donation', 'volunteer', 'soulstay'
      name,
      phone,
      email,
      // Donation specific
      donationType,
      amount,
      // Volunteer specific
      group,
      groupSize,
      preferDate,
      preferTime,
      // Soul Stay specific
      program,
      people,
      checkinDate,
      duration,
      // Common
      message,
    } = body;

    // 환경 변수 확인
    if (
      !process.env.EMAIL_USER ||
      !process.env.EMAIL_PASS ||
      !process.env.EMAIL_TO
    ) {
      console.error("Email environment variables are not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail", // 또는 다른 SMTP 서비스 사용 가능
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let subject = "";
    let htmlContent = "";

    // 신청 유형에 따른 제목 및 내용 구성
    if (type === "donation") {
      subject = `[후원신청] ${name}님의 ${donationType} 신청`;
      htmlContent = `
        <h2>후원 신청이 접수되었습니다.</h2>
        <p><strong>이름:</strong> ${name}</p>
        <p><strong>연락처:</strong> ${phone}</p>
        <p><strong>이메일:</strong> ${email || "미입력"}</p>
        <p><strong>후원 종류:</strong> ${donationType}</p>
        ${amount ? `<p><strong>후원 금액:</strong> ${amount}</p>` : ""}
        <p><strong>전하고 싶은 말씀:</strong></p>
        <p>${message}</p>
      `;
    } else if (type === "volunteer") {
      subject = `[봉사신청] ${name}님의 봉사활동 신청`;
      htmlContent = `
        <h2>자원봉사 신청이 접수되었습니다.</h2>
        <p><strong>이름:</strong> ${name}</p>
        <p><strong>연락처:</strong> ${phone}</p>
        <p><strong>이메일:</strong> ${email || "미입력"}</p>
        ${group ? `<p><strong>소속 단체:</strong> ${group}</p>` : ""}
        ${groupSize ? `<p><strong>봉사 인원:</strong> ${groupSize}명</p>` : ""}
        <p><strong>희망 날짜:</strong> ${preferDate}</p>
        <p><strong>희망 시간:</strong> ${preferTime || "미입력"}</p>
        <p><strong>전하고 싶은 말씀:</strong></p>
        <p>${message}</p>
      `;
    } else if (type === "soulstay") {
      subject = `[소울스테이] ${name}님의 예약 신청`;
      htmlContent = `
        <h2>소울스테이 예약 신청이 접수되었습니다.</h2>
        <p><strong>이름:</strong> ${name}</p>
        <p><strong>연락처:</strong> ${phone}</p>
        <p><strong>이메일:</strong> ${email || "미입력"}</p>
        <p><strong>참여 프로그램:</strong> ${program}</p>
        <p><strong>인원:</strong> ${people}명</p>
        <p><strong>입소 희망일:</strong> ${checkinDate}</p>
        <p><strong>체류 기간:</strong> ${duration}</p>
        <p><strong>요청사항:</strong></p>
        <p>${message}</p>
      `;
    } else {
      return NextResponse.json(
        { error: "Invalid application type" },
        { status: 400 },
      );
    }

    // 이메일 발송 옵션
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: subject,
      html: htmlContent,
    };

    // 이메일 전송
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
