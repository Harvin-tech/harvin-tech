import { Enrollment } from '../models';

export class EnrolledService {
  static async updateEnrollementById(enrolledId: string, requestBody: any) {
    console.log(enrolledId, 'enroll id');

    // Find the course by ID and update it
    const isEnrolledExist = await Enrollment.findOne({ _id: enrolledId });

    console.log('isEnrolledId', isEnrolledExist);

    if (!isEnrolledExist) {
      throw new Error('Enrolled not found');
    }

    const enroll = await Enrollment.findOneAndUpdate(
      { _id: enrolledId },
      { $set: requestBody },
      { new: true }
    );

    if (!enroll) {
      throw new Error('Failed to update Enrolled ');
    }

    return { course: enroll['_doc'] };
  }
}
