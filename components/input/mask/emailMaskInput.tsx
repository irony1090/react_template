import { FC } from 'react';
import MaskedInput_ from './maskedInput_';
import emailMask from 'text-mask-addons/dist/emailMask';
interface EmailMaskInputProps {
  inputRef: (ref: HTMLInputElement | null) => void;
  // onChange?: (e:ChangeEvent<HTMLInputElement>) => void,
  value: string
}

// const form = [/\w+/, '@', /\w+/, '.', /\w{1,3}/]
const EmailMaskInput:FC<EmailMaskInputProps> = ({inputRef, value, ...other}) => {
  // console.log(emailMask(value, ));
  return (
    <MaskedInput_
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      value={value}
      mask={emailMask}
      placeholderChar={'\u2000'}
      // onChange={onChangeHandler}
      // showMask
    />
  );
}

export default EmailMaskInput;

