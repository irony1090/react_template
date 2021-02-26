import MaskedInput from 'react-text-mask';

export default MaskedInput;

// TextMaskCustom.propTypes = {
//   inputRef: PropTypes.func.isRequired,
// };

// const NumberFormatCustom = (props) => {
//   const { inputRef, onChange, ...other } = props;

//   return (
//     <NumberFormat
//       {...other}
//       ref={inputRef}
//       onValueChange={values => {
//         onChange({
//           target: {
//             value: values.value,
//           },
//         });
//       }}
//       thousandSeparator
//       prefix="$"
//     />
//   );
// }
// NumberFormatCustom.propTypes = {
//   inputRef: PropTypes.func.isRequired,
//   onChange: PropTypes.func.isRequired,
// };
// export {
//   NumberFormatCustom
// };
// interface TextMaskCustomProps {
//   inputRef: (ref: HTMLInputElement | null) => void;
// }

// const TextMaskCustom = (props: TextMaskCustomProps) => {
//   const { inputRef, ...other } = props;

//   return (
//     <MaskedInput
//       {...other}
//       ref={(ref: any) => {
//         inputRef(ref ? ref.inputElement : null);
//       }}
//       // mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
//       mask={[['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]]}
//       placeholderChar={'\u2000'}
//       showMask
//     />
//   );
// }