// @flow
//
// Copyright 2019 Ivan Sorokin.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React, { Component } from 'react'
import styled from 'styled-components/native'
import { TextInput } from 'components/CustomFont'

type Props = {
  units?: string,
  placeholder?: string,
  maxLength: number,
  value: string,
  onChange: (value: string) => void,
  autoFocus: boolean,
}
type State = {}

const Layout = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`

const StyledInput = styled(TextInput)`
  font-family: Poppins;
  margin-left: -20;
  padding: 20px;
  margin-right: -20;
  background-color: #fbfbfb;
  font-size: 18;
  font-weight: 400;
  flex-grow: 1;
`

export default class FormTextInput extends Component<Props, State> {
  render() {
    const { maxLength, onChange, value, autoFocus, placeholder } = this.props
    return (
      <Layout>
        <StyledInput
          selectionColor={'#ABABAB'}
          autoFocus={autoFocus}
          onChangeText={onChange}
          value={value}
          keyboardType="default"
          maxLength={maxLength}
          placeholder={placeholder}
        />
      </Layout>
    )
  }
}
