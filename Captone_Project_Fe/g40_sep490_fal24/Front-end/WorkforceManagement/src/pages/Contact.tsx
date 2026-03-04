export default function Contact() {
    return (
        <div className="min-h-screen flex flex-col items-center">
            {/* Header Section */}
            <div className="w-full bg-green-600 text-white py-10">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-5xl font-bold">Contact Our SOC Management Team</h1>
                    <p className="mt-4 text-lg text-green-200">
                        We are here to assist you with any inquiries or support related to our services.
                    </p>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="max-w-6xl mx-auto p-8 space-y-16">
                {/* About Section */}
                <section className="bg-white shadow-lg rounded-lg p-8">
                    <h2 className="text-3xl font-bold text-green-600 mb-4">Why Contact Us?</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Our team specializes in website security analysis. By submitting a ticket with your website details, we will scan your site for vulnerabilities and assign tasks to our expert testers. Let us help ensure your site is secure and reliable.
                    </p>
                </section>

                {/* Ticket Submission Section */}
                <section className="bg-white shadow-lg rounded-lg p-8">
                    <h2 className="text-3xl font-bold text-green-600 mb-4">Submit Your Ticket</h2>
                    <p className="text-gray-700 mb-6">
                        Fill out the form below to provide us with the necessary details about your website. Our team will analyze your request and get back to you promptly.
                    </p>

                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-left text-sm font-medium text-gray-700">
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                                placeholder="Enter your name"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-left text-sm font-medium text-gray-700">
                                Your Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div>
                            <label htmlFor="website" className="block text-left text-sm font-medium text-gray-700">
                                Website URL
                            </label>
                            <input
                                type="url"
                                id="website"
                                name="website"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                                placeholder="https://example.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-left text-sm font-medium text-gray-700">
                                Additional Information
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                                placeholder="Provide any extra details or questions you may have"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 px-6 bg-green-600 text-white font-medium rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Submit Ticket
                        </button>
                    </form>
                </section>

                {/* Social Media Section */}
                <section className="bg-white shadow-lg rounded-lg p-8">
                    <h2 className="text-3xl font-bold text-green-600 mb-4">Connect with Us</h2>
                    <p className="text-gray-700 mb-6">
                        Follow us on our official social media platforms for updates and support:
                    </p>
                    <div className="flex space-x-4 justify-center">
                        <a
                            href="https://www.facebook.com/conhambidien"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-800 text-lg font-medium"
                        >
                            Facebook
                        </a>
                        <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-800 text-lg font-medium"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-800 text-lg font-medium"
                        >
                            Twitter
                        </a>
                    </div>
                </section>
            </div>

            {/* Footer Section */}
        </div>
    );
}