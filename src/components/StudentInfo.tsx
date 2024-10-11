import { Spinner } from "@nextui-org/spinner";
import React from "react";

type StudentInfoProps = {
  label: string;
  value: React.ReactNode;
  isLoading?: boolean;
};

const StudentInfo: React.FC<StudentInfoProps> = ({
  label,
  value,
  isLoading,
}) => (
  <p className="flex gap-[5px]">
    <b>{label}</b> {isLoading ? <Spinner color="primary" size="sm" /> : value}
  </p>
);

export default StudentInfo;
