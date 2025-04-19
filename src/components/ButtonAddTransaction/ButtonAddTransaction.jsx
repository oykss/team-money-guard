import { IoAddOutline } from "react-icons/io5";

export default function ButtonAddTransaction({ onClick }) {
  const style = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    background:
      "linear-gradient(167deg,#ffc727 0%,#9e40ba 61.46%,#7000ff 90.54%)",
    borderRadius: "50%",
    width: "44px",
    height: "44px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <button type="button" style={style} onClick={onClick}>
      <IoAddOutline size={24} color="#fff" />
    </button>
  );
}
