import { Spinner } from '@nextui-org/spinner';
import React from 'react';

type StudentInfoProps = {
  label: string;
  value: React.ReactNode;
  isLoading?: boolean;
};

const StudentInfo: React.FC<StudentInfoProps> = ({ label, value, isLoading }) => (
  <p className="flex gap-[5px]">
    <b>{label}</b> {isLoading ? <Spinner size="sm" color="primary" /> : value}
  </p>
);

export default StudentInfo;