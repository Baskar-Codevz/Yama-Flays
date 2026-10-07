import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import dotenv from "dotenv";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    const adminEmail = "janumy686@gmail.com";

    const existingAdmin = await User.findOne({
      email: adminEmail.toLowerCase(),
    });

    if (existingAdmin) {
      console.log("An account with this email already exists.");

      if (existingAdmin.role !== "admin") {
        existingAdmin.role = "admin";
        await existingAdmin.save();

        console.log("Existing account upgraded to ADMIN.");
      } else {
        console.log("This account is already an ADMIN.");
      }

      await mongoose.connection.close();
      process.exit(0);
    }

    const adminPassword = "Jhonmy@1232000";

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const admin = await User.create({
      name: "YAMA FLYS Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });

    console.log("=================================");
    console.log("ADMIN ACCOUNT CREATED");
    console.log("=================================");
    console.log("Email:", admin.email);
    console.log("Role:", admin.role);
    console.log("=================================");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("CREATE ADMIN ERROR:", error);
    process.exit(1);
  }
};

createAdmin();