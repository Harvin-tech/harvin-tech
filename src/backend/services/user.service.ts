import { Enrollment, User as UserModel } from '../models';
import { BAD_REQUEST } from '../types/errors.type';
import {
  changePassword_I,
  getUserQuery_I,
  updateUser_I,
} from '../types/user.type';
import { BcryptHelper } from '../utils/bcryptHelper';

export const UserService = {
  findAllUsers: async (query: getUserQuery_I) => {
    const { page = 1, limit = 10, search, status, type } = query;
    // Build the search query
    const filter: any = {};

    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } }, // Case-insensitive on firstName
        { email: { $regex: search, $options: 'i' } }, // Case-insensitive on email
      ];
    }

    if (status) {
      filter.status = status; // Add status filter if provided
    }

    if (type) {
      filter.type = type; // Add type filter if provided
    }

    const skip = (page - 1) * limit;

    // Fetch paginated users
    const users = await UserModel.find(filter).skip(skip).limit(limit);

    // Get total count for pagination metadata
    const totalCount = await UserModel.countDocuments(filter);

    return {
      users,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    };
  },

  getUserById: async (userId: string) => {
    console.log(userId, 'userId');
    // Ensure the userId is provided
    if (!userId) {
      throw new Error('User ID is required');
    }

    // Find the user by ID
    const user = await UserModel.findById(userId).select('-password');
    console.log(user, 'user');
    // const courseDetails = await Enrollment.findById(userId);
    const userCourseId = await Enrollment.find({ userId }).select('courseId');

    console.log(userCourseId, 'userCourseId');

    if (!user) {
      throw new Error('User not found');
    }

    return {
      ...user,
      userCourseId: userCourseId || null,
    };
  },

  updateUserById: async (userId: string, data: updateUser_I) => {
    // Ensure the userId is provided
    if (!userId) {
      throw new Error(BAD_REQUEST.message);
    }

    // Check if the user exists
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    console.log('dadada', data);
    // Find and update the user
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $set: data }, // Perform a partial update using $set
      { new: true, runValidators: true } // Return the updated document and apply validation
    );

    return updatedUser;
  },

  changePassword: async (data: changePassword_I) => {
    const { email, oldPassword, newPassword } = data;

    // Find the user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    // Check if the old password matches
    const isMatch = await BcryptHelper.comparePassword(
      oldPassword,
      user.password
    );

    const isSamePassword = await BcryptHelper.comparePassword(
      newPassword,
      user.password
    );

    if (!isMatch) {
      throw new Error('old password is not correct');
    }
    if (isSamePassword) {
      throw new Error('New password should be different with old password');
    }

    // Hash the new password
    const hashedPassword = await BcryptHelper.hashPassword(newPassword);

    const res = UserModel.updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );

    return res;
  },
};
