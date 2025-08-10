'use client';

import PasswordUpdateForm from '@/components/common/PasswordUpdateForm';

export default function UpdatePassword({
  userEmail,
  updatePassword,
  setUpdatePassword,
}: any) {
  const handleSuccess = () => {
    setUpdatePassword(false);
  };

  const handleCancel = () => {
    setUpdatePassword(false);
  };

  return (
    <PasswordUpdateForm
      userEmail={userEmail}
      isAdmin={true}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
}
