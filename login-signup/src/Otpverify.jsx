import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuthStore } from './store/authstore';

const Otpverify = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { verify, err } = useAuthStore();

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    if (value.length > 1) {
      const paste = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newOtp[i] = paste[i] || "";
      }
      setOtp(newOtp);
      const firstEmptyIndex = paste.findIndex((v) => !v);
      const focusIndex = firstEmptyIndex === -1 ? 5 : firstEmptyIndex;
      inputRefs.current[focusIndex]?.focus();
    } else {
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const fullOtp = otp.join("");

    if (otp.some((digit) => digit === "")) {
      toast.error("Please enter all 6 digits");
      return;
    }

    try {
      await verify(fullOtp); // ✅ Send string, not array
      toast.success("Email Verified Successfully");
      navigate("/home");
    } catch (err) {
      console.error(err);
      toast.error("OTP verification failed");
    }
  };

  return (
    <section className="w-[100dvw] h-[100dvh] bg-gradient-to-bl from-[#123458] to-[#d4c9be]">
      <div className="flex flex-col items-center justify-center px-4 h-screen">
        <div className="w-full bg-[#030303] rounded-lg shadow sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-6 sm:p-8">
            <h1 className="text-3xl text-center font-bold text-gray-900 dark:text-[#d4c9be]">OTP Verification</h1>
            <h2 className="text-center text-white">Code has been sent to your email</h2>

            <div className="space-y-4 md:space-y-6">
              <div className="flex justify-center gap-1.5">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-8 h-8 text-center text-xl border rounded-lg focus:ring-2 
                    focus:outline-none 
                focus:border-[#d4c9be] focus:ring-[#d4c9be]  md:w-10 md:h-10 lg:w-13 lg:w-13"
                  />
                ))}
              </div>
            </div>

            {err && <p className="text-red-600 text-center">{err}</p>}

            <div className="flex justify-center">
              <button
                onClick={handleVerify}
                disabled={otp.some((digit) => digit === "")}
                className="text-black bg-[#deae7d] hover:bg-[#d2bca7] 
                disabled:opacity-50 focus:ring-4 
                font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Otpverify;
