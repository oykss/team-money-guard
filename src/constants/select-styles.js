export const customStyles = {
  control: (_, { isFocused }) => ({
    display: 'flex',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    borderStyle: 'none',
    border: isFocused
      ? '1px solid rgba(255, 255, 255, 0.6)'
      : '1px solid rgba(255, 255, 255, 0.2)',
    outline: 'none',
    color: 'rgba(255, 255, 255, 0.6)',
    cursor: 'pointer',
    transition: 'all 200ms ease',
    '&:hover': {
      border: '1px solid rgba(255, 255, 255, 0.6)',
    },
  }),
  menu: base => ({
    ...base,
    background:
      'linear-gradient(180deg, rgba(83, 61, 186), rgba(80, 48, 154), rgba(106, 70, 165), rgba(133, 93, 175))',
    borderRadius: '8px',
    marginTop: '0px',
    overflow: 'hidden',
    backdropFilter: 'blur(8px)',
  }),
  menuList: base => ({
    ...base,
    '::-webkit-scrollbar': {
      width: '8px',
    },
    '::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      borderRadius: '4px',
    },
    '::-webkit-scrollbar-thumb:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
    },
    '::-webkit-scrollbar-track': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '4px',
    },
  }),
  option: (base, { isFocused }) => ({
    ...base,
    backgroundColor: isFocused ? 'rgba(162, 123, 255, 0.3)' : 'transparent',
    color: isFocused ? '#FF868D' : '#fff',
    padding: '10px 15px',
    transition: 'all 100ms ease',
    cursor: 'pointer',
  }),
  singleValue: base => ({
    ...base,
    color: 'rgba(255, 255, 255, 0.6)',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: (base, { isFocused }) => ({
    ...base,
    color: isFocused ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.2)',
    transition: 'color 200ms ease',
    '&:hover': {
      color: 'rgba(255, 255, 255, 0.6)',
    },
  }),
};
