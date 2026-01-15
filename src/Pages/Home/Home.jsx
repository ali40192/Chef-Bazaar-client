import React from "react";
import { motion } from "framer-motion";
import Banner from "../../Components/Common/Banner";
import Review from "../Reviews/Review";
import MealCards from "../../Components/Common/MealCards";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Components/Common/Loader";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import OurClients from "./OurClients";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Home = () => {
  const axiosSecure = useAxiosSecure();

  const { data: meals = [], isLoading } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/meals");
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  return (
    <section className="space-y-32 overflow-hidden">
      {/* Banner */}
      <motion.div initial="hidden" animate="visible" variants={fadeUp}>
        <Banner />
      </motion.div>

      {/* Why Choose Us */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-4 text-center"
      >
        <h2 className="text-3xl font-bold text-[#E2852E] mb-10">
          Why Choose Our Meals
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Fresh Ingredients",
              desc: "Farm-fresh & organic ingredients used daily.",
            },
            {
              title: "Expert Chefs",
              desc: "Prepared by professional & experienced chefs.",
            },
            {
              title: "Quick Delivery",
              desc: "Fast and reliable doorstep delivery.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-base-100 rounded-xl shadow"
            >
              <h4 className="font-semibold mb-2">{item.title}</h4>
              <p className="text-gray-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Special Meals */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full max-w-6xl mx-auto px-4"
      >
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#E2852E]">
            Our Special Meals
          </h1>
          <p className="text-gray-500">
            Carefully crafted meals to satisfy your taste and nutrition.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-14 justify-items-center">
          {meals.map((meal) => (
            <MealCards key={meal._id} meal={meal} />
          ))}
        </div>
      </motion.div>

      {/* Stats Section (NEW meaningful section) */}
      <motion.div
        className="bg-[#E2852E] py-20 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 text-center">
          {[
            ["10k+", "Happy Customers"],
            ["500+", "Daily Orders"],
            ["50+", "Expert Chefs"],
            ["5+", "Years Experience"],
          ].map(([num, label], i) => (
            <div key={i}>
              <h2 className="text-4xl font-bold">{num}</h2>
              <p className="mt-2 text-white/80">{label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* How It Works */}
      <motion.div
        className="bg-base-200/40 py-20"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#E2852E] mb-12">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {["Choose Meal", "Place Order", "Enjoy Food"].map((step, i) => (
              <div key={i}>
                <h4 className="font-semibold mb-2">
                  {i + 1}. {step}
                </h4>
                <p className="text-gray-500">
                  Simple, fast & user-friendly process.
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Reviews */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20"
      >
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-center mb-14">
            <span className="block text-sm uppercase tracking-widest text-gray-500">
              Testimonials
            </span>
            <span className="text-3xl font-bold text-[#E2852E]">
              Customers Reviews
            </span>
          </h1>
          <Review />
        </div>
      </motion.div>

      {/* Clients */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-4 pb-24"
      >
        <OurClients />
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        className="text-center py-24 bg-[#E2852E] text-white"
      >
        <h2 className="text-3xl font-bold mb-4">
          Ready to Enjoy Healthy Meals?
        </h2>
        <p className="mb-6">Order now and experience fresh & delicious food.</p>
        <button className="btn bg-white text-[#E2852E] font-semibold">
          Get Started
        </button>
      </motion.div>
    </section>
  );
};

export default Home;
