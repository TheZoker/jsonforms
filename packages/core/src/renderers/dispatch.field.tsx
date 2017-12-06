import * as React from 'react';
import * as _ from 'lodash';
import { UnknownRenderer } from './unknown.renderer';
import { RankedTester } from '../core/testers';
import { FieldProps } from './field.util';
import { connect } from 'react-redux';

export interface DispatchFieldProps extends FieldProps {
  fields?: { tester: RankedTester, field: any }[];
}

const Dispatch = (dispatchFieldProps: DispatchFieldProps) => {
  const uischema = dispatchFieldProps.uischema;
  const schema = dispatchFieldProps.schema;
  const field = _.maxBy(dispatchFieldProps.fields, r => r.tester(uischema, schema));

  if (field === undefined || field.tester(uischema, schema) === -1) {
    return <UnknownRenderer/>;
  } else {
    const Field = field.field;

    return (
      <Field
        schema={schema}
        uischema={uischema}
        path={dispatchFieldProps.path}
        data={dispatchFieldProps.data}
        class
      />
    );
  }
};

const mapStateToProps = state => ({
  fields: state.fields || []
});

export const DispatchField = connect(mapStateToProps)(Dispatch);