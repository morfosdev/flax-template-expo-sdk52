
// ---------- import Packs
import React from 'react';
import JSON5 from 'json5';
import { TextInput } from 'react-native';

// ---------- import Local Tools
import { getVarValue, getStlValues, pathSel } from '../project';
import { useData } from '../../..';

type Tprops = {
  pass: {
    propsArray: any;
    stylesArray: any;
    funcsArray: any;
    path: any;
    args: any;
  };
};

// IptTxtEdit - Entrada de Texto com prop value
export const IptTxtEdit = (props: Tprops) => {
  // ------- set IptTxt Inputs
  const { propsArray, stylesArray, funcsArray, path, args } = props.pass;

  console.log({ path });
  const joinedPath = path.join();

  console.log({ joinedPath });
  // const splitedPathArr = joinedPath.split('.');

  // const idxToAdd = splitedPathArr.length - 2;
  // const editPath = splitedPathArr.splice(idxToAdd, 0, 'editData');
  // const newPath = splitedPathArr.splice(idxToAdd, 0, 'iptsChanges');

  // console.log({ editPath });
  // console.log({ newPath });

  return <TextInput />;
};
