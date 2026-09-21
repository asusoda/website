import { Code2 } from "lucide-react";

interface ProgramPhotoPlaceholderProps {
  label: string;
}

export default function ProgramPhotoPlaceholder({ label }: ProgramPhotoPlaceholderProps) {
  return (
    <div className="program-photo-placeholder" role="img" aria-label={`${label} photo placeholder`}>
      <Code2 size={24} aria-hidden="true" />
      <span>{label}</span>
      <small>PHOTO COMING SOON</small>
    </div>
  );
}
