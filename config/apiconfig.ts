import { signIn } from "next-auth/react";
import axios from 'axios';
import { Role } from "@prisma/client"; // Adjust this import based on your Prisma generated types


type Data = {
  username?: string;
  password: string;
  email: string;
};

type userData = {
  username?: string;
  password: string;
  email: string;
  role: Role;
  freelancer?: FreelancerData | null;
  client?: ClientData | null;
}

type FreelancerData = {
  user_id: string;
  bio: string;
  skills: string;
  portfolio_link: string;
  social_link: string;
};

type ClientData = {
  user_id: string;
  company_name: string;
  company_description: string | null;
  websiteLink: string | null; // Include websiteLink in ClientData
};

type jobData = {
  description: string;
  category: string;
  user_id: string;
  price: number;
}

export const UserSignUp = async (userDetails: userData) => {
  try {
    const res = await axios.post('/api/user/signup', {
      username: userDetails.username,
      password: userDetails.password,
      email: userDetails.email,
      role: userDetails.role,
      freelancer: userDetails.freelancer,
      client: userDetails.client,
    });

    return res.data; // Return the response data
  } catch (error) {
    console.error('Failed to register:', error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};

export const UserLogin = async (userDetails: Data) => {
  try {
    const res = await signIn("credentials", {
      email: userDetails.email,
      password: userDetails.password,
      redirect: false,
    });
    console.log("weeeh", res);
    return res;
  } catch (error) {
    console.log("failed to login", error);
  }
};

export const createJob = async (jobDetails: jobData) => {
  try {
    const { description, category, user_id, price } = jobDetails;
    const res = await axios.post('/api/job', 
      {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, category, user_id, price })
      }
    );
    return res;
  } catch (error) {
    console.log("Something went wrong", error);
  }
}

export const getAllJobs = async () => {
  try {
    const res = await axios.get('/api/job',
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return res;
  } catch (error) {
    console.error("Something went wrong", error);
  }
}

export const updateJob = async (jobDetails: jobData, job_id: string) => {
  const { description, category, user_id, price } = jobDetails;
  try {
    const res = await axios.put('/api/job',
      {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job_id, user_id, description, category, price })
      }
    );
    return res;
  } catch (error) {
    console.error("Something went wrong", error);
  }
}

export const getAccess = async (user_id: string) => {
  try {
    const res = await axios.post(`${process.env.NEXTAUTH_URL}/api/user/access`,
      {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id })
      }
    );
    return res;
  } catch (error) {
    console.error("Something went wrong", error);
  }
}

export const freelancerDetails = async (user_id: string) => {
  try {
    const res = await axios.get('/api/user/freelancer', {
      params: { user_id },
      headers: { "Content-Type": "application/json" },
    });
    console.log("R", res);
    return res.data; // Return the response data
  } catch (error) {
    console.error("Failed to fetch freelancer details:", error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};

export const clientDetails = async (user_id: string) => {
  try {
    const res = await axios.get('/api/user/client', {
      params: { user_id },
      headers: { "Content-Type": "application/json" },
    });
    return res.data; // Return the response data
  } catch (error) {
    console.error("Failed to fetch client details:", error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};
