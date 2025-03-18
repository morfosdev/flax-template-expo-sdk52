
// ---------- import Local Tools
import { setData, getVarValue } from '../project';

export const css1 =
  'color: yellow; background-color: black; font-size: 11px; padding: 2px 6px; border-radius: 3px';
export const css2 =
  'color: green; background-color: black; font-size: 10px; padding: 2px 6px; border-radius: 3px';

export const css3 =
  'color: yellow; background-color: red; font-size: 11px; padding: 2px 6px; border-radius: 3px';
export const css4 =
  'color: yellow; background-color: darkred; font-size: 10px; padding: 2px 6px; border-radius: 3px';

type Tprops_setVar = { args: any; pass: { keyPath: string[]; value: any } };

export const setVar = (props: Tprops_setVar) => {
  // ---------- set Caps Inputs
  const { args, pass } = props;
  let { keyPath, value } = pass;
  console.log('%csetVar', { keyPath, value, args });
  console.log({ args });

  // ---------- join String
  const url = keyPath.reduce((prev, curr) => prev + curr, '');

  const { newArgChildren } = testArgs(value, args);

  console.log('SET VAR..', { value });
  value = newArgChildren;

  // --------- update Central Data
  if (value === undefined) {
    // --------- set Consoles System
    console.log('%csetVar', css3);
    console.log('%csetVar path', css4, url);
    console.table('%csetVar value', css4, 'o valor de value é ' + value);
  }

  if (value !== undefined) {
    // --------- set Consoles System
    console.log('%csetVar', css1);
    console.log('path:', url);
    console.table('value:', value);

    setData({ path: url, value: value });
  }
};

const findFlatItem = obj => {
  if (typeof obj !== 'object' || obj === null) return null;

  if ('item' in obj) return obj.item;

  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      for (const element of obj[key]) {
        const found = findFlatItem(element);
        if (found) return found;
      }
    } else if (typeof obj[key] === 'object') {
      const found = findFlatItem(obj[key]);
      if (found) return found;
    }
  }

  return null;
};

const testArgs = (children, args) => {
  let condChildren = '';
  let newArgChildren = undefined;

  console.log({ children });
  console.log({ args });

  const joinedChild = children.join();
  if (joinedChild.includes('$var_')) condChildren = 'var';
  if (joinedChild.includes('$arg_')) condChildren = 'arg';

  console.log({ condChildren });

  // --------------------------
  // ------- Tratamento de ARGs
  // --------------------------
  if (condChildren === 'arg') {
    const key = joinedChild.split('_')[1];

    console.log('TEXT', { key });

    const condFull = key === 'full';
    if (condFull) {
      newArgChildren = findFlatItem(args);
    }

    const foundItem = findFlatItem(args);
    if (foundItem && foundItem[key]) {
      newArgChildren = foundItem[key];
      console.log('TEXT IF', { newArgChildren });
    }

    // newArgChildren = args[0];
    console.log('TEXT', { newArgChildren });
  }

  // --------------------------
  // ------- Tratamento de VARs
  // --------------------------
  if (condChildren === 'var') {
    const [condVar, varValue] = getVarValue(joinedChild, 'noComponent');
    if (condVar) newArgChildren = varValue;
    if (!condVar) console.log('VAR ERROR', { newArgChildren });
  }

  if (newArgChildren === undefined)
    console.log('ARG ERROR', { newArgChildren });

  return { condChildren, newArgChildren };
};
