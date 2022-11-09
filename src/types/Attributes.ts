type AttributesBase = {
  id: string;
  required: boolean;
  order: number;
  name: string;
  description: string;
  // class: string;
};
type AttributeWritable = {
  type: 'writable';
} & AttributesBase;
type AttributeSelectableOrBoth = {
  type: 'selectable' | 'both';
  values: {
    id: string;
    name: string;
  }[];
} & AttributesBase;
export type Attribute = AttributeWritable | AttributeSelectableOrBoth;
