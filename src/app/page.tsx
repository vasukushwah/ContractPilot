"use client";

// Import necessary components and hooks
import Footer from "@/components/Footer"; // Assuming this component exists
import Header from "@/components/Header"; // Assuming this component exists
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  FileText, // Changed from File for better representation
  ShieldCheck,
  Timer,
  Zap, // Added for visual interest
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Keep Next.js Image component

// Main Home component
export default function Home() {
  const router = useRouter();

  // Placeholder image URLs
  const heroImageUrl = "/hero-scetion.jpeg";
  const howItWorksImageUrl = "/how-its-works.jpeg";

  return (
    <div className="bg-[#121212] min-h-screen flex flex-col font-sans text-white">
      <Header /> {/* Header Component */}
      {/* Hero Section */}
      <section className="py-20 px-6 md:px-24 ">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left flex flex-col justify-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#E6A8FF] to-[#9F7AEA]">Streamline Contracts With AI</h1>
            <p className="text-lg md:text-xl mb-10 text-gray-400 max-w-md md:max-w-xl">Simplify your contract creation process with our intuitive, AI-powered tool.</p>
             {/* Call to Action Button */}
            <Button
              onClick={() => router.push("/contract-generator")}
              className="bg-[#9F7AEA] text-white hover:bg-[#7759C6] text-lg font-semibold px-8 py-3 rounded-full transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-1 group mx-auto md:mx-0"
            >
              Start Creating Now
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
          {/* Hero Image */}
          <div className="md:max-w-md mx-auto">
            <Image src={heroImageUrl} alt="ContractCrafter Hero Visual" width={1000} height={500} className="w-full h-auto object-cover rounded-xl shadow-2xl" />
          </div>
        </div>
      </section>
      {/* Problem/Solution Section */}
      <section className="py-20 px-6 md:px-24 ">
        <div className="max-w-5xl mx-auto text-center bg-[#1C1C1C] rounded-[30px] py-16 px-8 ">
          <h2 className="text-4xl font-bold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-[#E6A8FF] to-[#9F7AEA]">
            AI-Powered Contract Solutions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Problem Column */}
            <div className="text-left p-6 bg-[#323232] rounded-[20px]">
              <h3 className="text-2xl font-semibold mb-4">The Challenge</h3>
              <p className="text-gray-400 leading-relaxed">Manual contract creation is slow, error-prone, and costly. Legal complexities can hinder business agility.</p>
            </div>
            {/* Solution Column */}
            <div className="text-left p-6 bg-[#323232] rounded-[20px]">
              <h3 className="text-2xl font-semibold mb-4">Our AI Solution</h3>
              <p className="text-gray-400 leading-relaxed">Our AI streamlines the process, generating accurate, compliant, and professional contracts quickly.</p>
            </div>
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="py-20 px-6 md:px-24">
        <div className="max-w-6xl mx-auto text-center bg-[#1C1C1C] rounded-[30px] py-16 px-8">
          <h2 className="text-4xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#E6A8FF] to-[#9F7AEA]">How Our AI Contract Generator Works</h2>
          <Image src={howItWorksImageUrl} alt="How ContractCrafter Works Diagram" width={1000} height={400} className="mx-auto rounded-lg shadow-lg mb-8" />
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 px-6 md:px-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#E6A8FF] to-[#9F7AEA]">Key Features of AI Contract Generation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Feature Card 1 */}
            <div className="bg-[#1C1C1C] p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="bg-[#323232] p-4 rounded-full mb-5">
                <Timer className="w-12 h-12 text-[#E6A8FF]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Time-Saving AI</h3>
              <p className="text-gray-400 leading-relaxed">Generate contracts in minutes, not hours, freeing up valuable time.</p>
            </div>
            {/* Feature Card 2 */}
            <div className="bg-[#1C1C1C] p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="bg-[#323232] p-4 rounded-full mb-5">
                <FileText className="w-12 h-12 text-[#E6A8FF]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Customizable Contracts</h3>
              <p className="text-gray-400 leading-relaxed">Tailor contracts to your specific needs with our easy-to-use tools.</p>
            </div>
            {/* Feature Card 3 */}
            <div className="bg-[#1C1C1C] p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="bg-[#323232] p-4 rounded-full mb-5">
                <ShieldCheck className="w-12 h-12 text-[#E6A8FF]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Compliance Assurance</h3>
              <p className="text-gray-400 leading-relaxed">Built-in legal standards reduce compliance risks.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Final Call to Action Section */}
      <section className="py-20 px-6 md:px-24 bg-[#1C1C1C] rounded-[30px]">
        <div className="max-w-6xl mx-auto bg-clip-text text-transparent bg-gradient-to-r from-[#E6A8FF] to-[#9F7AEA]">
          <h2 className="text-4xl font-bold mb-16 text-center">Ready to transform your contract process?</h2>
          <Image src={"/supercharge.png"} alt="Supercharge Your Contracts with AI" width={1000} height={400} className="mx-auto rounded-lg shadow-lg mb-8" />
        </div>
      </section>
      <Footer />
    </div>
  );
}
   
