const CustomInput = ({ label, i_class, id, type, name, val, onCh, onBl }) => {
  return (
    <div className="form-floating mt-3">
      <input
        type={type}
        className={`form-control + ${i_class}`}
        id={id}
        placeholder={label}
        name={name}
        value={val}
        onChange={onCh}
        onBlur={onCh}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

export default CustomInput;
