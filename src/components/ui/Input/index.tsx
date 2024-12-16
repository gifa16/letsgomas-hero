import styles from './Input.module.scss';

type Proptypes = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const Input = (props: Proptypes) => {
  const { label, name, type, placeholder, defaultValue, value, onChange } = props;
  return (
    <div className={styles.container}>
      {label && <label htmlFor={label}>{label}</label>}
      <input name={name} id={name} type={type} placeholder={placeholder} defaultValue={defaultValue} value={value} onChange={onChange} className={styles.container__input} />
    </div>
  );
};

export default Input;
