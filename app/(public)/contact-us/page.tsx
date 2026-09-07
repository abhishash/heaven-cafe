"use client";

import {
  Clock3,
  Mail,
  MapPin,
  Phone,
  Send,
  MessageCircle,
} from "lucide-react";

export default function ContactUs() {
  return (
    <main className="min-h-screen bg-[#faf9f7] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="mb-3 inline-flex rounded-full bg-orange-100 px-4 py-1.5 text-sm font-medium text-orange-600">
            Get In Touch
          </span>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Contact <span className="text-orange-500">Heaven Cafe</span>
          </h1>

          <p className="mt-4 text-base leading-7 text-gray-500 sm:text-lg">
            Have a question, feedback, or want to know more about our menu?
            We would love to hear from you.
          </p>
        </div>

        {/* Main Card */}
        <div className="grid overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] lg:grid-cols-5">
          {/* Left Info */}
          <div className="relative overflow-hidden bg-secondary p-8 text-white sm:p-10 lg:col-span-2">
            {/* Decorative circles */}
            <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-orange-500/20 blur-2xl" />
            <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-orange-500/10 blur-2xl" />

            <div className="relative z-10">
              <h2 className="text-2xl text-primary font-semibold">
                Let&apos;s talk
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                We&apos;re here to help. Reach out to us for orders, feedback,
                suggestions, or any other queries.
              </p>

              {/* Contact Details */}
              <div className="mt-10 space-y-7">
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400">
                    <Phone size={20} />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      Phone
                    </p>
                    <a
                      href="tel:+919999999999"
                      className="mt-1 block text-sm font-medium text-primary transition hover:text-orange-400"
                    >
                      +91 99999 99999
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400">
                    <Mail size={20} />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      Email
                    </p>
                    <a
                      href="mailto:hello@heavencafe.com"
                      className="mt-1 block text-sm font-medium text-primary transition hover:text-orange-400"
                    >
                      hello@heavencafe.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400">
                    <MapPin size={20} />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      Address
                    </p>
                    <p className="mt-1 text-sm font-medium leading-6 text-primary">
                      Heaven Cafe,
                      <br />
                      Your City, Uttar Pradesh, India
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400">
                    <Clock3 size={20} />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      Opening Hours
                    </p>
                    <p className="mt-1 text-sm font-medium text-primary">
                      Mon - Sun
                    </p>
                    <p className="text-sm text-gray-400">
                      10:00 AM - 10:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Message */}
              <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <MessageCircle
                    size={18}
                    className="text-orange-400"
                  />
                  <p className="text-sm text-gray-300">
                    Usually responds within a few hours.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="p-8 sm:p-10 lg:col-span-3">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900">
                Send us a message
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Fill out the form below and our team will get back to you.
              </p>
            </div>

            <form className="space-y-5">
              {/* Name + Phone */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Subject
                </label>

                <select
                  id="subject"
                  className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a subject
                  </option>
                  <option>Order Related</option>
                  <option>Feedback</option>
                  <option>Complaint</option>
                  <option>General Inquiry</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  rows={5}
                  placeholder="Write your message here..."
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                />
              </div>

              {/* Submit */}
              <button
                type="button"
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600 hover:shadow-orange-500/30 active:scale-[0.99]"
              >
                Send Message
                <Send
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

              <p className="text-center text-xs text-gray-400">
                By submitting this form, you agree to our Terms & Conditions.
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}