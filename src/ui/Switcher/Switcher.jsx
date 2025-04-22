import { styled } from '@mui/material/styles';
import { Switch, FormGroup, Stack, Typography } from '@mui/material';
import { IoAddOutline } from 'react-icons/io5';

export default function Switcher({ value, onChange }) {
  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 80,
    height: 40,
    padding: 0,
    display: 'flex',
    overflow: 'visible',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
    },
    '& .MuiSwitch-switchBase': {
      color: '#FFB627',
      padding: 2,
      top: '50%',
      transform: 'translateY(-50%) translateX(-4px)',
      transition: theme.transitions.create(['transform'], {
        duration: 300,
      }),
      '&.Mui-checked': {
        transform: 'translateY(-50%) translateX(36px)',
        color: '#FF868D',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: '#fbfbfb',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 44,
      height: 44,
      borderRadius: '50%',
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
      },
    },
    '& .MuiSwitch-track': {
      borderRadius: 20,
      opacity: 1,
      backgroundColor: '#fbfbfb',
      boxSizing: 'border-box',
    },
  }));

  const isIncome = value === 'income';

  const handleToggle = () => {
    const newValue = isIncome ? 'expense' : 'income';
    onChange(newValue);
  };

  return (
    <div>
      <FormGroup>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Typography>Income</Typography>
          <AntSwitch checked={!isIncome} onChange={handleToggle} />
          <Typography>Expense</Typography>
        </Stack>
      </FormGroup>
    </div>
  );
}
