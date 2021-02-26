import { FC } from 'react';
import MaskedInput_ from './maskedInput_';

interface PrivateNumberMaskedInputProps {
  inputRef: (ref: HTMLInputElement | null) => void;
  // onChange?: (e:ChangeEvent<HTMLInputElement>) => void,
  value: string
}

const form = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, '●', '●', '●', '●', '●', '●']
const PrivateNumberMaskedInput:FC<PrivateNumberMaskedInputProps> = ({inputRef, value, ...other}) => {

  return (
    <MaskedInput_
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      value={value}
      // mask={['(', /\d?/, /\d/, /\d/, ')', ' ', /\d?/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      mask={form}
      placeholderChar={'*'}
      // onChange={onChangeHandler}
      // showMask
    />
  );
}

export default PrivateNumberMaskedInput;

