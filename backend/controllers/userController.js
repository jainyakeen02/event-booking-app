import User from "../models/User.js";

// GET MY PROFILE
export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch profile",
      error: error.message,
    });
  }
};

export const updateMyProfile = async (req, res) => {
  try {
    const { name, phone, bio, profilePic } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.phone = phone ?? user.phone;
    user.bio = bio ?? user.bio;
    user.profilePic = profilePic ?? user.profilePic;

    const updatedUser = await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        profilePic: updatedUser.profilePic,
        phone: updatedUser.phone,
        bio: updatedUser.bio,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update profile",
      error: error.message,
    });
  }
};
export const uploadProfilePhoto = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    user.profilePic = `/uploads/${req.file.filename}`;

    await user.save();

    res.status(200).json({
      message: "Profile photo uploaded successfully",
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to upload profile photo",
      error: error.message,
    });
  }
};
