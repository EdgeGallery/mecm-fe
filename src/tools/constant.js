/*
 *  Copyright 2020 Huawei Technologies Co., Ltd.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

const TYPES = [
  {
    label: 'Video',
    value: 'Video'
  },
  {
    label: 'Game',
    value: 'Game'
  },
  {
    label: 'Video Surveillance',
    value: 'Video Surveillance'
  },
  {
    label: 'AR',
    value: 'AR'
  },
  {
    label: 'Calculate',
    value: 'Calculate'
  },
  {
    label: 'MEP',
    value: 'MEP'
  }
]

const AFFINITY = [
  {
    label: 'X86',
    value: 'X86'
  },
  {
    label: 'ARM64',
    value: 'ARM64'
  },
  {
    label: 'ARM32',
    value: 'ARM32'
  }
]

const SORT_BY = [
  {
    label: 'Most',
    value: 'Most'
  },
  {
    label: 'Name',
    value: 'Name'
  },
  {
    label: 'Score',
    value: 'Score'
  }
]

export {
  TYPES, AFFINITY, SORT_BY
}
