import { Chip } from "@nextui-org/chip";

import { Gender } from "@/types/gender";

interface GenderChipProps {
  gender: Gender;
}

export default function GenderChip({ gender }: GenderChipProps) {
  if (gender === "Мужчина") {
    return (
      <Chip className="bg-blue-100 text-blue-500" size="sm" variant="flat">
        {gender}
      </Chip>
    );
  } else {
    return (
      <Chip className="bg-pink-100 text-pink-500" size="sm" variant="flat">
        {gender}
      </Chip>
    );
  }
}
