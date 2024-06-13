import { FieldTypes } from "./Form.types";
import FieldCurrency from "./fields/FieldCurrency";
import FieldTextarea from "./fields/FieldTextarea";
import FieldSelect from "./fields/FieldSelect";
import FieldInput from "./fields/FieldInput";
import FieldInteger from "./fields/FieldInteger";

const fieldComponents = {
  [FieldTypes.select]: FieldSelect,
  [FieldTypes.currency]: FieldCurrency,
  [FieldTypes.textarea]: FieldTextarea,
  [FieldTypes.text]: FieldInput,
  [FieldTypes.date]: FieldInput,
  [FieldTypes.email]: FieldInput,
  [FieldTypes.number]: FieldCurrency,
  [FieldTypes.int]: FieldInteger,
};

export default fieldComponents;
