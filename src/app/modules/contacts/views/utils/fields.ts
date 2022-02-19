import {ColumnsConfig} from "@modules/contacts/views/contacts/table/colums.config";

export function getFields(data: { [key: string]: any }) {
  const fields = ColumnsConfig.filter(el => el.key !== 'actions');

  return fields.map((field) => {
    return {label: field.value, value: data[field.key]};
  });
}
