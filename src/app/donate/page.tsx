"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Shield, Gift, Coffee, Zap, CheckCircle } from "lucide-react";

export default function DonatePage() {
  const [donationAmount, setDonationAmount] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const donationOptions = [
    { id: "coffee", amount: 200, label: "Buy me a Coffee", icon: Coffee },
    { id: "energy", amount: 500, label: "Energy Boost", icon: Zap },
    { id: "support", amount: 1000, label: "Monthly Support", icon: Heart },
    { id: "generous", amount: 2500, label: "Generous Soul", icon: Gift },
  ];

  // 🚀 EasyPaisa Payment Call
  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const res = await fetch("/api/easypaisa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: donationAmount }),
      });

      const data = await res.json();

      if (data?.paymentUrl) {
        window.location.href = data.paymentUrl; // Redirect to EasyPaisa page
      } else {
        alert("Payment initialization failed!");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to EasyPaisa payment gateway");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md mx-4"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 mt-34" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You! 🙏</h2>
          <p className="text-gray-600 mb-6">
            Your generous donation of Rs.{donationAmount} will help us continue creating amazing content.
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Donate Again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffcf1] via-[#fef7e6] to-[#f9f1e4] py-12 px-4 mt-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#5a3e36] mb-4">
            Support Our Journey 🌟
          </h1>
          <p className="text-lg text-[#5a3e36]/80 max-w-2xl mx-auto">
            Your support helps us continue creating valuable content and maintaining this platform. 
            Every donation makes a difference!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Donation Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-[#e8c9a7]"
          >
            <h2 className="text-2xl font-serif font-bold text-[#5a3e36] mb-6">
              Make a Donation
            </h2>

            <form onSubmit={handleDonate} className="space-y-6">
              {/* Quick Amount Options */}
              <div>
                <label className="block text-sm font-medium text-[#5a3e36] mb-3">
                  Choose an amount
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {donationOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => {
                          setSelectedOption(option.id);
                          setDonationAmount(option.amount.toString());
                        }}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          selectedOption === option.id
                            ? "border-[#996568] bg-[#f9f5e9] shadow-md"
                            : "border-[#e8c9a7] hover:border-[#996568]"
                        }`}
                      >
                        <Icon className="w-6 h-6 text-[#996568] mx-auto mb-2" />
                        <div className="text-sm font-medium text-[#5a3e36]">
                          Rs.{option.amount}
                        </div>
                        <div className="text-xs text-[#5a3e36]/60 mt-1">
                          {option.label}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Amount */}
              <div>
                <label
                  htmlFor="customAmount"
                  className="block text-sm font-medium text-[#5a3e36] mb-2"
                >
                  Or enter custom amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5a3e36]">
                    Rs.
                  </span>
                  <input
                    id="customAmount"
                    type="number"
                    value={donationAmount}
                    onChange={(e) => {
                      setDonationAmount(e.target.value);
                      setSelectedOption("custom");
                    }}
                    placeholder="0.00"
                    min="1"
                    step="1"
                    className="w-full pl-10 pr-4 py-3 border border-[#e8c9a7] rounded-lg focus:ring-2 focus:ring-[#996568] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Donate Button */}
              <button
                type="submit"
                disabled={!donationAmount || isProcessing}
                className="w-full py-4 px-6 bg-gradient-to-r from-[#996568] to-[#7a4e51] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  `Donate with EasyPaisa (Rs.${donationAmount || "0"})`
                )}
              </button>
            </form>
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-[#f9f5e9] rounded-2xl p-6 border border-[#e8c9a7]">
              <h3 className="text-xl font-serif font-bold text-[#5a3e36] mb-4">
                Why Donate? 💖
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Heart className="w-5 h-5 text-[#996568] mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-[#5a3e36]">Support Quality Content</h4>
                    <p className="text-sm text-[#5a3e36]/80">
                      Help us create more amazing articles and resources
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="w-5 h-5 text-[#996568] mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-[#5a3e36]">Ad-Free Experience</h4>
                    <p className="text-sm text-[#5a3e36]/80">
                      Keep the platform clean and focused on content
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Zap className="w-5 h-5 text-[#996568] mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-[#5a3e36]">Faster Development</h4>
                    <p className="text-sm text-[#5a3e36]/80">
                      Accelerate new features and improvements
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Transparency Note */}
            <div className="bg-[#f3e9d7] rounded-2xl p-6 border border-[#e5dcc9]">
              <h3 className="text-lg font-semibold text-[#5a3e36] mb-3">
                Transparency 🤝
              </h3>
              <p className="text-sm text-[#5a3e36]/80">
                We believe in complete transparency. Funds are used for:
                <ul className="mt-2 space-y-1">
                  <li>• Server and hosting costs</li>
                  <li>• Content creation and research</li>
                  <li>• Platform maintenance and updates</li>
                  <li>• Future feature development</li>
                </ul>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
