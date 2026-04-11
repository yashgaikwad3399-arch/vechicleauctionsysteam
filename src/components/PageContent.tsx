import { motion } from "motion/react";
import { Check, ArrowRight, Building2, Trophy, Users, Star, MessageSquare, Briefcase, Newspaper } from "lucide-react";
import { Button } from "./ui/button";

export const Membership = () => (
  <div className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-[#2D2A70] mb-4">Choose Your <span className="text-[#9333EA]">Membership</span></h2>
        <p className="text-gray-500 font-medium max-w-2xl mx-auto">Unlock exclusive benefits and priority access to premium vehicle auctions with our tiered membership plans.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            name: "Silver",
            price: "Free",
            features: ["Standard Bidding", "Email Notifications", "Basic Support", "Up to 3 active bids"],
            color: "bg-gray-100",
            textColor: "text-gray-600"
          },
          {
            name: "Gold",
            price: "0.05 ETH/year",
            features: ["Priority Bidding", "SMS Alerts", "24/7 Support", "Unlimited active bids", "Lower Transaction Fees"],
            color: "bg-[#9333EA]/10",
            textColor: "text-[#9333EA]",
            popular: true
          },
          {
            name: "Platinum",
            price: "0.15 ETH/year",
            features: ["VIP Auction Access", "Dedicated Manager", "Zero Transaction Fees", "Early Preview Access", "Premium Vehicle Reports"],
            color: "bg-[#2D2A70]",
            textColor: "text-white"
          }
        ].map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`relative p-8 rounded-[40px] border border-gray-100 shadow-xl ${plan.name === "Platinum" ? "bg-[#2D2A70] text-white" : "bg-white"}`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FF6321] text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">
                Most Popular
              </div>
            )}
            <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
            <p className={`text-3xl font-black mb-8 ${plan.name === "Platinum" ? "text-white" : "text-[#2D2A70]"}`}>{plan.price}</p>
            <ul className="space-y-4 mb-10">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm font-bold">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.name === "Platinum" ? "bg-white/10 text-white" : "bg-[#9333EA]/10 text-[#9333EA]"}`}>
                    <Check className="w-3 h-3" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
            <Button className={`w-full py-6 rounded-2xl font-black ${plan.name === "Platinum" ? "bg-white text-[#2D2A70] hover:bg-gray-100" : "bg-[#9333EA] text-white hover:bg-[#7E22CE]"}`}>
              Get Started
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export const AboutUs = () => (
  <div className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-5xl font-black text-[#2D2A70] mb-6">Revolutionizing <br /><span className="text-[#9333EA]">Vehicle Auctions</span></h2>
          <p className="text-gray-500 font-medium text-lg leading-relaxed mb-8">
            Founded in 2024, VELO-AUCTION was born from a vision to create the most transparent, secure, and efficient vehicle auction platform in the world. By leveraging blockchain technology, we ensure that every bid is verifiable and every transaction is immutable.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 bg-gray-50 rounded-3xl">
              <Trophy className="w-8 h-8 text-[#FF6321] mb-4" />
              <h4 className="font-black text-[#2D2A70] mb-1">Industry Leader</h4>
              <p className="text-xs text-gray-400 font-bold">Top rated platform in 2025</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-3xl">
              <Users className="w-8 h-8 text-[#9333EA] mb-4" />
              <h4 className="font-black text-[#2D2A70] mb-1">10K+ Users</h4>
              <p className="text-xs text-gray-400 font-bold">Growing community of dealers</p>
            </div>
          </div>
        </motion.div>
        <div className="relative">
          <img src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=800" alt="Office" className="rounded-[40px] shadow-2xl" />
          <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[32px] shadow-xl border border-gray-100 hidden md:block">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#9333EA] rounded-2xl flex items-center justify-center text-white font-black text-xl">10+</div>
              <div>
                <p className="text-sm font-black text-[#2D2A70]">Years of Experience</p>
                <p className="text-xs text-gray-400 font-bold">In Automotive Industry</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const Blogs = () => (
  <div className="py-24 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-[#2D2A70] mb-4">Latest <span className="text-[#9333EA]">Insights</span></h2>
        <p className="text-gray-500 font-medium max-w-2xl mx-auto">Stay updated with the latest trends in the automotive market and blockchain technology.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "The Future of Electric Vehicle Auctions",
            excerpt: "How the shift to EVs is changing the landscape of secondary vehicle markets.",
            image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800",
            date: "April 10, 2026"
          },
          {
            title: "Blockchain: Ensuring Trust in Bidding",
            excerpt: "Why decentralized protocols are the perfect fit for high-value auctions.",
            image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
            date: "April 05, 2026"
          },
          {
            title: "Top 5 Vehicles to Watch This Quarter",
            excerpt: "Our experts weigh in on the best investment opportunities this season.",
            image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800",
            date: "March 28, 2026"
          }
        ].map((blog, i) => (
          <motion.div
            key={blog.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-[40px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
          >
            <div className="aspect-video overflow-hidden">
              <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-8">
              <p className="text-xs font-black text-[#9333EA] uppercase tracking-widest mb-3">{blog.date}</p>
              <h3 className="text-xl font-black text-[#2D2A70] mb-4 group-hover:text-[#9333EA] transition-colors">{blog.title}</h3>
              <p className="text-gray-500 font-medium text-sm mb-6 leading-relaxed">{blog.excerpt}</p>
              <Button variant="ghost" className="p-0 text-[#2D2A70] font-black hover:bg-transparent hover:text-[#9333EA] group/btn">
                Read More <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export const Careers = () => (
  <div className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-[#2D2A70] mb-4">Join Our <span className="text-[#9333EA]">Mission</span></h2>
        <p className="text-gray-500 font-medium max-w-2xl mx-auto">We're looking for passionate individuals to help us build the future of automotive commerce.</p>
      </div>

      <div className="space-y-4 max-w-4xl mx-auto">
        {[
          { title: "Blockchain Developer", type: "Remote", dept: "Engineering" },
          { title: "UI/UX Designer", type: "Full-time", dept: "Design" },
          { title: "Marketing Manager", type: "Hybrid", dept: "Marketing" },
          { title: "Customer Success Lead", type: "Full-time", dept: "Operations" }
        ].map((job, i) => (
          <motion.div
            key={job.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center justify-between p-8 bg-gray-50 rounded-[32px] border border-gray-100 hover:bg-white hover:shadow-xl transition-all group"
          >
            <div>
              <h3 className="text-xl font-black text-[#2D2A70] mb-1">{job.title}</h3>
              <div className="flex gap-4">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{job.dept}</span>
                <span className="text-xs font-bold text-[#9333EA] uppercase tracking-widest">{job.type}</span>
              </div>
            </div>
            <Button className="bg-white text-[#2D2A70] border border-gray-100 font-black px-8 py-6 rounded-2xl group-hover:bg-[#9333EA] group-hover:text-white transition-all">
              Apply Now
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);
