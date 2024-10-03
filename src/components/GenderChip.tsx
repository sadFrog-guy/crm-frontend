import { Gender } from '@/types/gender';
import { Chip } from '@nextui-org/chip';

interface GenderChipProps {
  gender: Gender;
}

export default function GenderChip({gender}: GenderChipProps) {
  
  if (gender === "Мужчина") {
    return <Chip size="sm" variant="flat" className="bg-blue-100 text-blue-500">{gender}</Chip>
  } else {
    return <Chip size="sm" variant="flat" className="bg-pink-100 text-pink-500">{gender}</Chip>
  }
}