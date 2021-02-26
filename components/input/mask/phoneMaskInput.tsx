import { FC } from 'react';
import { OTHER_THEN_NUMBER } from 'src/format';
import MaskedInput_ from './maskedInput_';

interface PhoneMaskedInputProps {
  inputRef: (ref: HTMLInputElement | null) => void;
  // onChange?: (e:ChangeEvent<HTMLInputElement>) => void,
  value: string
}

const PhoneMaskedInput:FC<PhoneMaskedInputProps> = ({inputRef, value, ...other}) => {
  // const { inputRef, ...other } = props;

  // const [val, setVal] = useState('');
  // console.log(other);
  // const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
  //   console.log(e.target.value);
  //   setVal(e.target.value);
  //   if(onChange) onChange(e);
  // }

  const maskBuilder = (v:string) => {
    const val_ = v.replace(OTHER_THEN_NUMBER, '');
    return val_.length < 11
      ? [ '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d?/ ]
      : [ '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/ ]

  }
  return (
    <MaskedInput_
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      value={value}
      // mask={['(', /\d?/, /\d/, /\d/, ')', ' ', /\d?/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      mask={maskBuilder(value)}
      placeholderChar={'\u2000'}
      // onChange={onChangeHandler}
      // showMask
    />
  );
}

export default PhoneMaskedInput;

