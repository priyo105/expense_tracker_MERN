function InputWithIcons({ icon, placeholder, type, onChange }) {
  return (
    <div className="flex mt-10">
      {icon}
      <input
        type={type}
        className="w-50 h-11 p-2 border ml-4 rounded-md"
        placeholder={placeholder}
        onChange={onChange}
      ></input>
    </div>
  );
}

export default InputWithIcons;
