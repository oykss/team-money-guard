import PasswordStrengthBar from 'react-password-strength-bar-with-style-item';

export default function PasswordMatchIndicator({ password, confirmPassword }) {
  const match = confirmPassword === password;
  const isEmpty = !confirmPassword?.trim();

  const progressWidth = isEmpty ? '0%' : match ? '100%' : '50%';
  const progressColor = isEmpty
    ? 'transparent'
    : match
    ? 'linear-gradient(90deg, #FFC107 0%, #6A1B9A 100%)'
    : '#FFC107';

  return (
    <div style={{ width: '100%', marginTop: '8px' }}>
      <div style={{ display: 'none' }}>
        <PasswordStrengthBar
          password={confirmPassword || ' '}
          showScoreBar={true}
          showScoreWord={false}
          scoreWords={['', '', '', '', '']}
        />
      </div>

      <div
        style={{
          width: '100%',
          height: '4px',
          backgroundColor: '#ffffff1a',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: progressWidth,
            height: '100%',
            background: progressColor,
            transition: 'width 0.3s ease, background 0.3s ease',
          }}
        />
      </div>
    </div>
  );
}
