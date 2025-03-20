
// ---------- import Local Tools
import { getVarValue } from '../project';

type Tprops_arrayPush = {
  args: any;
  pass: { arrPath: string; valuePath: string[] };
};

type Tvalue = [boolean, any[]];

export const arrayPush = (props: Tprops_arrayPush) => {
  console.log('START ARRAY PUSH --------------');
  console.log({ props });

  // ---------- set Caps Inputs
  const { args, pass } = props;
  let { arrPath, valuePath } = pass;

  const [hasOldArr, oldArr] = getVarValue(arrPath, 'noComponent') as Tvalue;
  console.log({ oldArr });
  const [hasNewValue, newValue] = getVarValue(
    valuePath,
    'noComponent',
  ) as Tvalue;
  console.log({ newValue });

  //   if (hasVar) userElProps[keyProp] = varValue;
  //   if (!hasVar) userElProps[keyProp] = valueProp;

  console.log('oldArr:', oldArr);
  console.log('newValue:', newValue);
  console.log('oldArr + newValue:', [...oldArr, newValue]);

  const isAlreadyPresent = oldArr.some(item => item.name === newValue.name);

  let newArr: any[] = [];
  if (!isAlreadyPresent) {
    newArr = [...oldArr, newValue];
  }

  console.log({ newArr });
  //   newArr.push(...oldArr);
  //   newArr.push(newValue);

  console.log({ newValue });
  console.log('FINISH ARRAY PUSH --------------');
  // ---------- set New Data
  return newArr;
};
