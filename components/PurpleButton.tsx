'use client';

interface PurpleButtonProps {
  buttonColor: string;
}

export default function PurpleButton({ buttonColor }: PurpleButtonProps) {
  return (
    <button style={{
      backgroundColor: buttonColor,
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer'
    }}>
      Purple Button
    </button>
  );
}
