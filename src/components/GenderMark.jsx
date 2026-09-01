import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { genderLabel } from '@/lib/catLabels';
import './GenderMark.css';

export default function GenderMark({ gender, className = '' }) {
  const label = genderLabel(gender);
  if (!label) return null;
  const Icon = gender === 'female' ? FemaleIcon : MaleIcon;
  return (
    <Icon
      className={`gender-mark is-${gender} ${className}`.trim()}
      fontSize="inherit"
      titleAccess={label}
      aria-label={label}
    />
  );
}
