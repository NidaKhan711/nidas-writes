import { Metadata } from 'next';
import ContactForm from '../components/ContactForm';
import ContactInfo from '../components/ContactInfo';

export const metadata: Metadata = {
  title: 'Contact Us - Nidas Writes',
  description: 'Get in touch with us. We\'d love to hear from you and answer any questions you might have.',
};

export default function ContactPage() {
  return (
         <div className="min-h-screen bg-[#fffcf1]">
      {/* Hero Section */}
             <div className="bg-gradient-to-r from-[#996568] to-[#b87a7d] text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get in Touch
            </h1>
                         <p className="text-xl text-white/90 leading-relaxed">
              Have a question or want to collaborate? We'd love to hear from you. 
              Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-white/80 rounded-2xl shadow-xl p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#5a3e36] mb-4">
                Send us a Message
              </h2>
              <p className="text-[#5a3e36]/90">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div className="bg-white/80 rounded-2xl shadow-xl p-8">
            <ContactInfo />
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-20 bg-white/80 rounded-2xl shadow-xl p-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#5a3e36] mb-6">
              Why Choose Nidas Writes?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#996568]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#996568]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#5a3e36] mb-2">Fast Response</h3>
                <p className="text-[#5a3e36]/90">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#b87a7d]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#b87a7d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#5a3e36] mb-2">Expert Support</h3>
                <p className="text-[#5a3e36]/90">
                  Our team of writing experts is here to help with all your content needs.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#e8c9a7]/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#e8c9a7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#5a3e36] mb-2">Personal Touch</h3>
                <p className="text-[#5a3e36]/90">
                  Every interaction is personal and tailored to your specific needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
