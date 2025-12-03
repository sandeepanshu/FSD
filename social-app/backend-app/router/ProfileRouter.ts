import express from "express";
import ProfileTable from "../models/ProfileTable.ts";
import verifyToken from "../middlewares/TokenVerifier.ts";
import { body, validationResult } from "express-validator";
import mongoose from "mongoose";
import UserTable from "../models/UserTable.ts";
import type { IProfile, IExperience, IEducation } from "../models/IProfile.ts";

const profileRouter: express.Router = express.Router();

/* =====================================================
   CREATE PROFILE
   POST /api/profiles/
   PRIVATE
===================================================== */
profileRouter.post(
  "/",
  [
    body("company").not().isEmpty().withMessage("Company is Required"),
    body("website").not().isEmpty().withMessage("Website is Required"),
    body("location").not().isEmpty().withMessage("Location is Required"),
    body("designation").not().isEmpty().withMessage("Designation is Required"),
    body("skills").not().isEmpty().withMessage("Skills is Required"),
    body("bio").not().isEmpty().withMessage("Bio is Required"),
    body("githubUsername")
      .not()
      .isEmpty()
      .withMessage("GithubUsername is Required"),
  ],
  verifyToken,
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const requestedUser = (req as any).user;
      const {
        company,
        website,
        location,
        designation,
        skills,
        bio,
        githubUsername,
        youtube,
        facebook,
        twitter,
        linkedin,
        instagram,
      } = req.body;

      // Check if profile already exists for this user
      const existingProfile = await ProfileTable.findOne({
        user: requestedUser.id,
      });
      if (existingProfile) {
        return res.status(400).json({
          errors: [{ msg: "Profile already exists. Use update instead." }],
        });
      }

      const profileObj: any = {
        user: requestedUser.id,
        company,
        website,
        location,
        designation,
        githubUsername,
        bio,
        skills: skills
          .toString()
          .split(",")
          .map((s: string) => s.trim()),
        experience: [],
        education: [],
        social: {
          youtube: youtube || "",
          facebook: facebook || "",
          twitter: twitter || "",
          linkedin: linkedin || "",
          instagram: instagram || "",
        },
      };

      const profile = new ProfileTable(profileObj);
      await profile.save();

      // Populate user info in response
      const populatedProfile = await ProfileTable.findById(
        profile._id
      ).populate("user", ["name", "avatar"]);

      res.status(201).json({
        msg: "Profile Created Successfully",
        profile: populatedProfile,
      });
    } catch (error) {
      console.error("Profile creation error details:", error);

      let errorMessage = "Server error";
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      res.status(500).json({
        errors: [{ msg: errorMessage }],
      });
    }
  }
);
/* =====================================================
   GET MY PROFILE
   GET /api/profiles/me
   PRIVATE
===================================================== */
profileRouter.get(
  "/me",
  verifyToken,
  async (req: express.Request, res: express.Response) => {
    try {
      const requestedUser = (req as any).user;

      const profile = await ProfileTable.findOne({
        user: requestedUser.id,
      }).populate("user", ["name", "avatar"]);

      if (!profile)
        return res
          .status(404)
          .json({ errors: [{ msg: "No Profile Found for the User" }] });

      res.status(200).json({ profile });
    } catch (error) {
      res.status(500).json({ errors: [{ msg: error }] });
    }
  }
);

/* =====================================================
   UPDATE PROFILE
   PUT /api/profiles/
   PRIVATE
===================================================== */
profileRouter.put(
  "/",
  [
    body("company").not().isEmpty(),
    body("website").not().isEmpty(),
    body("location").not().isEmpty(),
    body("designation").not().isEmpty(),
    body("skills").not().isEmpty(),
    body("bio").not().isEmpty(),
    body("githubUsername").not().isEmpty(),
  ],
  verifyToken,
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const requestedUser = (req as any).user;
      const {
        company,
        website,
        location,
        designation,
        skills,
        bio,
        githubUsername,
        youtube,
        facebook,
        twitter,
        linkedin,
        instagram,
        social,
      } = req.body;

      const profileObj: any = {
        user: requestedUser.id,
        company,
        website,
        location,
        designation,
        githubUsername,
        bio,
        skills: skills.map((s: string) => s.trim()),
        social: {
          youtube: social?.youtube || "",
          facebook: social?.facebook || "",
          twitter: social?.twitter || "",
          instagram: social?.instagram || "",
          linkedin: social?.linkedin || "",
        },
      };

      const profile = await ProfileTable.findOneAndUpdate(
        { user: requestedUser.id },
        { $set: profileObj },
        { new: true }
      );

      res.status(200).json({ msg: "Profile Updated Successfully", profile });
    } catch (error) {
      console.error("Profile creation error details:", error);
      console.error(
        "Error stack:",
        error instanceof Error ? error.stack : "N/A"
      );
      console.error("Request body:", req.body);
      console.error("Request user:", (req as any).user);

      // Send a more detailed error message for debugging
      res.status(500).json({
        errors: [
          {
            msg: error instanceof Error ? error.message : "Server error",
          },
        ],
      });
    }
  }
);

/* =====================================================
   GET PROFILE BY USER ID (PUBLIC)
   GET /api/profiles/users/:userId
===================================================== */
profileRouter.get(
  "/users/:userId",
  async (req: express.Request, res: express.Response) => {
    try {
      const mongoId = new mongoose.Types.ObjectId(req.params.userId);
      const profile = await ProfileTable.findOne({ user: mongoId }).populate(
        "user",
        ["name", "avatar"]
      );

      if (!profile)
        return res.status(404).json({ errors: [{ msg: "No Profile Found" }] });

      res.status(200).json({ profile });
    } catch (error) {
      res.status(500).json({ errors: [{ msg: error }] });
    }
  }
);

/* =====================================================
   DELETE PROFILE + USER
   DELETE /api/profiles/users/:userId
   PRIVATE
===================================================== */
profileRouter.delete(
  "/users/:userId",
  verifyToken,
  async (req: express.Request, res: express.Response) => {
    try {
      const mongoId = new mongoose.Types.ObjectId(req.params.userId);

      await ProfileTable.findOneAndDelete({ user: mongoId });
      await UserTable.findByIdAndDelete(mongoId);

      res.status(200).json({ msg: "Account Deleted Successfully" });
    } catch (error) {
      res.status(500).json({ errors: [{ msg: error }] });
    }
  }
);

/* =====================================================
   ADD EXPERIENCE
   PUT /api/profiles/experience
   PRIVATE
===================================================== */
profileRouter.put(
  "/experience",
  [
    body("title").not().isEmpty(),
    body("company").not().isEmpty(),
    body("location").not().isEmpty(),
    body("from").not().isEmpty(),
    body("description").not().isEmpty(),
  ],
  verifyToken,
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const requestedUser = (req as any).user;

      let profile: IProfile | null = await ProfileTable.findOne({
        user: requestedUser.id,
      });

      if (!profile)
        return res.status(404).json({ errors: [{ msg: "No Profile Found" }] });

      const newExperience: IExperience = req.body;
      profile.experience.unshift(newExperience);

      profile = await profile.save();
      res.status(200).json({ msg: "Experience Added", profile });
    } catch (error) {
      res.status(500).json({ errors: [{ msg: error }] });
    }
  }
);

/* =====================================================
   DELETE EXPERIENCE
   DELETE /api/profiles/experience/:experienceId
   PRIVATE
===================================================== */
profileRouter.delete(
  "/experience/:experienceId",
  verifyToken,
  async (req: express.Request, res: express.Response) => {
    try {
      const requestedUser = (req as any).user;
      const mongoId = new mongoose.Types.ObjectId(req.params.experienceId);

      let profile: IProfile | null = await ProfileTable.findOne({
        user: requestedUser.id,
      });

      if (!profile)
        return res.status(404).json({ errors: [{ msg: "No Profile Found" }] });

      profile.experience = profile.experience.filter(
        (exp) => exp._id!.toString() !== mongoId.toString()
      );

      await profile.save();
      res.status(200).json({ msg: "Experience Deleted", profile });
    } catch (error) {
      res.status(500).json({ errors: [{ msg: error }] });
    }
  }
);

/* =====================================================
   ADD EDUCATION
   PUT /api/profiles/education
   PRIVATE
===================================================== */
profileRouter.put(
  "/education",
  [
    body("school").not().isEmpty(),
    body("degree").not().isEmpty(),
    body("fieldOfStudy").not().isEmpty(),
    body("from").not().isEmpty(),
    body("description").not().isEmpty(),
  ],
  verifyToken,
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const requestedUser = (req as any).user;

      let profile: IProfile | null = await ProfileTable.findOne({
        user: requestedUser.id,
      });

      if (!profile)
        return res.status(404).json({ errors: [{ msg: "No Profile Found" }] });

      const newEducation: IEducation = req.body;

      profile.education.unshift(newEducation);

      await profile.save();
      res.status(200).json({ msg: "Education Added", profile });
    } catch (error) {
      res.status(500).json({ errors: [{ msg: error }] });
    }
  }
);

/* =====================================================
   DELETE EDUCATION
   DELETE /api/profiles/education/:educationId
   PRIVATE
===================================================== */
profileRouter.delete(
  "/education/:educationId",
  verifyToken,
  async (req: express.Request, res: express.Response) => {
    try {
      const requestedUser = (req as any).user;

      let profile: IProfile | null = await ProfileTable.findOne({
        user: requestedUser.id,
      });

      if (!profile)
        return res.status(404).json({ errors: [{ msg: "No Profile Found" }] });

      profile.education = profile.education.filter(
        (edu) => edu._id!.toString() !== req.params.educationId
      );

      await profile.save();
      res.status(200).json({ msg: "Education Deleted", profile });
    } catch (error) {
      res.status(500).json({ errors: [{ msg: error }] });
    }
  }
);

/* =====================================================
   GET ALL DEVELOPERS
   GET /api/profiles/all
   PUBLIC
===================================================== */
profileRouter.get(
  "/all",
  async (req: express.Request, res: express.Response) => {
    try {
      const profiles = await ProfileTable.find().populate("user", [
        "name",
        "avatar",
      ]);

      res.status(200).json({ profiles });
    } catch (error) {
      res.status(500).json({ errors: [{ msg: "Server error" }] });
    }
  }
);

/* =====================================================
   GET PROFILE BY PROFILE ID  (WILDCARD)
   GET /api/profiles/:profileId
   PUBLIC
   ⚠ MUST BE LAST ROUTE
===================================================== */
profileRouter.get("/:profileId", async (req, res) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.profileId);

    const profile = await ProfileTable.findById(id).populate("user", [
      "name",
      "avatar",
    ]);

    if (!profile)
      return res.status(404).json({ errors: [{ msg: "Profile not found" }] });

    res.status(200).json({ profile });
  } catch {
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
});

export default profileRouter;
